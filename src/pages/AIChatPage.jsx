import { useState, useRef, useEffect } from 'react';
import { projectKnowledge } from '../data/projectKnowledge';
import styles from './AIChatPage.module.css';

// ─────────────────────────────────────────────────────────────
// Simple knowledge search engine
// ─────────────────────────────────────────────────────────────

function findRelevantEntries(question) {
  const q = question.toLowerCase();

  // Score each knowledge entry by keyword matches
  const scored = projectKnowledge.map((entry) => {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(kw.toLowerCase())) {
        score += kw.length > 3 ? 3 : 1; // longer keyword = higher score
      }
    }
    // Also check if any word in the question appears in the content
    const words = q.split(/[\s,?!.]+/).filter((w) => w.length > 2);
    for (const w of words) {
      if (entry.content.includes(w)) score += 1;
      if (entry.title.includes(w)) score += 2;
    }
    return { entry, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.entry);
}

function buildAnswer(question, entries) {
  if (entries.length === 0) {
    return 'אני לא יודעת לפי המידע שקיים בעבודה.';
  }

  // Combine content from top matches
  const combined = entries.map((e) => e.content).join(' ');

  // Build a natural answer based on question type
  const q = question.toLowerCase();

  if (q.includes('מי') || q.includes('מה זה') || q.includes('מה היא')) {
    return combined;
  }
  if (q.includes('למה') || q.includes('מדוע')) {
    return combined;
  }
  if (q.includes('איפה') || q.includes('מאיפה')) {
    return combined;
  }
  if (q.includes('מתי') || q.includes('כמה')) {
    return combined;
  }
  if (q.includes('איך') || q.includes('כיצד')) {
    return combined;
  }

  return combined;
}

// ─────────────────────────────────────────────────────────────
// Components
// ─────────────────────────────────────────────────────────────

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
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, thinking]);

  const sendMessage = (text) => {
    const question = text.trim();
    if (!question) return;

    const userMsg = { id: Date.now(), role: 'user', text: question };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setThinking(true);

    // Simulate "thinking" delay for realism
    setTimeout(() => {
      const entries = findRelevantEntries(question);
      const answer = buildAnswer(question, entries);
      const aiMsg = { id: Date.now() + 1, role: 'ai', text: answer };
      setMessages((prev) => [...prev, aiMsg]);
      setThinking(false);
    }, 700 + Math.random() * 500);
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

      {/* ── Suggestion chips (show only when just the greeting is there) ── */}
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
