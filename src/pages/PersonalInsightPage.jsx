import PageLayout from '../components/PageLayout';
import styles from './PersonalInsightPage.module.css';

function AIIllustration() {
  return (
    <svg
      viewBox="0 0 280 310"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.svgIllustration}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="pi-bg" cx="50%" cy="55%" r="50%">
          <stop offset="0%"   stopColor="#e8d5ff" stopOpacity="0.72"/>
          <stop offset="52%"  stopColor="#c5e8ff" stopOpacity="0.48"/>
          <stop offset="100%" stopColor="#fce4f5" stopOpacity="0.10"/>
        </radialGradient>
        <radialGradient id="pi-screen" cx="50%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#b8e4ff"/>
          <stop offset="100%" stopColor="#6040a8"/>
        </radialGradient>
        <radialGradient id="pi-bulb-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#ffe060" stopOpacity="0.40"/>
          <stop offset="100%" stopColor="#ffe060" stopOpacity="0"/>
        </radialGradient>
        <filter id="pi-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="pi-screen-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* ── Ambient background aura ── */}
      <ellipse cx="140" cy="162" rx="126" ry="132" fill="url(#pi-bg)"/>

      {/* ── Floating decorative elements ── */}

      {/* Lightbulb — top-left */}
      <g transform="translate(18, 36)">
        <ellipse cx="20" cy="18" rx="28" ry="28" fill="url(#pi-bulb-glow)"/>
        <path
          d="M20 4 C10 4 3 11 3 20 C3 27 7.5 32 13 34 L13 39 L27 39 L27 34 C32.5 32 37 27 37 20 C37 11 30 4 20 4Z"
          fill="#fff8c0" stroke="#e8c028" strokeWidth="1.5"
        />
        <rect x="13" y="39" width="14" height="5" rx="2.5" fill="#d4b028" stroke="#c0a018" strokeWidth="1"/>
        <rect x="14" y="44" width="12" height="4" rx="2" fill="#d4b028"/>
        <ellipse cx="14" cy="16" rx="4" ry="6" fill="white" opacity="0.45"/>
      </g>

      {/* Chat bubble — top-right */}
      <g transform="translate(186, 36)">
        <rect x="0" y="0" width="62" height="38" rx="12" fill="#cce8ff" stroke="#60aacc" strokeWidth="1.5"/>
        <path d="M10 38 L22 38 L16 52" fill="#cce8ff" stroke="#60aacc" strokeWidth="1.5" strokeLinejoin="round"/>
        <rect x="10" y="12" width="38" height="4.5" rx="2.2" fill="#5aaacc" opacity="0.6"/>
        <rect x="10" y="21" width="26" height="4" rx="2" fill="#5aaacc" opacity="0.45"/>
      </g>

      {/* 4-point sparkle — left */}
      <path
        d="M66 36 L68.5 44.5 L77 47 L68.5 49.5 L66 58 L63.5 49.5 L55 47 L63.5 44.5 Z"
        fill="#c8a0e8" opacity="0.85"
      />

      {/* Small sparkle — top-center */}
      <path
        d="M148 24 L149.8 30.2 L156 32 L149.8 33.8 L148 40 L146.2 33.8 L140 32 L146.2 30.2 Z"
        fill="#80c8f0" opacity="0.72"
      />

      {/* Brain + AI badge — right side */}
      <g transform="translate(200, 150)">
        <ellipse cx="28" cy="24" rx="34" ry="28" fill="#c8a0ff" opacity="0.14"/>
        <path
          d="M8 24 C8 13 16 6 28 8 C40 6 48 13 48 24 C48 35 40 44 28 46 C16 44 8 35 8 24Z"
          fill="#ead5ff" stroke="#9a68d4" strokeWidth="1.5"
        />
        {/* centre divider */}
        <path d="M28 8 L28 46" stroke="#9a68d4" strokeWidth="1" fill="none" opacity="0.35"/>
        {/* fold line */}
        <path
          d="M8 22 Q16 16 21 23 Q26 30 28 23 Q30 16 35 23 Q40 30 48 22"
          stroke="#9a68d4" strokeWidth="1.2" fill="none" strokeLinecap="round"
        />
        <text
          x="15" y="30"
          fontFamily="Arial, sans-serif" fontSize="11"
          fill="#8050c0" fontWeight="bold" opacity="0.9"
        >AI</text>
      </g>

      {/* Small star — right-middle */}
      <path
        d="M224 115 L225.8 121 L232 122.8 L225.8 124.6 L224 130.6 L222.2 124.6 L216 122.8 L222.2 121 Z"
        fill="#f0a8c8" opacity="0.68"
      />

      {/* Dot accents scattered */}
      <circle cx="90"  cy="44"  r="3"   fill="#d8a8f8" opacity="0.62"/>
      <circle cx="184" cy="88"  r="2"   fill="#80c8f0" opacity="0.55"/>
      <circle cx="38"  cy="155" r="2.5" fill="#f0c8e8" opacity="0.60"/>
      <circle cx="248" cy="205" r="2.5" fill="#a0d8a8" opacity="0.55"/>
      <circle cx="52"  cy="255" r="1.8" fill="#d8a8f8" opacity="0.50"/>
      <circle cx="242" cy="258" r="1.5" fill="#80c8f0" opacity="0.48"/>

      {/* ── Girl figure — drawing order: legs → arms → torso → laptop → neck → head ── */}

      {/* Legs */}
      <path d="M116 260 Q100 274 84 280" stroke="#f4c2a0" strokeWidth="12" strokeLinecap="round" fill="none"/>
      <path d="M164 260 Q180 274 196 280" stroke="#f4c2a0" strokeWidth="12" strokeLinecap="round" fill="none"/>
      {/* Shoes */}
      <ellipse cx="82"  cy="281" rx="14" ry="7.5" fill="#8068c8" opacity="0.88"/>
      <ellipse cx="198" cy="281" rx="14" ry="7.5" fill="#8068c8" opacity="0.88"/>

      {/* Arms (drawn before torso so torso shoulder covers attachment; before laptop so laptop overlaps wrists) */}
      <path d="M111 188 Q86 218 80 266" stroke="#f4c2a0" strokeWidth="10" strokeLinecap="round" fill="none"/>
      <path d="M169 188 Q194 218 200 266" stroke="#f4c2a0" strokeWidth="10" strokeLinecap="round" fill="none"/>

      {/* Torso */}
      <path d="M109 168 Q107 232 115 262 L165 262 Q173 232 171 168Z" fill="#d888c8"/>
      {/* shirt dot pattern */}
      <circle cx="136" cy="200" r="2.5" fill="#efb0e0" opacity="0.65"/>
      <circle cx="148" cy="214" r="2"   fill="#efb0e0" opacity="0.58"/>
      <circle cx="140" cy="230" r="2"   fill="#efb0e0" opacity="0.52"/>

      {/* Laptop — sits in lap, covers lower arms */}
      <g transform="translate(74, 224)">
        {/* Body */}
        <rect x="0" y="0" width="132" height="68" rx="7" fill="#48406c"/>
        {/* Screen bg */}
        <rect x="5" y="5" width="122" height="56" rx="5" fill="#1a1238"/>
        {/* Screen glow fill */}
        <rect x="5" y="5" width="122" height="56" rx="5" fill="url(#pi-screen)" opacity="0.82"/>
        {/* Interface lines */}
        <rect x="13" y="13" width="70"  height="4.5" rx="2.2" fill="#b8e4ff" opacity="0.88"/>
        <rect x="13" y="22" width="45"  height="3.5" rx="1.7" fill="#a0d8b0" opacity="0.70"/>
        <rect x="13" y="30" width="85"  height="3.5" rx="1.7" fill="#b8e4ff" opacity="0.62"/>
        <rect x="13" y="38" width="58"  height="3.5" rx="1.7" fill="#e0c8ff" opacity="0.60"/>
        <rect x="13" y="46" width="32"  height="3.5" rx="1.7" fill="#b8e4ff" opacity="0.50"/>
        {/* Cursor blink */}
        <rect x="46" y="46" width="3"   height="8"   rx="1.5" fill="#80d4ff" opacity="1"/>
        {/* Keyboard strip */}
        <rect x="5"  y="59" width="122" height="3"   rx="1.5" fill="#5a509a" opacity="0.48"/>
        {/* Base / palmrest */}
        <rect x="0"  y="65" width="132" height="10"  rx="5"   fill="#585090"/>
        {/* Trackpad */}
        <rect x="46" y="69" width="40"  height="8"   rx="4"   fill="#6860a8" opacity="0.70"/>
        {/* Screen ambient glow */}
        <ellipse cx="66" cy="35" rx="62" ry="28" fill="#60a8ff" opacity="0.07" filter="url(#pi-screen-glow)"/>
      </g>

      {/* Ambient glow from screen onto lap */}
      <ellipse cx="140" cy="244" rx="68" ry="10" fill="#80c0ff" opacity="0.11"/>

      {/* Neck */}
      <rect x="133" y="150" width="14" height="21" rx="7" fill="#f4c2a0"/>

      {/* ── Head ── */}

      {/* Hair — back volume */}
      <ellipse cx="140" cy="126" rx="38" ry="40" fill="#281a38"/>
      {/* Hair — flowing sides */}
      <path d="M104 120 Q92 156 97 188"  stroke="#281a38" strokeWidth="16" strokeLinecap="round" fill="none"/>
      <path d="M176 120 Q188 156 183 188" stroke="#281a38" strokeWidth="16" strokeLinecap="round" fill="none"/>

      {/* Face skin */}
      <ellipse cx="140" cy="131" rx="29" ry="32" fill="#f4c2a0"/>

      {/* Hair highlights */}
      <path
        d="M108 108 Q130 88 162 94 Q172 98 175 112"
        stroke="#7038b0" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.52"
      />
      <path
        d="M116 102 Q136 94 156 100"
        stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.22"
      />

      {/* Eyes */}
      <ellipse cx="130" cy="127" rx="5.5" ry="6.2" fill="white"/>
      <ellipse cx="150" cy="127" rx="5.5" ry="6.2" fill="white"/>
      <circle  cx="130" cy="128" r="4.2" fill="#281a38"/>
      <circle  cx="150" cy="128" r="4.2" fill="#281a38"/>
      {/* Iris shine */}
      <circle cx="131.6" cy="126" r="1.6" fill="white" opacity="0.92"/>
      <circle cx="151.6" cy="126" r="1.6" fill="white" opacity="0.92"/>

      {/* Eyebrows */}
      <path d="M123 118 Q130 115 137 117" stroke="#281a38" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <path d="M143 117 Q150 115 157 118" stroke="#281a38" strokeWidth="2.2" strokeLinecap="round" fill="none"/>

      {/* Smile */}
      <path d="M132 145 Q140 152 148 145" stroke="#c07878" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

      {/* Blush */}
      <ellipse cx="119" cy="139" rx="9"  ry="5.5" fill="#f4a0a0" opacity="0.28"/>
      <ellipse cx="161" cy="139" rx="9"  ry="5.5" fill="#f4a0a0" opacity="0.28"/>

      {/* Tiny stars near head — final sparkle layer */}
      <path
        d="M85 92 L86.5 97 L92 98.5 L86.5 100 L85 105 L83.5 100 L78 98.5 L83.5 97 Z"
        fill="#f0b8e0" opacity="0.60"
      />
      <circle cx="192" cy="95" r="2.8" fill="#c8a0ff" opacity="0.55"/>
    </svg>
  );
}

export default function PersonalInsightPage() {
  return (
    <PageLayout accent="sky" chapterLabel="פרק 1" title="תובנה אישית">
      <div className={styles.layout}>

        {/* ── Quote column (RTL column-1 → physical right, the reading side) ── */}
        <div className={styles.quoteCol}>
          <div className={styles.quoteBox}>
            <span className={styles.quoteMark} aria-hidden="true">❝</span>

            <p className={styles.quoteText}>
              הדבר החשוב שלמדתי הוא שאני יודעת לעבוד עם{' '}
              <span className={styles.aiHighlight}>AI</span>.
            </p>

            <span className={styles.quoteMarkClose} aria-hidden="true">❞</span>
          </div>
        </div>

        {/* ── Illustration column (RTL column-2 → physical left) ── */}
        <div className={styles.illustrationCol}>
          <AIIllustration />
        </div>

      </div>
    </PageLayout>
  );
}
