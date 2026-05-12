# AI Chat — Claude-Powered Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the client-side keyword-search chat with a real Claude-powered AI assistant that answers only from the book's knowledge base, via a secure Vercel serverless function.

**Architecture:** A new `/api/chat.js` Vercel serverless function receives the user's message, scores all knowledge entries against it using multi-signal Hebrew-aware retrieval (`/api/retrieval.js`), then sends only the top-6 relevant chunks to Claude Haiku with a strict grounding system prompt. The React frontend (`AIChatPage.jsx`) calls this endpoint and passes conversation history — the API key never touches the client.

**Tech Stack:** `@anthropic-ai/sdk`, Vercel serverless (Node.js ESM), Vitest (unit tests), React 18 + Vite

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `api/knowledge.js` | Create | All knowledge entries with `entities` field |
| `api/retrieval.js` | Create | Pure `retrieveChunks` + `normalizeHebrew` functions |
| `api/chat.js` | Create | Vercel serverless handler — validates, retrieves, calls Claude |
| `api/__tests__/knowledge.test.js` | Create | Validates every entry has required fields |
| `api/__tests__/retrieval.test.js` | Create | Unit tests for scoring and Hebrew normalization |
| `src/pages/AIChatPage.jsx` | Modify | Replace local logic with `fetch('/api/chat')` + history |
| `vercel.json` | Modify | Add `api` to SPA rewrite exclusion |
| `vite.config.js` | Modify | Add Vitest `test` config |
| `package.json` | Modify | Add `@anthropic-ai/sdk` + `vitest` |
| `.env.example` | Create | Documents `ANTHROPIC_API_KEY` placeholder |

---

## Task 1: Setup — Dependencies, Vitest, vercel.json, .env.example

**Files:**
- Modify: `package.json`
- Modify: `vite.config.js`
- Modify: `vercel.json`
- Create: `.env.example`

- [ ] **Step 1: Update package.json**

Replace the contents of `package.json` with:

```json
{
  "name": "roni-roots",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.52.0",
    "html2canvas": "^1.4.1",
    "jspdf": "^4.2.1",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "playwright": "^1.59.1",
    "vite": "^5.4.0",
    "vitest": "^1.6.0"
  }
}
```

- [ ] **Step 2: Add Vitest config to vite.config.js**

Replace the contents of `vite.config.js` with:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
    include: ['api/__tests__/**/*.test.js'],
  },
});
```

- [ ] **Step 3: Update vercel.json to exclude /api/ from SPA rewrite**

Replace the contents of `vercel.json` with:

```json
{
  "rewrites": [
    { "source": "/((?!api|assets|.*\\..*).*)", "destination": "/index.html" }
  ]
}
```

- [ ] **Step 4: Create .env.example**

Create `/Users/roy.brener/workspace/Roni/.env.example` with contents:

```
ANTHROPIC_API_KEY=your_key_here
```

- [ ] **Step 5: Install dependencies**

```bash
npm install
```

Expected: installs `@anthropic-ai/sdk` and `vitest`, no errors.

- [ ] **Step 6: Verify Vitest works**

```bash
npm test
```

Expected output: `No test files found, exiting with code 0` — Vitest runs successfully with no tests yet.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vite.config.js vercel.json .env.example
git commit -m "feat: add anthropic sdk, vitest, update vercel rewrite for api routes"
```

---

## Task 2: Knowledge Base

**Files:**
- Create: `api/__tests__/knowledge.test.js`
- Create: `api/knowledge.js`

- [ ] **Step 1: Create the test directory and write the failing test**

```bash
mkdir -p api/__tests__
```

Create `api/__tests__/knowledge.test.js`:

```javascript
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
```

- [ ] **Step 2: Run the test — confirm it fails**

```bash
npm test
```

Expected: FAIL — `Cannot find module '../knowledge.js'`

- [ ] **Step 3: Create api/knowledge.js**

Create `api/knowledge.js` with all entries (existing 26 entries migrated and expanded with the `entities` field):

