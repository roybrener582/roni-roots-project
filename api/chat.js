import Anthropic from '@anthropic-ai/sdk'
import { knowledge } from './knowledge.js'
import { retrieveChunks } from './retrieval.js'

const FALLBACK_NOT_FOUND = 'אני לא מוצא מידע על זה בתוך ספר השורשים.'
const FALLBACK_ERROR = 'מצטערת, הייתה שגיאה זמנית. נסה שוב.'
const FALLBACK_TOO_LONG = 'השאלה ארוכה מדי.'
const MAX_HISTORY_MESSAGES = 12

const SYSTEM_PROMPT = `אתה מדריך אישי לספר השורשים של רוני ברנר — ילדה בת 12 מישראל.
תפקידך: לענות על שאלות אך ורק על בסיס המידע שסופק להלן.

## כללים
1. ענה רק מהמידע שמופיע בקטע "מידע מהספר" להלן. אל תמציא עובדות.
2. אם המידע אינו קיים — ענה בדיוק: "אני לא מוצא מידע על זה בתוך ספר השורשים."
3. ענה תמיד בעברית, בסגנון חם, אישי ורגשי — כמו מי שמכיר את הסיפור מקרוב.
4. כתוב בפסקאות קצרות וקריאות. אל תציין מאיזה פרק לקחת את המידע.
5. אל תחזור על השאלה. ענה ישירות.

## מידע מהספר
{CONTEXT}`

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ answer: FALLBACK_ERROR })

  const { message, history = [] } = req.body ?? {}

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ answer: FALLBACK_ERROR })
  }
  if (message.length > 500) {
    return res.status(400).json({ answer: FALLBACK_TOO_LONG })
  }

  const question = message.trim()
  const chunks = retrieveChunks(question, knowledge)

  if (chunks.length === 0) {
    return res.status(200).json({ answer: FALLBACK_NOT_FOUND })
  }

  const context = chunks
    .map(c => `[${c.chapter} — ${c.title}]\n${c.content}`)
    .join('\n\n')

  const systemPrompt = SYSTEM_PROMPT.replace('{CONTEXT}', context)

  const recentHistory = Array.isArray(history)
    ? history.slice(-MAX_HISTORY_MESSAGES)
    : []

  const messages = [
    ...recentHistory,
    { role: 'user', content: question },
  ]

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: systemPrompt,
      messages,
    })

    const answer = response.content[0]?.text?.trim()
    if (!answer) return res.status(200).json({ answer: FALLBACK_NOT_FOUND })

    return res.status(200).json({ answer })
  } catch (err) {
    console.error('Claude API error:', err?.message ?? err)
    return res.status(500).json({ answer: FALLBACK_ERROR })
  }
}
