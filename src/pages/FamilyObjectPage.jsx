import PageLayout from '../components/PageLayout';
import styles from './FamilyObjectPage.module.css';

function GuitarIllustration() {
  return (
    <svg
      viewBox="0 0 200 460"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.guitarSvg}
      aria-label="גיטרה אקוסטית"
      role="img"
    >
      <defs>
        <linearGradient id="fo-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#8B5020" />
          <stop offset="42%"  stopColor="#C47830" />
          <stop offset="100%" stopColor="#7A4018" />
        </linearGradient>
        <linearGradient id="fo-neck" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#4A2E10" />
          <stop offset="50%"  stopColor="#7A5030" />
          <stop offset="100%" stopColor="#3A2208" />
        </linearGradient>
        <radialGradient id="fo-sheen" cx="32%" cy="28%" r="52%">
          <stop offset="0%"   stopColor="rgba(255,225,145,0.22)" />
          <stop offset="100%" stopColor="rgba(255,200,80,0)"     />
        </radialGradient>
        <radialGradient id="fo-hole" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#100700" />
          <stop offset="100%" stopColor="#1C0D04" />
        </radialGradient>
        <filter id="fo-drop" x="-15%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="4" dy="6" stdDeviation="9" floodColor="rgba(50,25,5,0.22)" />
        </filter>
      </defs>

      {/* ── Ambient shadow ── */}
      <ellipse cx="103" cy="318" rx="68" ry="74" fill="rgba(35,15,3,0.09)" />

      {/* ── Body ── */}
      <path
        d="M 88 195
           C 92 192, 108 192, 112 195
           C 135 202, 148 225, 148 245
           C 148 265, 140 280, 137 295
           C 138 310, 160 335, 165 355
           C 164 380, 140 408, 100 415
           C 60 408, 36 380, 35 355
           C 40 335, 62 310, 63 295
           C 60 280, 52 265, 52 245
           C 52 225, 65 202, 88 195 Z"
        fill="url(#fo-body)"
        stroke="#6B3E1A"
        strokeWidth="1.5"
        filter="url(#fo-drop)"
      />

      {/* Light sheen */}
      <path
        d="M 88 195
           C 92 192, 108 192, 112 195
           C 135 202, 148 225, 148 245
           C 148 265, 140 280, 137 295
           C 138 310, 160 335, 165 355
           C 164 380, 140 408, 100 415
           C 60 408, 36 380, 35 355
           C 40 335, 62 310, 63 295
           C 60 280, 52 265, 52 245
           C 52 225, 65 202, 88 195 Z"
        fill="url(#fo-sheen)"
      />

      {/* Binding edge */}
      <path
        d="M 90 198
           C 93 195, 107 195, 110 198
           C 132 205, 145 227, 145 247
           C 145 266, 137 280, 134 294
           C 135 308, 157 333, 162 353
           C 161 377, 138 405, 100 412
           C 62 405, 39 377, 38 353
           C 43 333, 65 308, 66 294
           C 63 280, 55 266, 55 247
           C 55 227, 68 205, 90 198 Z"
        fill="none"
        stroke="rgba(210,178,98,0.48)"
        strokeWidth="2"
      />

      {/* ── Sound hole ── */}
      <circle cx="100" cy="325" r="29" fill="url(#fo-hole)" stroke="#280E02" strokeWidth="1.5" />
      <circle cx="100" cy="325" r="32"   fill="none" stroke="rgba(196,169,110,0.72)" strokeWidth="1.2" />
      <circle cx="100" cy="325" r="34.5" fill="none" stroke="rgba(196,169,110,0.33)" strokeWidth="0.7" />
      <circle cx="100" cy="325" r="25.5" fill="none" stroke="rgba(196,169,110,0.48)" strokeWidth="0.7" />
      <circle cx="100" cy="325" r="22.5" fill="none" stroke="rgba(196,169,110,0.28)" strokeWidth="0.5" />

      {/* ── Bridge ── */}
      <rect x="82" y="378" width="36" height="10" rx="3" fill="#4A2E10" stroke="#3A2208" strokeWidth="1" />
      <rect x="82" y="378" width="36" height="3"  rx="1.5" fill="#E0D8B8" />
      {[87, 91, 95, 100, 105, 109].map((x, i) => (
        <circle key={i} cx={x} cy="381" r="2.2" fill="#C4A96E" stroke="#8B6914" strokeWidth="0.8" />
      ))}

      {/* ── Neck heel ── */}
      <rect x="85" y="187" width="30" height="14" rx="3" fill="#6B4020" stroke="#3A2208" strokeWidth="1" />

      {/* ── Fretboard ── */}
      <rect x="88" y="62" width="24" height="128" rx="3" fill="url(#fo-neck)" stroke="#3A2208" strokeWidth="1" />

      {/* Nut */}
      <rect x="88" y="65" width="24" height="3" rx="1" fill="#E0D8B8" />

      {/* Frets */}
      {[83, 96, 108, 119, 129, 138, 146, 153, 159, 164].map((y) => (
        <line key={y} x1="88" y1={y} x2="112" y2={y}
          stroke="rgba(196,169,110,0.80)" strokeWidth="1.2" />
      ))}

      {/* Position markers (3rd, 5th, 7th fret dots) */}
      <circle cx="100" cy="102" r="2.4" fill="rgba(196,169,110,0.55)" />
      <circle cx="100" cy="124" r="2.4" fill="rgba(196,169,110,0.55)" />
      <circle cx="100" cy="142" r="2.4" fill="rgba(196,169,110,0.55)" />

      {/* ── Strings ── */}
      {[91, 94.6, 98.2, 101.8, 105.4, 109].map((x, i) => (
        <line key={i}
          x1={x} y1="67" x2={x} y2="378"
          stroke="rgba(215,205,168,0.72)"
          strokeWidth={0.65 + i * 0.11}
        />
      ))}

      {/* ── Headstock ── */}
      <path
        d="M 88 63
           C 85 52, 83 36, 83 16
           C 83 8, 86 4, 90 4
           L 110 4
           C 114 4, 117 8, 117 16
           C 117 36, 115 52, 112 63 Z"
        fill="#4A2E10"
        stroke="#3A2208"
        strokeWidth="1"
      />
      <ellipse cx="100" cy="33" rx="11" ry="19" fill="none" stroke="rgba(196,169,110,0.20)" strokeWidth="0.8" />

      {/* Tuning pegs — left */}
      {[17, 30, 44].map((y) => (
        <g key={y}>
          <line x1="84" y1={y} x2="67" y2={y} stroke="#9B7820" strokeWidth="2" strokeLinecap="round" />
          <circle cx="64" cy={y} r="6.5" fill="#C8AA54" stroke="#8B6914" strokeWidth="1.2" />
          <circle cx="64" cy={y} r="2.5" fill="#7A5810" />
        </g>
      ))}

      {/* Tuning pegs — right */}
      {[17, 30, 44].map((y) => (
        <g key={y}>
          <line x1="116" y1={y} x2="133" y2={y} stroke="#9B7820" strokeWidth="2" strokeLinecap="round" />
          <circle cx="136" cy={y} r="6.5" fill="#C8AA54" stroke="#8B6914" strokeWidth="1.2" />
          <circle cx="136" cy={y} r="2.5" fill="#7A5810" />
        </g>
      ))}
    </svg>
  );
}