```javascript
export const knowledge = [
  // ── Chapter 1: Who is Roni ──────────────────────────────────
  {
    id: 'who-is-roni',
    chapter: 'מי אני',
    title: 'קצת על רוני',
    keywords: ['רוני', 'מי', 'כיתה', 'תלמידה', 'מי אני', 'בת', 'גיל'],
    entities: {
      people: ['רוני', 'רוני ברנר'],
      places: ['מושב רגבה', 'רגבה'],
      relations: [],
    },
    content:
      'רוני ברנר היא תלמידה בכיתה ז׳. היא גרה במושב רגבה. ' +
      'היא מגדירה את עצמה כילדה חברותית ויפה שאוהבת לעשות הרבה דברים. ' +
      'שלוש התכונות שמאפיינות אותה הן: אמיצה, חברה טובה, ורגישה. ' +
      'היא אוהבת לרקוד ולהיפגש עם חברות.',
  },
  {
    id: 'personality-traits',
    chapter: 'מי אני',
    title: 'תכונות אופי',
    keywords: ['תכונות', 'אופי', 'אמיצה', 'רגישה', 'חברה', 'מילים', 'מאפיינות'],
    entities: {
      people: ['רוני'],
      places: [],
      relations: [],
    },
    content:
      'שלוש המילים שמאפיינות את רוני הן: ' +
      '1. אמיצה — גם מול התחלות חדשות וחששות, היא תמיד בוחרת לנסות ולהתמודד. ' +
      '2. חברה טובה — אם מישהי צריכה עזרה, היא תמיד שם בשבילה. ' +
      '3. רגישה — מצבים מלחיצים או משמחים משפיעים עליה בצורה חזקה.',
  },
  {
    id: 'hobbies-challenges',
    chapter: 'מי אני',
    title: 'מה שאוהבת ומה שמאתגר',
    keywords: ['אוהבת', 'ריקוד', 'לרקוד', 'חוגים', 'תחביבים', 'פחד', 'מלחמה', 'אתגר'],
    entities: {
      people: ['רוני'],
      places: [],
      relations: ['אחיה'],
    },
    content:
      'רוני אוהבת לרקוד ולהתאמן בהתעמלות קרקע — אלה היו החוגים שלה. ' +
      'היא אוהבת להיפגש עם חברות. ' +
      'בתקופה הנוכחית מלווה אותה רגש של פחד, כי היא שומעת על המלחמה והמצב בארץ. ' +
      'היא מרגישה שאחריותה גדלה — היא מסדרת את החדר, זוכרת דברים חשובים, ועוזרת לאחיה.',
  },
  {
    id: 'future-aspirations',
    chapter: 'מי אני',
    title: 'שאיפות לעתיד',
    keywords: ['עתיד', 'חלום', 'להיות', 'לגדול', 'מקצוע', 'אדריכלית', 'מעצבת', 'עיצוב', 'שאיפות'],
    entities: {
      people: ['רוני'],
      places: [],
      relations: [],
    },
    content:
      'כשרוני תגדל, היא רוצה להיות אדריכלית או מעצבת פנים — מקצועות שמחברים יצירה, יופי ועיצוב. ' +
      'היא גם רוצה ללמוד עיצוב פנים ועיצוב אירועים כי זה מאוד מעניין אותה. ' +
      'כאדם, היא לא הייתה רוצה לשנות כלום בעצמה, ורוצה שבסביבה שלה כולם יהיו נחמדים.',
  },

  // ── Chapter 2: Name ──────────────────────────────────────────
  {
    id: 'name-meaning',
    chapter: 'השם שלי',
    title: 'על השם רוני',
    keywords: ['שם', 'רוני', 'משמעות', 'שמי', 'נקראת', 'נקרא', 'למה', 'כינוי'],
    entities: {
      people: ['רוני', 'רוני ברנר'],
      places: [],
      relations: [],
    },
    content:
      'שמה של רוני הוא רוני ברנר. ' +
      'משמעות השם: המילה "רון" בעברית פירושה שמחה, רינה או שיר. ' +
      '"רוני" היא גם צורת ציווי: תשמחי, תשירי, תריעי. ' +
      'הכינוי שלה בבית הוא "רונצ׳ו". ' +
      'היא מרגישה שהשם קשור לאופי שלה כי היא בדרך כלל אדם שמח. ' +
      'לא הייתה רוצה לשנות את שמה.',
  },
  {
    id: 'name-story',
    chapter: 'השם שלי',
    title: 'למה נקראת רוני — הסיפור מאחורי השם',
    keywords: ['למה', 'נקראת', 'ניר', 'דוד', 'פיגוע', 'מקסים', 'זכר', 'אותיות', 'סיפור השם'],
    entities: {
      people: ['רוני', 'ניר', 'ניר רגב'],
      places: [],
      relations: ['דוד', 'דוד מצד אמא'],
    },
    content:
      'הוריה של רוני בחרו בשם רוני לזכר דודה ניר ז"ל, ' +
      'כי השם "רוני" מורכב מאותן האותיות של שמו "ניר". ' +
      'כך השם משלב הנצחת זיכרון עם שמחת חיים — ' +
      '"השמחה שלי" או "השיר שלי", כמו בפסוק "רני ושמחי בת ציון".',
  },
  {
    id: 'name-facts',
    chapter: 'השם שלי',
    title: 'עובדות על השם רוני',
    keywords: ['עובדות', 'גימטריה', 'יוניסקס', 'מפורסמים', 'תנ"ך', 'בתנ"ך', 'רוני דלומי'],
    entities: {
      people: ['רוני דלומי', 'רוני קובן', 'רוני סומק', 'רוני אלשיך'],
      places: [],
      relations: [],
    },
    content:
      'עובדות על השם רוני: ' +
      'זהו שם יוניסקס — מתאים לבנים ולבנות. ' +
      'הוא בין-לאומי ונשמע טוב גם באנגלית (Roni). ' +
      'הגימטריה שלו היא 266. ' +
      'בתנ"ך המילה "רוני" מופיעה כקריאה לשמחה, ולא כשם של אדם. ' +
      'אנשים מפורסמים בשם רוני: רוני דלומי (זמרת ושחקנית), רוני קובן (עיתונאי ומנחה), ' +
      'רוני סומק (משורר), רוני אלשיך (מפכ"ל לשעבר).',
  },

  // ── Chapter 3: Uncle Nir ─────────────────────────────────────
  {
    id: 'uncle-nir',
    chapter: 'ניר ז"ל',
    title: 'ניר — הדוד שנהרג',
    keywords: ['ניר', 'דוד', 'פיגוע', 'מקסים', '2003', 'נהרג', 'נרצח', 'זיכרון', 'גיטרה'],
    entities: {
      people: ['ניר', 'ניר רגב'],
      places: ['מסעדת מקסים', 'מקסים'],
      relations: ['דוד', 'אח של אמא', 'דוד מצד אמא'],
    },
    content:
      'ניר רגב ז"ל היה דודה של רוני מצד אמא. ' +
      'הוא נרצח בפיגוע במסעדת מקסים בשנת 2003. ' +
      'רוני נקראת על שמו — השם רוני מורכב מאותן האותיות של השם ניר. ' +
      'ניר אהב מאוד לנגן בגיטרה כשהיה קטן, וגם כשהתבגר המוזיקה נשארה חלק ממנו. ' +
      'אחרי שנרצח, סבא וסבתא שמרו את הגיטרה שלו עד היום.',
  },
  {
    id: 'memorial-day',
    chapter: 'ניר ז"ל',
    title: 'יום הזיכרון ודוד ניר',
    keywords: ['יום הזיכרון', 'צפירה', 'זיכרון', 'נופלים', 'מצ"ח', 'אישי', 'קרוב'],
    entities: {
      people: ['ניר', 'ניר רגב', 'עינת'],
      places: [],
      relations: ['דוד', 'אמא'],
    },
    content:
      'יום הזיכרון הוא יום מאוד אישי למשפחתה של רוני, ' +
      'כי דודה ניר נרצח בפיגוע במקסים בשנת 2003. ' +
      'בזמן הצפירות רוני חושבת עליו ועל כל מי שאיבדו את חייהם. ' +
      'אמה של רוני עומדת ומתפרקת בצפירות כי אחיה נהרג. ' +
      'רוני חושבת שיום הזיכרון מחזק את תחושת השייכות לעם — ' +
      'כולם עומדים יחד בשקט ויש קשר חזק גם ברגעים קשים.',
  },

  // ── Chapter 4: Family ────────────────────────────────────────
  {
    id: 'family-core',
    chapter: 'המשפחה שלי',
    title: 'מפת המשפחה — עינת, רועי, עמית',
    keywords: ['עינת', 'אמא', 'רועי', 'אבא', 'עמית', 'אח', 'הורים', 'גרושים', 'אח קטן'],
    entities: {
      people: ['עינת', 'עינת ברנר', 'רועי', 'רועי ברנר', 'עמית', 'עמית ברנר'],
      places: [],
      relations: ['אמא', 'אבא', 'אח', 'אחיה', 'הורים'],
    },
    content:
      'בני משפחת הגרעין של רוני: ' +
      'אמא שלה עינת ברנר — "אמא נדירה, מלמדת אותי שלא צריך לפחד מהפחד", אשת הסודות והרכילויות של רוני. ' +
      'אבא שלה רועי ברנר — "אבא נדיר, תמיד אומר שצריך לצחוק כי לבכות לא עוזר, חיים פעם אחת". ' +
      'אח שלה עמית ברנר (נולד 2015) — "אח טוב, לפעמים קצת קרציה". ' +
      'ההורים של רוני גרושים.',
  },
  {
    id: 'family-role',
    chapter: 'המשפחה שלי',
    title: 'המקום של רוני במשפחה',
    keywords: ['תפקיד', 'מקום', 'בכורה', 'אחות', 'בישול', 'טכנולוגיה', 'עוזרת'],
    entities: {
      people: ['רוני'],
      places: [],
      relations: ['בכורה', 'אחות', 'אחות בכורה'],
    },
    content:
      'רוני היא הבכורה במשפחתה. ' +
      'תפקידיה במשפחה: אחות בכורה (יכולה לעשות דברים שאחיה הקטן עדיין לא יכול), ' +
      'עוזרת בבית (ניקיון, סידור, עזרה לאחיה), ' +
      'הטכנולוגית (כל שאלה טכנולוגית — שואלים אותה), ' +
      'אחות אוהבת, ושפית הבית — המומחית בבישול.',
  },
  {
    id: 'family-traditions',
    chapter: 'המשפחה שלי',
    title: 'מסורות ורגעים משפחתיים',
    keywords: ['מסורת', 'גלידה', 'סוכות', 'עפיפון', 'מושב', 'מסורות', 'לידה', 'אוכל', 'סוף שנה'],
    entities: {
      people: [],
      places: ['מושב רגבה', 'רגבה'],
      relations: ['משפחה'],
    },
    content:
      'מסורות משפחתיות ובמושב: ' +
      'כל סוף שנה הולכים לאכול גלידה ביום האחרון של הלימודים — כל המשפחה יחד. ' +
      'במושב: כשנולד תינוק, מתארגנים לספק אוכל למשפחה במשך חודש. ' +
      'בכל סוכות מכינים עפיפונים יחד.',
  },
  {
    id: 'family-guitar',
    chapter: 'המשפחה שלי',
    title: 'גיטרה — חפץ משפחתי',
    keywords: ['גיטרה', 'חפץ', 'זיכרון', 'שמור', 'נגינה', 'מוזיקה'],
    entities: {
      people: ['ניר', 'ניר רגב'],
      places: [],
      relations: ['סבא', 'סבתא', 'דוד'],
    },
    content:
      'הגיטרה הייתה שייכת לדוד ניר ז"ל. ' +
      'הוא אהב מאוד לנגן בגיטרה כשהיה קטן, וגם כשהתבגר המוזיקה נשארה חלק ממנו. ' +
      'אחרי שנרצח, סבא וסבתא שמרו את הגיטרה שלו עד היום. ' +
      'הגיטרה מזכירה שאפשר לשמור חפצים שמחזיקים בתוכם זיכרונות, אנשים וסיפורים מהעבר.',
  },

  // ── Chapter 5: Family tree ───────────────────────────────────
  {
    id: 'family-tree-grandparents',
    chapter: 'עץ המשפחה',
    title: 'עץ המשפחה — סבים וסבתות',
    keywords: ['סבא', 'סבתא', 'נתי', 'סילביה', 'אלי', 'אורה', 'ברנר', 'רגב', 'ארגנטינה'],
    entities: {
      people: ['נתי', 'נתי ברנר', 'סילביה', 'סילביה ברנר', 'אלי', 'אלי רגב', 'אורה', 'אורה רגב'],
      places: ['ישראל', 'ארגנטינה', 'קפריסין'],
      relations: ['סבא', 'סבתא', 'סבא מצד אבא', 'סבתא מצד אבא', 'סבא מצד אמא', 'סבתא מצד אמא'],
    },
    content:
      'סבים וסבתות של רוני: ' +
      'מצד אבא: סבא נתי ברנר (נולד 1955, ישראל) וסבתא סילביה רומנג ברנר (נולדה 1961, ארגנטינה). ' +
      'מצד אמא: סבא אלי רגב (נולד 1948, קפריסין) וסבתא אורה רגב (נולדה 1952, ישראל).',
  },
  {
    id: 'family-tree-ancestors',
    chapter: 'עץ המשפחה',
    title: 'עץ המשפחה — דורות קדומים',
    keywords: ['דורות', 'סבסבא', 'סבסבתא', 'לטביה', 'בולגריה', 'פולין', 'רומניה', 'ארגנטינה', 'שורשים'],
    entities: {
      people: ['משה ברנר', 'פנינה ברנר', 'ראובן רומנג', 'פולה רומנג', 'נתן הוניגספלד', 'אסתר הוניגספלד', 'מנשה יוסף', 'לוטי יוסף'],
      places: ['לטביה', 'בולגריה', 'פולין', 'רומניה', 'ארגנטינה'],
      relations: ['סב-סבא', 'סב-סבתא', 'אבות'],
    },
    content:
      'הדורות הקדומים במשפחת רוני: ' +
      'מצד אבי-אבא: משה ברנר (לטביה) ופנינה ברנר (בולגריה). ' +
      'ראובן ופולה רומנג (ארגנטינה). ' +
      'מצד אמא: נתן ואסתר הוניגספלד (פולין), מנשה ולוטי יוסף (רומניה).',
  },

  // ── Chapter 6: Migration ─────────────────────────────────────
  {
    id: 'migration-journey',
    chapter: 'מסלול הנדודים',
    title: 'מסע המשפחה לישראל',
    keywords: ['נדודים', 'פולין', 'רומניה', 'ארגנטינה', 'עלייה', 'ישראל', 'הגירה', 'מסע', 'עזבו', 'אירופה', 'אנטישמיות'],
    entities: {
      people: [],
      places: ['פולין', 'רומניה', 'ארגנטינה', 'ישראל', 'אירופה'],
      relations: ['משפחה'],
    },
    content:
      'שורשי משפחת רוני מתחילים בפולין וברומניה שבאירופה. ' +
      'בתחילת המאה העשרים, כשהאנטישמיות גברה, בני המשפחה נאלצו לחפש מקום בטוח. ' +
      'הם עברו מפולין לרומניה, ובשנות החמישים — אחרי קום המדינה — עלו לישראל. ' +
      'ההגעה לארץ הייתה מלאה התרגשות אבל גם קושי: שפה חדשה, תנאים לא פשוטים. ' +
      'מצד שני, סבתא סילביה נולדה בארגנטינה; המשפחה שם בחרה לעזוב ולבנות עתיד בישראל. ' +
      'בסופו של דבר שני הצדדים נפגשו בישראל ויצרו יחד את המשפחה. ' +
      '"ממסע הנדודים הזה למדתי שאומץ הוא לא רק להיות חזק — ' +
      'אלא גם להחזיק בתקווה, גם כשצריך לעזוב הכל מאחור."',
  },

  // ── Chapter 7: Community ─────────────────────────────────────
  {
    id: 'community-regba',
    chapter: 'הקהילה שלי',
    title: 'מושב רגבה',
    keywords: ['קהילה', 'מושב', 'רגבה', 'גרה', 'שכנים', 'אנשים', 'מקום', 'כפר'],
    entities: {
      people: [],
      places: ['מושב רגבה', 'רגבה'],
      relations: [],
    },
    content:
      'רוני גרה במושב רגבה. ' +
      'זה מקום קטן ונעים שבו כולם מכירים את כולם. ' +
      'האנשים נחמדים ועוזרים אחד לשני, יש אווירה רגועה וכיפית, נוף יפה של שדות ושל טבע. ' +
      'עושים פעילויות ואירועים ביחד בחגים. ' +
      'פעם זה היה מקום חקלאי — אנשים עבדו יחד בשדות ובנו את חייהם מחדש.',
  },
  {
    id: 'community-app',
    chapter: 'הקהילה שלי',
    title: 'המיזם הקהילתי — האפליקציה',
    keywords: ['מיזם', 'אפליקציה', 'אירועים', 'רעיון', 'קהילתי', 'אפליקציית'],
    entities: {
      people: ['רוני'],
      places: ['מושב רגבה', 'רגבה'],
      relations: [],
    },
    content:
      'הרעיון של רוני למיזם קהילתי הוא ליצור אפליקציה לאירועים במושב — ' +
      'כדי שתושבים יוכלו להירשם לאירועים ואפילו לעזור בארגון שלהם. ' +
      'האפליקציה תעזור לכולם להיות מעודכנים ולא לפספס דברים, ' +
      'ותגרום ליותר אנשים להשתתף בפעילויות.',
  },

  // ── Chapter 8: Life story ────────────────────────────────────
  {
    id: 'life-birth',
    chapter: 'הסיפור שלי',
    title: 'לידה וינקות',
    keywords: ['נולדה', 'נולדתי', 'ינקות', 'תינוק', 'לידה', 'מילה ראשונה', 'צעד', 'בתולה', 'ספטמבר', '2013'],
    entities: {
      people: ['רוני'],
      places: [],
      relations: ['אחיה'],
    },
    content:
      'רוני נולדה ב-20 בספטמבר 2013. ' +
      'מזלה הוא בתולה. ' +
      'המילה הראשונה שיצאה מפיה הייתה "אבא". ' +
      'היא לקחה את צעדיה הראשונים בגיל שנה וחודש. ' +
      'היא הצחיקה את אחיה — והיו צוחקים יחד המון.',
  },
  {
    id: 'life-kindergarten',
    chapter: 'הסיפור שלי',
    title: 'גיל הגן',
    keywords: ['גן', 'גנים', 'פצפונים', 'חצב', 'רגבים', 'חרצית', 'ספר', 'חנן', 'ילדות קטנה', 'קורונה'],
    entities: {
      people: ['רוני'],
      places: ['כינרת', 'רמת הגולן'],
      relations: [],
    },
    content:
      'רוני ביקרה בגנים הבאים: פצפונים, חצב, רגבים, חרצית קטנים, חרצית גדולים. ' +
      'הספר שהכי אהבה בילדות: "חנן הגנן". ' +
      'בחופשות ביקרה בחו"ל ובארץ — במיוחד בכינרת וברמת הגולן. ' +
      'בזמן הקורונה עשתה בדיקה, וכשהוציאו את המקל מהאף קרה משהו מצחיק שגרם לכולם לצחוק.',
  },
  {
    id: 'life-childhood',
    chapter: 'הסיפור שלי',
    title: 'גיל הילדות',
    keywords: ['ילדות', 'כיתה א', 'חיסון', 'הצגות', 'מחשב', 'יוטיוב', 'חברות', 'שחקנו'],
    entities: {
      people: ['רוני'],
      places: [],
      relations: ['חברות'],
    },
    content:
      'בגיל הילדות: ' +
      'מהבית הלכו להצגות ולהופעות — ותמיד היה ממש כיף. ' +
      'בכיתה א, כשעשו חיסונים, שמו שירים וצחקו אחת על השנייה. ' +
      'תמיד היה כיף עם חברות. ' +
      'אהבה לרקוד ולהתאמן בהתעמלות קרקע — אלה היו החוגים שלה. ' +
      'בשעות הפנאי שיחקה עם המשפחה וצפתה ביוטיוב במחשב.',
  },

  // ── Chapter 9: Bat Mitzvah ───────────────────────────────────
  {
    id: 'bat-mitzvah',
    chapter: 'בת מצווה',
    title: 'איך חגגה את בת המצווה',
    keywords: ['בת מצווה', 'חגיגה', 'מסיבה', 'לונדון', 'כיתה', 'חגגה', 'טסתי', 'כבוד', 'אחריות'],
    entities: {
      people: ['רוני', 'עינת'],
      places: ['לונדון'],
      relations: ['אמא'],
    },
    content:
      'רוני חגגה את בת המצווה שלה במסיבה עם כל הכיתה שלה — והיה לה מאוד כיף. ' +
      'בנוסף, טסה ללונדון עם אמא שלה — זמן מיוחד רק שלהן שחיכתה לו מאוד. ' +
      'מהבת המצווה הבינה שהיא כבר גדלה ולוקחת יותר אחריות על עצמה. ' +
      'ערכים שלקחה: כבוד, אחריות וחברות טובה.',
  },

  // ── Chapter 10: Summary ──────────────────────────────────────
  {
    id: 'project-summary',
    chapter: 'סיכום המסע',
    title: 'מה למדה מהעבודה',
    keywords: ['למדתי', 'מסע', 'סיכום', 'מה הבנת', 'מה גיליתי', 'מסקנה', 'עבודה', 'שורשים'],
    entities: {
      people: ['רוני'],
      places: [],
      relations: ['משפחה'],
    },
    content:
      'מעבודת השורשים רוני למדה הרבה: ' +
      '"גיליתי שאני סקרנית ואוהבת לשמוע סיפורים, במיוחד על הדברים הקטנים שהופכים את העבר למשהו חי." ' +
      '"למדתי כמה המשפחה שלי עברה, כמה אומץ היה להם וכמה הם היו חזקים." ' +
      '"הבנתי שאני חלק ממשהו גדול יותר." ' +
      '"אני לוקחת איתי תחושת שייכות וגאווה, וגם הבנה שהעבר שלי נותן לי כוח להמשיך קדימה."',
  },

  // ── Chapter 11: Social circles ───────────────────────────────
  {
    id: 'social-friends',
    chapter: 'מעגלי השייכות',
    title: 'חברות ומעגל חברתי',
    keywords: ['חברות', 'חברים', 'ריב', 'חבורה', 'גן', 'נפתר', 'ביחד'],
    entities: {
      people: ['רוני'],
      places: [],
      relations: ['חברות', 'חבורה'],
    },
    content:
      'לרוני יש חבורת חברות מגובשת שהולכת יחד עוד מהגן. ' +
      'אצלהן בחבורה — גם אם יש ריב, הוא נפתר עוד באותו היום. ' +
      'לא מתעסקים עם זה יותר, ומקבלים בברכה כל מצטרפת חדשה.',
  },
  {
    id: 'national-identity',
    chapter: 'מעגלי השייכות',
    title: 'מדינה וזהות לאומית',
    keywords: ['מדינה', 'ישראל', 'גאווה', 'לאומי', 'שייכות', 'דגל', 'המנון', 'תקווה', 'ציון'],
    entities: {
      people: ['רוני'],
      places: ['ישראל'],
      relations: [],
    },
    content:
      'המדינה חשובה לרוני מאוד כי נולדה בה. ' +
      'היא גאה בנופים, בחגים ובאתרים ההיסטוריים. ' +
      'היא מרגישה שייכת לכאן בכל ליבה. ' +
      'יום הזיכרון מחזק אצלה את תחושת השייכות לעם ולמדינה.',
  },

  // ── General ──────────────────────────────────────────────────
  {
    id: 'project-overview',
    chapter: 'כללי',
    title: 'על עבודת השורשים',
    keywords: ['עבודה', 'עבודת שורשים', 'על מה', 'הפרויקט', 'מה זה', 'ספר'],
    entities: {
      people: ['רוני', 'רוני ברנר'],
      places: [],
      relations: [],
    },
    content:
      'עבודת השורשים של רוני היא עבודה בית ספרית לכיתה ז׳ ' +
      'שמספרת את סיפורה האישי, משפחתה, שמה, שורשיה, קהילתה, וזהותה הלאומית. ' +
      'היא כוללת פרקים על: מי היא, השם שלה, סיפור חייה, המשפחה, עץ המשפחה, ' +
      'מסלול הנדודים של המשפחה, הקהילה, הזהות הלאומית, ובת המצווה.',
  },
]
```

