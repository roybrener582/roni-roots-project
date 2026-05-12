# AI Chat — Design Spec
**Date:** 2026-05-12
**Status:** Approved

---

## Goal

Replace the current client-side keyword-search chat with a real AI assistant powered by Claude. The AI must answer only from the project's book content, feel warm and emotionally aware, and never hallucinate or use external knowledge. All API secrets stay server-side.

---

## Current State

- `AIChatPage.jsx` — 217-line component with local `findRelevantEntries` + `buildAnswer` functions
- `src/data/projectKnowledge.js` — ~30 hardcoded knowledge entries
- No external API calls; no backend; no LLM
- The 60 book pages in `pagesConfig.js` are not accessible to the chat
- Simple keyword scoring: brittle, no semantic understanding, no conversation memory

---

## Architecture

```
Browser (React)
  └─ POST /api/chat  { message, history }
        │
        ▼
Vercel Serverless Function  /api/chat.js
  ├─ 1. Validate request
  ├─ 2. Import /api/knowledge.js
  ├─ 3. Retrieve top-6 chunks  (keyword + entity + content scoring)
  ├─ 4. If score = 0 → return fallback immediately (no Claude call)
  └─ 5. Call Claude Haiku 4.5 with system prompt + context + history
        │
        ▼
Anthropic API  (ANTHROPIC_API_KEY — Vercel env var, never in frontend)
        │
        ▼
  { answer: "..." }  → rendered in existing chat UI
```

---

## Files

### New

| Path | Purpose |
|---|---|
| `/api/chat.js` | Vercel serverless function — retrieval + Claude call |
| `/api/knowledge.js` | Expanded knowledge base covering all book chapters and pages |
| `.env.example` | Documents `ANTHROPIC_API_KEY=your_key_here` (no real key) |

### Modified

| Path | Change |
|---|---|
| `/src/pages/AIChatPage.jsx` | Remove local search/answer logic; add `fetch('/api/chat')` + history state; keep UI identical |
| `vercel.json` | Add `api` to SPA rewrite exclusion so `/api/chat` is not rewritten to `index.html` |
| `package.json` | Add `@anthropic-ai/sdk` as runtime dependency |

### Untouched

All CSS files, all page components, BookLayout, pagesConfig, PDF export, Navigation, FloatingMenu.

---

## Knowledge Base Format

File: `/api/knowledge.js`

```javascript
export const knowledge = [
  {
    id: "unique-slug",
    chapter: "פרק בעברית",
    title: "כותרת",
    keywords: ["מילת מפתח"],
    entities: {
      people:    ["שמות אנשים"],
      places:    ["מקומות"],
      relations: ["קשרים משפחתיים"]
    },
    content: "תוכן הרשומה."
  },
  // ...
];
```

The `entities` field is new — it gives the retriever high-weight signals for Hebrew proper nouns and family relations that keyword substring matching often misses. All 30 existing entries from `projectKnowledge.js` are migrated and expanded; additional entries added for all book pages not yet represented.

---

## Retrieval / Scoring

Function: `retrieveChunks(question, knowledge, topK = 6)`

Scoring per entry:

| Signal | Condition | Points |
|---|---|---|
| Keyword match | Long keyword (>3 chars) in question | +5 |
| Keyword match | Short keyword in question | +2 |
| Entity: person | Person name in question | +6 |
| Entity: relation | Family relation in question | +5 |
| Entity: place | Place name in question | +4 |
| Chapter match | Chapter name in question | +3 |
| Title word match | Title word in question | +2 |
| Content overlap | Normalized question word in content | +1 |

**Hebrew prefix normalization:** strip ב/ו/ה/מ/ל/כ/ש from the start of each question word before content overlap scoring. Handles `"בישראל"→"ישראל"`, `"לרוני"→"רוני"`, etc.

**Selection:** top 6 entries with score > 0. If all scores = 0, return `[]` and skip Claude entirely — return fallback message.

---

## API Route

`/api/chat.js` — Vercel serverless, Node.js runtime

**Request:**
```json
{
  "message": "מי זאת סבתא שלי?",
  "history": [
    { "role": "user",      "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```

**Response 200:**
```json
{ "answer": "סבתא רבקה היא..." }
```

**Response error (any 4xx/5xx):**
```json
{ "answer": "מצטערת, הייתה שגיאה זמנית. נסה שוב." }
```

**Validation:**
- Message must be non-empty string
- Message max 500 characters → 400 if exceeded
- History is optional; if provided, last 6 exchanges are used (prevents token blowup)

**CORS:** `Access-Control-Allow-Origin: *` for development; tighten to production domain after deploy.

---

## Claude System Prompt

Model: `claude-haiku-4-5-20251001`

```
אתה מדריך אישי לספר השורשים של רוני ברנר — ילדה בת 12 מישראל.
תפקידך: לענות על שאלות אך ורק על בסיס המידע שסופק להלן.

## כללים
1. ענה רק מהמידע שמופיע בקטע "מידע מהספר" להלן. אל תמציא עובדות.
2. אם המידע אינו קיים — ענה בדיוק: "אני לא מוצא מידע על זה בתוך ספר השורשים."
3. ענה תמיד בעברית, בסגנון חם, אישי ורגשי — כמו מי שמכיר את הסיפור מקרוב.
4. כתוב בפסקאות קצרות וקריאות. אל תציין מאיזה פרק לקחת את המידע.
5. אל תחזור על השאלה. ענה ישירות.

## מידע מהספר
{CONTEXT}

## שאלה
{QUESTION}
```

Conversation history is passed via the standard `messages` array (not in the system prompt text), enabling Claude to handle follow-up questions naturally.

---

## Fallback / Error Behavior

| Scenario | Behavior |
|---|---|
| All retrieval scores = 0 | Return `"אני לא מוצא מידע על זה בתוך ספר השורשים."` immediately; no Claude call |
| Claude returns empty or malformed | Return same fallback |
| `ANTHROPIC_API_KEY` missing | 500; frontend shows `"מצטערת, הייתה שגיאה זמנית. נסה שוב."` |
| Rate limit (429) or timeout | Same transient error message |
| Message > 500 chars | 400; frontend shows `"השאלה ארוכה מדי."` |
| Network error on frontend | `"מצטערת, הייתה שגיאה זמנית. נסה שוב."` shown as chat bubble |

---

## Vercel Environment Variable Setup

1. Vercel Dashboard → Project → Settings → Environment Variables
2. Add: `ANTHROPIC_API_KEY` = `sk-ant-api03-...`
3. Enable for: Production ✓ Preview ✓ Development ✓
4. Redeploy once

Local dev: create `.env.local` in project root (Vite auto-loads it; already gitignored):
```
ANTHROPIC_API_KEY=sk-ant-api03-...
```

---

## Frontend Changes (AIChatPage.jsx)

Remove:
- Import of `projectKnowledge`
- `findRelevantEntries` function
- `buildAnswer` function
- `setTimeout` mock delay

Add:
- `conversationHistory` state (array of `{ role, content }`)
- `sendMessage` calls `fetch('/api/chat', { method: 'POST', body: JSON.stringify({ message, history }) })`
- On response: update history + messages state
- On error: show transient error bubble
- Keep all existing UI (TypingIndicator, ChatBubble, suggestions, input bar) — no visual changes

---

## Constraints

- Do not touch any `.module.css` files
- Do not modify any page components other than `AIChatPage.jsx`
- Do not change `pagesConfig.js`
- Keep the existing chat UI layout and styling exactly as-is
- `@anthropic-ai/sdk` is the only new dependency
