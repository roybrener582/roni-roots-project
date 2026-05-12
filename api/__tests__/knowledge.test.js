import { describe, test, expect } from 'vitest'
import { knowledge } from '../knowledge.js'

describe('knowledge base structure', () => {
  test('exports a non-empty array', () => {
    expect(Array.isArray(knowledge)).toBe(true)
    expect(knowledge.length).toBeGreaterThan(0)
  })

  test('every entry has required fields with correct types', () => {
    for (const entry of knowledge) {
      expect(typeof entry.id, `id missing in: ${entry.title}`).toBe('string')
      expect(entry.id.length, `id empty in: ${entry.title}`).toBeGreaterThan(0)
      expect(typeof entry.chapter, `chapter missing in: ${entry.id}`).toBe('string')
      expect(typeof entry.title, `title missing in: ${entry.id}`).toBe('string')
      expect(Array.isArray(entry.keywords), `keywords not array in: ${entry.id}`).toBe(true)
      expect(typeof entry.entities, `entities missing in: ${entry.id}`).toBe('object')
      expect(Array.isArray(entry.entities.people), `entities.people not array in: ${entry.id}`).toBe(true)
      expect(Array.isArray(entry.entities.places), `entities.places not array in: ${entry.id}`).toBe(true)
      expect(Array.isArray(entry.entities.relations), `entities.relations not array in: ${entry.id}`).toBe(true)
      expect(typeof entry.content, `content missing in: ${entry.id}`).toBe('string')
      expect(entry.content.length, `content too short in: ${entry.id}`).toBeGreaterThan(10)
    }
  })

  test('all ids are unique', () => {
    const ids = knowledge.map(e => e.id)
    const unique = new Set(ids)
    expect(unique.size).toBe(ids.length)
  })

  test('has entries for each main chapter', () => {
    const chapters = new Set(knowledge.map(e => e.chapter))
    const required = [
      'מי אני',
      'השם שלי',
      'ניר ז"ל',
      'המשפחה שלי',
      'עץ המשפחה',
      'מסלול הנדודים',
      'הקהילה שלי',
      'הסיפור שלי',
      'בת מצווה',
      'סיכום המסע',
    ]
    for (const chapter of required) {
      expect(chapters.has(chapter), `missing chapter: ${chapter}`).toBe(true)
    }
  })
})