export default function FamilyObjectPage() {
  return (
    <PageLayout
      accent="rose"
      chapterLabel="פרק 8 – סיפור דרך"
      title="חפץ משפחתי עם משמעות"
    >
      <div className={styles.wrapper}>
        <div className={styles.aura} aria-hidden="true" />

        <div className={styles.layout}>

          {/* Text column — first child → RIGHT side in RTL */}
          <div className={styles.textCol}>
            <p className={styles.para}>
              ה<span className={styles.highlight}>גיטרה</span>{' '}
              הייתה שייכת לדוד שלי ז״ל.
            </p>

            <p className={styles.para}>
              כשהוא היה קטן הוא אהב מאוד לנגן
              ב<span className={styles.highlight}>גיטרה</span>,
              וגם כשהתבגר המוזיקה המשיכה להיות חלק ממנו.
            </p>

            <p className={styles.para}>
              אחרי שהוא נרצח, סבא וסבתא שלי
              שמרו את הגיטרה שלו עד היום.
            </p>

            <p className={`${styles.para} ${styles.paraClosing}`}>
              הגיטרה מזכירה לנו שאפשר לשמור חפצים
              שמחזיקים בתוכם{' '}
              <span className={styles.highlight}>זיכרונות</span>,
              אנשים ו
              <span className={styles.highlight}>סיפורים מהעבר</span>.
            </p>
          </div>

          {/* Guitar column — second child → LEFT side in RTL */}
          <div className={styles.guitarCol}>
            <div className={styles.guitarGlow} aria-hidden="true" />
            <GuitarIllustration />
          </div>

        </div>
      </div>
    </PageLayout>
  );
}
