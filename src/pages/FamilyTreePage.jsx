import { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import styles from './FamilyTreePage.module.css';

// ── Photo file mapping ─────────────────────────────────────────
// Update a value here to swap a photo (all files live in /public/)
const PHOTOS = {
  roni:    '/roni.png',
  amit:    '/amit.png',
  roy:     '/roy.png',
  einat:   '/einat.png',
  sagai:   '/sagi.png',
  yaara:   '/yaara.png',
  yael:    '/yeal.png',
  asaf:    '/asaf.png',
  mimi:    '/mimi.png',
  nir:     '/nir.png',
  ori:     '/ori.png',
  nati:    '/nati.png',
  silvi:   '/silvi.jpeg',
  eli:     '/eli.png',
  ora:     '/ora.png',
  moshe:   '/mosha.png',
  pnina:   '/pnina.png',
  reuven:  '/roven.png',
  pola:    '/pola.png',
  natan:   '/natan.png',
  aster:   '/aster.png',
  menashe: '/yosef.png',
  luti:    '/luti.png',
};

// cx / cy = center of each photo circle in SVG viewBox coords (0-1000 × 0-900)
const PEOPLE = [
  // ── Generation 4 – דורות קדומים ────────────────────────────
  { id:'moshe',   name:'משה',      last:'ברנר',               year:'1930', country:'לטביה',   flag:'🇱🇻', cx: 65,  cy:130, size:'sm' },
  { id:'pnina',   name:'פנינה',    last:'ברנר',               year:'1935', country:'בולגריה', flag:'🇧🇬', cx:155,  cy:108, size:'sm' },
  { id:'reuven',  name:'ראובן',    last:'רומנג',              year:'1930', country:'ארגנטינה',flag:'🇦🇷', cx:265,  cy: 98, size:'sm' },
  { id:'pola',    name:'פולה',     last:'רומנג',              year:'1941', country:'ארגנטינה',flag:'🇦🇷', cx:375,  cy:108, size:'sm' },
  { id:'natan',   name:'נתן',      last:'הוניגספלד',          year:'1920', country:'פולין',   flag:'🇵🇱', cx:625,  cy:108, size:'sm' },
  { id:'aster',   name:'אסתר',     last:'צוקרמן הוניגספלד',  year:'1920', country:'פולין',   flag:'🇵🇱', cx:735,  cy: 98, size:'sm' },
  { id:'menashe', name:'מנשה',     last:'יוסף',               year:'1919', country:'רומניה',  flag:'🇷🇴', cx:845,  cy:108, size:'sm' },
  { id:'luti',    name:'לוטי',     last:'יוסף',               year:'1921', country:'רומניה',  flag:'🇷🇴', cx:935,  cy:130, size:'sm' },

  // ── Generation 3 – סבים וסבתות ─────────────────────────────
  { id:'nati',  name:'נתי',    last:'ברנר', year:'1955', country:'ישראל', flag:'🇮🇱', cx:220, cy:318, size:'md' },
  { id:'silvi', name:'סילביה', last:'רומנג ברנר', year:'1961', country:'ארגנטינה', flag:'🇦🇷', cx:315, cy:308, size:'md' },
  { id:'eli',   name:'אלי',    last:'רגב',        year:'1948', country:'קפריסין',  flag:'🇨🇾', cx:685, cy:308, size:'md' },
  { id:'ora',   name:'אורה',   last:'רגב',  year:'1952', country:'ישראל', flag:'🇮🇱', cx:780, cy:318, size:'md' },

  // ── Generation 2 – הורים ואחים ─────────────────────────────
  { id:'sagai', name:'שגיא',    last:'ברנר',       year:'1984', country:'ישראל', flag:'🇮🇱', cx: 78, cy:462, size:'sm' },
  { id:'yael',  name:'יעל',     last:'בן אפריים',  year:'',     country:'ישראל', flag:'🇮🇱', cx:148, cy:478, size:'sm' },
  { id:'yaara', name:'יערה',    last:'בן סיניור',  year:'1987', country:'ישראל', flag:'🇮🇱', cx:228, cy:450, size:'sm' },
  { id:'ori',   name:'אורי',    last:'בן סיניור',  year:'',     country:'צרפת',  flag:'🇫🇷', cx:300, cy:466, size:'sm' },
  { id:'roy',   name:'רועי',    last:'ברנר',       year:'1983', country:'ישראל', flag:'🇮🇱', cx:440, cy:610, size:'lg', isParent:true },
  { id:'einat', name:'עינת',    last:'ברנר',       year:'1984', country:'ישראל', flag:'🇮🇱', cx:560, cy:610, size:'lg', isParent:true },
  { id:'asaf',  name:'אסף',     last:'רגב',        year:'1974', country:'ישראל', flag:'🇮🇱', cx:618, cy:440, size:'sm' },
  { id:'mimi',  name:'מימי',    last:'רגב',        year:'',     country:'ישראל', flag:'🇮🇱', cx:680, cy:458, size:'sm' },
  { id:'nir',   name:'ניר ז"ל', last:'רגב',        year:'1978', country:'ישראל', flag:'🇮🇱', cx:792, cy:453, size:'sm' },
  { id:'ola',   name:'אולה',    last:'',           year:'',     country:'',      flag:'',    cx:858, cy:470, size:'sm' },

  // ── Generation 1 – הדור שלי ─────────────────────────────────
  { id:'roni', name:'רוני', last:'ברנר', year:'2013', country:'ישראל', flag:'🇮🇱', cx:430, cy:790, size:'xl', isMe:true },
  { id:'amit', name:'עמית', last:'ברנר', year:'2015', country:'ישראל', flag:'🇮🇱', cx:570, cy:790, size:'lg' },
];

const SIZE_PX = { xl:90, lg:76, md:64, sm:52 };
const BROWN   = '#7B4A1E';
const BROWN_L = '#9B6030';

// ── SVG background tree ────────────────────────────────────────
function TreeSvg() {
  return (
    <svg
      className={styles.treeSvg}
      viewBox="0 0 1000 900"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="leafg" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#7fc43a" stopOpacity="0.82"/>
          <stop offset="65%"  stopColor="#4e8c1c" stopOpacity="0.62"/>
          <stop offset="100%" stopColor="#2d5c0a" stopOpacity="0.18"/>
        </radialGradient>
      </defs>

      {/* Leaf canopy */}
      <ellipse cx="105" cy="108" rx="90"  ry="70"  fill="url(#leafg)"/>
      <ellipse cx="228" cy=" 80" rx="80"  ry="62"  fill="url(#leafg)"/>
      <ellipse cx="338" cy=" 70" rx="74"  ry="58"  fill="url(#leafg)"/>
      <ellipse cx="440" cy=" 63" rx="68"  ry="52"  fill="url(#leafg)"/>
      <ellipse cx="500" cy=" 56" rx="76"  ry="55"  fill="url(#leafg)" opacity="0.7"/>
      <ellipse cx="560" cy=" 63" rx="68"  ry="52"  fill="url(#leafg)"/>
      <ellipse cx="662" cy=" 70" rx="74"  ry="58"  fill="url(#leafg)"/>
      <ellipse cx="772" cy=" 80" rx="80"  ry="62"  fill="url(#leafg)"/>
      <ellipse cx="895" cy="108" rx="90"  ry="70"  fill="url(#leafg)"/>
      <ellipse cx=" 55" cy="168" rx="55"  ry="42"  fill="url(#leafg)" opacity="0.55"/>
      <ellipse cx="945" cy="168" rx="55"  ry="42"  fill="url(#leafg)" opacity="0.55"/>
      <ellipse cx="188" cy=" 55" rx="40"  ry="30"  fill="url(#leafg)" opacity="0.55"/>
      <ellipse cx="812" cy=" 55" rx="40"  ry="30"  fill="url(#leafg)" opacity="0.55"/>

      {/* Roots */}
      <path d="M 500 893 C 462 906,425 900,406 912" stroke={BROWN} strokeWidth="7" fill="none" strokeLinecap="round"/>
      <path d="M 500 893 C 538 906,575 900,594 912" stroke={BROWN} strokeWidth="7" fill="none" strokeLinecap="round"/>
      <path d="M 482 898 C 452 918,416 912,398 920" stroke={BROWN} strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M 518 898 C 548 918,584 912,602 920" stroke={BROWN} strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M 467 902 C 440 924,402 918,384 926" stroke={BROWN} strokeWidth="3" fill="none" strokeLinecap="round"/>

      {/* Main trunk */}
      <path
        d="M 500 896 C 497 862,503 828,500 798 C 498 768,502 742,500 715 C 498 688,502 665,500 648"
        stroke={BROWN} strokeWidth="32" fill="none" strokeLinecap="round"
      />

      {/* Trunk → Roy */}
      <path d="M 497 662 C 478 648,462 630,440 612" stroke={BROWN} strokeWidth="14" fill="none" strokeLinecap="round"/>
      {/* Trunk → Einat */}
      <path d="M 503 662 C 522 648,538 630,560 612" stroke={BROWN} strokeWidth="14" fill="none" strokeLinecap="round"/>

      {/* Left main branch → Nati/Silvia */}
      <path d="M 500 650 C 450 618,378 542,268 316" stroke={BROWN} strokeWidth="22" fill="none" strokeLinecap="round"/>
      {/* Right main branch → Eli/Ora */}
      <path d="M 500 650 C 550 618,622 542,732 316" stroke={BROWN} strokeWidth="22" fill="none" strokeLinecap="round"/>

      {/* Side branches – siblings */}
      <path d="M 368 504 C 282 490,186 476, 78 462" stroke={BROWN_L} strokeWidth="9"  fill="none" strokeLinecap="round"/>
      <path d="M  96 468 C 114 471,130 475,148 478" stroke={BROWN_L} strokeWidth="6"  fill="none" strokeLinecap="round"/>
      <path d="M 338 492 C 302 476,270 462,228 450" stroke={BROWN_L} strokeWidth="8"  fill="none" strokeLinecap="round"/>
      <path d="M 264 458 C 278 461,290 464,300 466" stroke={BROWN_L} strokeWidth="6"  fill="none" strokeLinecap="round"/>
      <path d="M 572 477 C 590 465,604 453,618 440" stroke={BROWN_L} strokeWidth="8"  fill="none" strokeLinecap="round"/>
      <path d="M 640 450 C 655 452,667 455,680 458" stroke={BROWN_L} strokeWidth="6"  fill="none" strokeLinecap="round"/>
      <path d="M 648 493 C 706 479,748 467,792 453" stroke={BROWN_L} strokeWidth="8"  fill="none" strokeLinecap="round"/>
      <path d="M 806 460 C 828 463,842 467,858 470" stroke={BROWN_L} strokeWidth="6"  fill="none" strokeLinecap="round"/>

      {/* Left sub-branches G3 → G4 */}
      <path d="M 268 316 C 218 250,140 190, 65 130" stroke={BROWN} strokeWidth="14" fill="none" strokeLinecap="round"/>
      <path d="M 268 316 C 248 250,208 182,155 108" stroke={BROWN} strokeWidth="12" fill="none" strokeLinecap="round"/>
      <path d="M 268 316 C 266 250,264 188,265  98" stroke={BROWN} strokeWidth="12" fill="none" strokeLinecap="round"/>
      <path d="M 268 316 C 290 250,328 185,375 108" stroke={BROWN} strokeWidth="11" fill="none" strokeLinecap="round"/>

      {/* Right sub-branches G3 → G4 */}
      <path d="M 732 316 C 712 250,672 185,625 108" stroke={BROWN} strokeWidth="11" fill="none" strokeLinecap="round"/>
      <path d="M 732 316 C 734 250,736 188,735  98" stroke={BROWN} strokeWidth="12" fill="none" strokeLinecap="round"/>
      <path d="M 732 316 C 752 250,792 182,845 108" stroke={BROWN} strokeWidth="12" fill="none" strokeLinecap="round"/>
      <path d="M 732 316 C 782 250,860 190,935 130" stroke={BROWN} strokeWidth="14" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

// ── Lightbox ───────────────────────────────────────────────────
function Lightbox({ src, name, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className={styles.lbBackdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.lbBox} onClick={e => e.stopPropagation()}>
        <img src={src} alt={name} className={styles.lbImg} />
        <p className={styles.lbName}>{name}</p>
        <button className={styles.lbClose} onClick={onClose} aria-label="סגור">✕</button>
      </div>
    </div>
  );
}

// ── Person node ────────────────────────────────────────────────
function PersonNode({ p, onPhotoClick }) {
  const photo = PHOTOS[p.id];
  const sz    = SIZE_PX[p.size];
  const leftPct = (p.cx / 1000) * 100;
  const topPct  = ((p.cy - sz / 2) / 900) * 100;

  return (
    <div
      className={[
        styles.node,
        styles[`s${p.size}`],
        p.isMe     ? styles.nodeMe     : '',
        p.isParent ? styles.nodeParent : '',
      ].filter(Boolean).join(' ')}
      style={{ left: `${leftPct}%`, top: `${topPct}%` }}
    >
      <div
        className={styles.ring}
        style={{ width: sz, height: sz }}
        onClick={() => photo && onPhotoClick(photo, p.name)}
        role={photo ? 'button' : undefined}
        tabIndex={photo ? 0 : undefined}
        onKeyDown={e => e.key === 'Enter' && photo && onPhotoClick(photo, p.name)}
      >
        {photo
          ? <img src={photo} alt={p.name} className={styles.photo}/>
          : <span className={styles.initials}>{p.name[0]}</span>
        }
      </div>
      <div className={styles.label}>
        <span className={styles.lName}>{p.name}</span>
        <span className={styles.lLast}>{p.last}</span>
        {p.year    && <span className={styles.lYear}>{p.year}</span>}
        {p.country && <span className={styles.lCountry}>{p.flag} {p.country}</span>}
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────
export default function FamilyTreePage() {
  const [lightbox, setLightbox] = useState(null); // { src, name }

  return (
    <PageLayout
      accent="forest"
      variant="compact"
      chapterLabel="פרק ז – עץ השורשים שלי"
      title="עץ המשפחה שלי"
    >
      <div className={styles.wrap}>
        <TreeSvg />
        {PEOPLE.map(p => (
          <PersonNode
            key={p.id}
            p={p}
            onPhotoClick={(src, name) => setLightbox({ src, name })}
          />
        ))}
      </div>
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          name={lightbox.name}
          onClose={() => setLightbox(null)}
        />
      )}
    </PageLayout>
  );
}
