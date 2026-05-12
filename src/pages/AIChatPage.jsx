import { useState, useRef, useEffect } from 'react';
import styles from './AIChatPage.module.css';
import { knowledge } from '../../api/knowledge.js';
import { retrieveChunks } from '../../api/retrieval.js';

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

const SYNONYMS = {
  'אימא': 'אמא',
  'אמי': 'אמא',
  'אמה': 'אמא',
  'אבי': 'אבא',
  'ריקודים': 'ריקוד',
  'לרקד': 'לרקוד',
  'חלומות': 'חלום',
  'עיסוק': 'מקצוע',
};

function expandQuery(question) {
  let q = question;
  for (const [from, to] of Object.entries(SYNONYMS)) {
    q = q.replace(new RegExp(from, 'g'), to);
  }
  return q;
}

const FALLBACK = 'אני לא מוצא מידע על זה בתוך ספר השורשים.';

function buildAnswer(entries) {
  if (entries.length === 0) return FALLBACK;
  const [first, second] = entries;
  if (!second) return first.content;
  // Same chapter: both entries are complementary — combine them
  if (first.chapter === second.chapter) {
    return `${first.content}\n\n${second.content}`;
  }
  return first.content;
}

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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, thinking]);

  const sendMessage = (text) => {
    const question = text.trim();
    if (!question || thinking) return;

    const userMsg = { id: Date.now(), role: 'user', text: question };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setThinking(true);

    const delay = 500 + Math.random() * 600;
    setTimeout(() => {
      const expanded = expandQuery(question);
      const entries = retrieveChunks(expanded, knowledge, 2);
      const answer = buildAnswer(entries);
      const aiMsg = { id: Date.now() + 1, role: 'ai', text: answer };
      setMessages(prev => [...prev, aiMsg]);
      setThinking(false);
    }, delay);
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