- [ ] **Step 4: Run the test — confirm it passes**

```bash
npm test
```

Expected: all 4 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add api/__tests__/knowledge.test.js api/knowledge.js
git commit -m "feat: add knowledge base with entities field for all book chapters"
```

---

## Task 3: Retrieval Function

**Files:**
- Create: `api/__tests__/retrieval.test.js`
- Create: `api/retrieval.js`

- [ ] **Step 1: Write the failing tests**

Create `api/__tests__/retrieval.test.js`:

```javascript
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
    // "ניר" should rank uncle-nir entries highly
    const results = retrieveChunks('מי ניר', knowledge)
    if (results.length > 1) {
      // First result should be about Nir
      expect(
        results[0].entities.people.includes('ניר') ||
        results[0].chapter.includes('ניר')
      ).toBe(true)
    }
  })
})
```

- [ ] **Step 2: Run the tests — confirm they fail**

```bash
npm test
```

Expected: FAIL — `Cannot find module '../retrieval.js'`

- [ ] **Step 3: Create api/retrieval.js**

Create `api/retrieval.js`:

```javascript
const HEBREW_PREFIX = /^[בוהמלכש]/

export function normalizeHebrew(word) {
  return word.replace(HEBREW_PREFIX, '')
}

export function retrieveChunks(question, knowledge, topK = 6) {
  const qLower = question.toLowerCase()
  const qWords = qLower
    .split(/[\s,?!.״׳"']+/)
    .filter(w => w.length > 1)
    .map(normalizeHebrew)

  const scored = knowledge.map(entry => {
    let score = 0

    // Signal 1: Keyword match
    for (const kw of entry.keywords) {
      if (qLower.includes(kw.toLowerCase())) {
        score += kw.length > 3 ? 5 : 2
      }
    }

    // Signal 2: Entity match
    if (entry.entities) {
      for (const person of entry.entities.people ?? []) {
        if (qLower.includes(person.toLowerCase())) score += 6
      }
      for (const rel of entry.entities.relations ?? []) {
        if (qLower.includes(rel.toLowerCase())) score += 5
      }
      for (const place of entry.entities.places ?? []) {
        if (qLower.includes(place.toLowerCase())) score += 4
      }
    }

    // Signal 3: Chapter / title word match
    if (qLower.includes(entry.chapter.toLowerCase())) score += 3
    for (const tw of entry.title.toLowerCase().split(/\s+/)) {
      if (tw.length > 1 && qWords.some(qw => qw === tw || tw.includes(qw))) score += 2
    }

    // Signal 4: Content word overlap (prefix-normalized)
    const contentLower = entry.content.toLowerCase()
    for (const qw of qWords) {
      if (qw.length > 2 && contentLower.includes(qw)) score += 1
    }

    return { entry, score }
  })

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(s => s.entry)
}
```

- [ ] **Step 4: Run the tests — confirm they all pass**

```bash
npm test
```

Expected: all retrieval tests PASS. If any fail, re-read the scoring logic and the failing test — do not adjust the tests to match wrong behavior.

- [ ] **Step 5: Commit**

```bash
git add api/__tests__/retrieval.test.js api/retrieval.js
git commit -m "feat: add Hebrew-aware retrieval function with multi-signal scoring"
```

---

## Task 4: Serverless Handler

**Files:**
- Create: `api/chat.js`

No unit tests for this file — it requires a live `ANTHROPIC_API_KEY`. It will be smoke-tested manually in Task 6.

- [ ] **Step 1: Create api/chat.js**

Create `api/chat.js`:

```javascript
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
```

- [ ] **Step 2: Run existing tests to confirm nothing broke**

```bash
npm test
```

Expected: all tests still PASS (knowledge + retrieval tests only — no new tests for chat.js).

- [ ] **Step 3: Commit**

```bash
git add api/chat.js
git commit -m "feat: add vercel serverless handler for Claude-powered chat"
```

---

## Task 5: Update AIChatPage.jsx

**Files:**
- Modify: `src/pages/AIChatPage.jsx`

- [ ] **Step 1: Replace AIChatPage.jsx**

Replace the full contents of `src/pages/AIChatPage.jsx` with:

```javascript
import { useState, useRef, useEffect } from 'react';
import styles from './AIChatPage.module.css';

function TypingIndicator() {
  return (
    <div className={`${styles.bubble} ${styles.bubbleAI} ${styles.typing}`} aria-label="מעבד...">
      <span /><span /><span />
    </div>
  );
}

function ChatBubble({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`${styles.row} ${isUser ? styles.rowUser : styles.rowAI}`}>
      {!isUser && (
        <div className={styles.avatar} aria-hidden="true">🤖</div>
      )}
      <div className={`${styles.bubble} ${isUser ? styles.bubbleUser : styles.bubbleAI}`}>
        {msg.text}
      </div>
    </div>
  );
}

const SUGGESTIONS = [
  'מי זה ניר?',
  'למה רוני נקראת רוני?',
  'מה תכונות האופי של רוני?',
  'מה המסורות של המשפחה?',
  'מה רוני רוצה להיות כשתגדל?',
  'מאיפה באה המשפחה?',
];

export default function AIChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 0,
      role: 'ai',
      text: 'שלום! אני עוזרת הבינה המלאכותית של עבודת השורשים של רוני 🤖\nאני יודעת הכל על העבודה — שאלי אותי כל שאלה!',
    },
  ]);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, thinking]);

  const sendMessage = async (text) => {
    const question = text.trim();
    if (!question || thinking) return;

    const userMsg = { id: Date.now(), role: 'user', text: question };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setThinking(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question, history: conversationHistory }),
      });
      const data = await res.json();
      const answer = data.answer || 'מצטערת, הייתה שגיאה זמנית. נסה שוב.';

      const aiMsg = { id: Date.now() + 1, role: 'ai', text: answer };
      setMessages(prev => [...prev, aiMsg]);
      setConversationHistory(prev => [
        ...prev,
        { role: 'user', content: question },
        { role: 'assistant', content: answer },
      ]);
    } catch {
      const errMsg = {
        id: Date.now() + 1,
        role: 'ai',
        text: 'מצטערת, הייתה שגיאה זמנית. נסה שוב.',
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setThinking(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestion = (s) => {
    sendMessage(s);
    inputRef.current?.focus();
  };

  return (
    <div className={styles.page} dir="rtl">

      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <span className={styles.headerIcon} aria-hidden="true">🤖</span>
          <div>
            <h1 className={styles.headerTitle}>צ׳אט על העבודה שלי</h1>
            <p className={styles.headerSub}>שאלי כל שאלה על עבודת השורשים</p>
          </div>
        </div>
      </header>

      {/* ── Suggestion chips ── */}
      {messages.length === 1 && (
        <div className={styles.suggestions} aria-label="שאלות לדוגמה">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              className={styles.chip}
              onClick={() => handleSuggestion(s)}
              type="button"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* ── Chat area ── */}
      <div className={styles.chatArea} role="log" aria-live="polite">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} msg={msg} />
        ))}
        {thinking && (
          <div className={styles.row} style={{ justifyContent: 'flex-start' }}>
            <div className={styles.avatar} aria-hidden="true">🤖</div>
            <TypingIndicator />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* ── Input bar ── */}
      <form className={styles.inputBar} onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="כתבי שאלה על העבודה..."
          dir="rtl"
          aria-label="הכנסי שאלה"
          disabled={thinking}
        />
        <button
          className={styles.sendBtn}
          type="submit"
          disabled={!input.trim() || thinking}
          aria-label="שלחי"
        >
          ➤
        </button>
      </form>
    </div>
  );
}
```

- [ ] **Step 2: Run all tests to confirm nothing regressed**

```bash
npm test
```

Expected: all tests PASS.

- [ ] **Step 3: Commit**

```bash
git add src/pages/AIChatPage.jsx
git commit -m "feat: connect AIChatPage to /api/chat with real Claude backend"
```

---

## Task 6: Local Integration Smoke Test

**Requires:** `ANTHROPIC_API_KEY` set in `.env.local`

Before running: create `.env.local` in the project root (never commit this file):
```
ANTHROPIC_API_KEY=sk-ant-api03-...
```

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Expected: server starts at `http://localhost:5173` (or similar), no errors in terminal.

