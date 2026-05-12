const HEBREW_PREFIX = /^[בוהמלכש]/

export function normalizeHebrew(word) {
  return word.replace(HEBREW_PREFIX, '')
}

export function retrieveChunks(question, knowledge, topK = 6) {
  const qLower = question.toLowerCase()
  const qWords = qLower
    .split(/[\s,?!.״׳"']+/)
    .map(normalizeHebrew)
    .filter(w => w.length > 1)

  const scored = knowledge.map(entry => {
    let score = 0
    let kwScore = 0
    let entityScore = 0

    // Signal 1: Keyword match
    for (const kw of entry.keywords) {
      if (qLower.includes(kw.toLowerCase())) {
        const pts = kw.length > 3 ? 5 : 2
        score += pts
        kwScore += pts
      }
    }

    // Signal 2: Entity match (high-confidence domain signals)
    if (entry.entities) {
      for (const person of entry.entities.people ?? []) {
        if (qLower.includes(person.toLowerCase())) { score += 6; entityScore += 6 }
      }
      for (const rel of entry.entities.relations ?? []) {
        if (qLower.includes(rel.toLowerCase())) { score += 5; entityScore += 5 }
      }
      for (const place of entry.entities.places ?? []) {
        if (qLower.includes(place.toLowerCase())) { score += 4; entityScore += 4 }
      }
    }

    // Signal 3: Chapter match — check normalized question words against chapter tokens
    const chapterTokens = entry.chapter.toLowerCase().split(/\s+/)
      .map(normalizeHebrew)
      .filter(ct => ct.length > 1)
    const chapterMatchCount = chapterTokens.filter(ct => qWords.includes(ct)).length
    if (chapterMatchCount >= chapterTokens.length && chapterTokens.length > 0) {
      // All chapter words found in question → full chapter match
      score += 3
    }
    // Title word match — exact normalized word equality only
    for (const tw of entry.title.toLowerCase().split(/\s+/)) {
      const twNorm = normalizeHebrew(tw)
      if (twNorm.length > 2 && qWords.includes(twNorm)) score += 2
    }

    // Signal 4: Content word overlap (prefix-normalized)
    const contentLower = entry.content.toLowerCase()
    let contentHits = 0
    for (const qw of qWords) {
      if (qw.length > 2 && contentLower.includes(qw)) contentHits += 1
    }
    score += contentHits

    // Require corroboration: keyword-only hits with no entity/content support are discarded
    if (kwScore > 0 && entityScore === 0 && contentHits === 0 && chapterMatchCount === 0) {
      score = 0
    }

    return { entry, score }
  })

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(s => s.entry)
}
