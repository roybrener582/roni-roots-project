import { describe, test, expect } from 'vitest'
import { normalizeHebrew, retrieveChunks } from '../retrieval.js'
import { knowledge } from '../knowledge.js'

describe('normalizeHebrew', () => {
  test('strips ב prefix', () => {
    expect(normalizeHebrew('בישראל')).toBe('ישראל')
  })
  test('strips ו prefix', () => {
    expect(normalizeHebrew('וגם')).toBe('גם')
  })
  test('strips ה prefix', () => {
    expect(normalizeHebrew('המשפחה')).toBe('משפחה')
  })
  test('strips מ prefix', () => {
    expect(normalizeHebrew('מרוני')).toBe('רוני')
  })
  test('strips ל prefix', () => {
    expect(normalizeHebrew('לרוני')).toBe('רוני')
  })
  test('strips כ prefix', () => {
    expect(normalizeHebrew('כמו')).toBe('מו')
  })
  test('strips ש prefix', () => {
    expect(normalizeHebrew('שאמרה')).toBe('אמרה')
  })
  test('does not strip non-prefix chars', () => {
    expect(normalizeHebrew('ניר')).toBe('ניר')
    expect(normalizeHebrew('רוני')).toBe('רוני')
    expect(normalizeHebrew('אמא')).toBe('אמא')
  })
  test('handles empty string', () => {
    expect(normalizeHebrew('')).toBe('')
  })
})

describe('retrieveChunks', () => {
  test('returns empty array for unknown topic', () => {
    const results = retrieveChunks('מה זה פיצה איטלקית', knowledge)
    expect(results).toEqual([])
  })

  test('finds uncle Nir entry for "מי ניר"', () => {
    const results = retrieveChunks('מי ניר', knowledge)
    expect(results.length).toBeGreaterThan(0)
    expect(
      results.some(e => e.chapter.includes('ניר') || e.entities.people.includes('ניר'))
    ).toBe(true)
  })

  test('finds family tree entry for "מי הסבתא של רוני"', () => {
    const results = retrieveChunks('מי הסבתא של רוני', knowledge)
    expect(results.length).toBeGreaterThan(0)
    expect(
      results.some(e => e.entities.relations.some(r => r.includes('סבתא')))
    ).toBe(true)
  })

  test('finds migration entry for "מאיפה באה המשפחה"', () => {
    const results = retrieveChunks('מאיפה באה המשפחה', knowledge)
    expect(results.length).toBeGreaterThan(0)
    expect(
      results.some(e => e.chapter === 'מסלול הנדודים' || e.chapter === 'עץ המשפחה')
    ).toBe(true)
  })

  test('respects topK limit', () => {
    const results = retrieveChunks('רוני', knowledge, 3)
    expect(results.length).toBeLessThanOrEqual(3)
  })

  test('handles Hebrew prefix normalization — "בישראל" finds Israel content', () => {
    const results = retrieveChunks('מה קרה בישראל', knowledge)
    expect(results.length).toBeGreaterThan(0)
    expect(
      results.some(e => e.entities.places.some(p => p.includes('ישראל')) || e.content.includes('ישראל'))
    ).toBe(true)
  })

  test('finds bat mitzvah entry for "בת מצווה"', () => {
    const results = retrieveChunks('ספרי לי על בת המצווה', knowledge)
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(e => e.chapter === 'בת מצווה')).toBe(true)
  })

  test('returns entries sorted by score descending', () => {
    const results = retrieveChunks('מי ניר', knowledge)
    if (results.length > 1) {
      expect(
        results[0].entities.people.includes('ניר') ||
        results[0].chapter.includes('ניר')
      ).toBe(true)
    }
  })
})
