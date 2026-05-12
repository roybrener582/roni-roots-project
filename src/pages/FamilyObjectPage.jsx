import PageLayout from '../components/PageLayout';
import styles from './FamilyObjectPage.module.css';

function SurfboardIllustration() {
  return (
    <svg
      viewBox="0 0 160 460"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.boardSvg}
      aria-label="גלשן גלים"
      role="img"
    >
      <defs>
        <linearGradient id="fo-board" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#D8EEF6" />
          <stop offset="48%"  stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#CCE8F4" />
        </linearGradient>
        <linearGradient id="fo-stripe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#5BAAC8" />
          <stop offset="100%" stopColor="#3D8DB8" />
        </linearGradient>
        <linearGradient id="fo-fin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#4A9EC0" />
          <stop offset="100%" stopColor="#2C7EA0" />
        </linearGradient>
        <radialGradient id="fo-sheen" cx="32%" cy="28%" r="54%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.55)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <filter id="fo-drop" x="-20%" y="-5%" width="140%" height="115%">
          <feDropShadow dx="3" dy="6" stdDeviation="10" floodColor="rgba(25,85,130,0.16)" />
        </filter>
        <clipPath id="fo-board-clip">
          <path d="M 80 22
                   C 92 30 118 82 124 162
                   C 128 212 126 252 126 262
                   C 126 294 120 342 116 372
                   C 112 390 108 400 80 404
                   C 52 400 48 390 44 372
                   C 40 342 34 294 34 262
                   C 34 252 32 212 36 162
                   C 42 82 68 30 80 22 Z" />
        </clipPath>
      </defs>

      {/* ── Ambient shadow ── */}
      <ellipse cx="82" cy="390" rx="50" ry="14" fill="rgba(25,85,130,0.07)" />

      {/* ── Board body ── */}
      <path
        d="M 80 22
           C 92 30 118 82 124 162
           C 128 212 126 252 126 262
           C 126 294 120 342 116 372
           C 112 390 108 400 80 404
           C 52 400 48 390 44 372
           C 40 342 34 294 34 262
           C 34 252 32 212 36 162
           C 42 82 68 30 80 22 Z"
        fill="url(#fo-board)"
        stroke="#9ECDE0"
        strokeWidth="1.5"
        filter="url(#fo-drop)"
      />

      {/* ── Decorative stripe ── */}
      <rect
        x="28"
        y="218"
        width="104"
        height="58"
        fill="url(#fo-stripe)"
        clipPath="url(#fo-board-clip)"
        opacity="0.82"
      />
      {/* Stripe top edge highlight */}
      <rect
        x="28"
        y="218"
        width="104"
        height="3"
        fill="rgba(255,255,255,0.35)"
        clipPath="url(#fo-board-clip)"
      />

      {/* ── Light sheen ── */}
      <path
        d="M 80 22
           C 92 30 118 82 124 162
           C 128 212 126 252 126 262
           C 126 294 120 342 116 372
           C 112 390 108 400 80 404
           C 52 400 48 390 44 372
           C 40 342 34 294 34 262
           C 34 252 32 212 36 162
           C 42 82 68 30 80 22 Z"
        fill="url(#fo-sheen)"
      />

      {/* ── Rail outline (edge detail) ── */}
      <path
        d="M 80 24
           C 91 32 116 84 122 163
           C 126 213 124 253 124 263
           C 124 295 118 342 114 372
           C 110 389 106 399 80 402"
        fill="none"
        stroke="rgba(100,180,210,0.30)"
        strokeWidth="1.8"
      />

      {/* ── Stringer ── */}
      <line
        x1="80" y1="22"
        x2="80" y2="404"
        stroke="rgba(50,130,170,0.18)"
        strokeWidth="1"
      />

      {/* ── Leash plug ── */}
      <circle cx="80" cy="362" r="4.5" fill="none" stroke="rgba(50,130,170,0.35)" strokeWidth="1.5" />
      <circle cx="80" cy="362" r="1.8" fill="rgba(50,130,170,0.35)" />

      {/* ── Fin ── */}
      <path
        d="M 62 401
           C 61 413 60 426 60 435
           C 60 441 62 446 80 446
           C 98 446 100 441 100 435
           C 100 426 99 413 98 401
           C 90 398 70 398 62 401 Z"
        fill="url(#fo-fin)"
        stroke="#2C7EA0"
        strokeWidth="1"
      />
      {/* Fin inner highlight */}
      <path
        d="M 70 403
           C 70 414 70 426 72 434
           C 74 440 77 444 80 445"
        fill="none"
        stroke="rgba(255,255,255,0.28)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function FamilyObjectPage() {
  return (
    <PageLayout
      accent="sky"
      chapterLabel="פרק 8 – סיפור דרך"
      title="חפץ משפחתי עם משמעות"
    >
      <div className={styles.wrapper}>
        <div className={styles.aura} aria-hidden="true" />

        <div className={styles.layout}>

          {/* Text column — first child → RIGHT side in RTL */}
          <div className={styles.textCol}>
            <p className={styles.para}>
              החפץ המשפחתי שבחרתי הוא{' '}
              <span className={styles.highlight}>גלשן</span>{' '}
              שהיה שייך לדוד שלי{' '}
              <span className={styles.highlight}>ניר</span>{' '}
              ז״ל.
            </p>

            <p className={styles.para}>
              הגלשן תמיד עמד בכניסה לבית, נשען על הקיר בשקט,
              כאילו הוא מחכה לגל הבא. בשביל המשפחה שלי הוא לא היה
              רק גלשן, אלא חפץ שמזכיר את ניר, את האהבה שלו לים,
              ל<span className={styles.highlight}>חופש</span>{' '}
              ולחיים.
            </p>

            <p className={styles.para}>
              הגלשן מסמל בעיניי{' '}
              <span className={styles.highlight}>אומץ</span>,
              תנועה וחיבור למשפחה. הוא מזכיר לנו שגם חפצים פשוטים
              יכולים לשמור בתוכם{' '}
              <span className={styles.highlight}>זיכרונות</span>{' '}
              וסיפורים של אנשים שאנחנו אוהבים.
            </p>

            <p className={`${styles.para} ${styles.paraClosing}`}>
              דרך הגלשן אני מבינה כמה חשוב לשמור דברים שמחברים אותנו
              לאנשים שהיו חלק מהמשפחה שלנו. הוא מזכיר לי את ניר ואת
              ה<span className={styles.highlight}>מקום שלו</span>{' '}
              בסיפור המשפחתי שלי.
            </p>
          </div>

          {/* Surfboard column — second child → LEFT side in RTL */}
          <div className={styles.boardCol}>
            <div className={styles.boardGlow} aria-hidden="true" />
            <SurfboardIllustration />
          </div>

        </div>
      </div>
    </PageLayout>
  );
}
