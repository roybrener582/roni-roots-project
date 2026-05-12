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