- [ ] **Step 2: Open the chat and test each question type**

Navigate to the AI Chat section. Send each of these questions and confirm Claude answers from book content (not general knowledge):

| Question | Expected behavior |
|---|---|
| `מי זה ניר?` | Answers about Uncle Nir, mentions 2003 attack, guitar |
| `מי הסבתא של רוני?` | Answers about Savta Ora and/or Savta Silvia with their details |
| `מה רוני רוצה להיות כשתגדל?` | Answers architect / interior designer |
| `מאיפה באה המשפחה?` | Answers Poland, Romania, Argentina → Israel |
| `מה זה כדורגל?` | Returns: "אני לא מוצא מידע על זה בתוך ספר השורשים." |
| Follow-up: ask "ועוד?" after any answer | Claude uses conversation history for context |

- [ ] **Step 3: Verify no API key appears in browser**

Open browser DevTools → Network tab → click one of the chat requests → inspect Request Headers and Payload. Confirm: no `ANTHROPIC_API_KEY` appears anywhere in the request.

- [ ] **Step 4: Commit if any minor fixes were needed**

If you fixed anything during smoke testing:
```bash
git add <changed files>
git commit -m "fix: smoke test corrections to chat handler"
```

---

## Task 7: Deploy to Vercel

- [ ] **Step 1: Add ANTHROPIC_API_KEY to Vercel**

1. Go to [vercel.com](https://vercel.com) → your project → Settings → Environment Variables
2. Add variable: `ANTHROPIC_API_KEY` = your key
3. Enable for: ✅ Production  ✅ Preview  ✅ Development
4. Click Save

- [ ] **Step 2: Push to deploy**

```bash
git push origin main
```

Wait for Vercel to finish building. Expected: green deployment, no build errors.

- [ ] **Step 3: Smoke test on production URL**

Open the deployed URL → navigate to AI Chat → send `"מי זה ניר?"` → confirm Claude responds correctly.

If the response is the fallback error message, check Vercel → Functions → `api/chat` → Logs for the error details.
