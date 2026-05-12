import { useState } from 'react';
import PageLayout from '../components/PageLayout';
import styles from './BelongingPage.module.css';

const PHOTO = '/shihot.png';

const RINGS = [
  {
    id: 'self',
    icon: '✨',
    title: 'אני',
    text: 'אני אוהבת לרקוד, להיפגש עם חברות,אני אמיצה, רגישה וחברה טובה.',
    size: 'lead',
    vars: { '--rc': '#c4728a', '--rc-faint': 'rgba(196,114,138,0.13)', '--rc-border': 'rgba(196,114,138,0.30)' },
  },
  {
    id: 'family',
    icon: '🫶',
    title: 'משפחתי',
    text: 'המסורת שלנו היא שכל סוף שנה אנחנו הולכים לאכול גלידה ביום האחרון ללימודים. אנחנו אוהבים יחד דברים כיפיים כמו לראות סרטים , לצאת לטיולים ולעשות הליכות משפחתיות.',
    size: 'lead',
    vars: { '--rc': '#c4954a', '--rc-faint': 'rgba(196,149,74,0.13)', '--rc-border': 'rgba(196,149,74,0.30)' },
  },
  {
    id: 'friends',
    icon: '🌸',
    title: 'החברים שלי',
    text: 'אצלנו בחבורה גם אם יש ריב אנחנו תמיד פותרות את זה עוד באותו היום ולא ממשיכות להתעסק בזה אחר כך.',
    size: 'lead',
    vars: { '--rc': '#9080c4', '--rc-faint': 'rgba(144,128,196,0.13)', '--rc-border': 'rgba(144,128,196,0.30)' },
  },
  {
    id: 'community',
    icon: '🌿',
    title: 'הקהילה בה אני חיה',
    text: 'אצלנו במושב יש מסורת שנקראת (סירי לידה), שבה בכל פעם שנולד תינוק/ת אנשים מהמושב מכינים ארוחות למשפחה במשך חודש, יש מסורת בסוכות להכין עפיפונים.',
    size: 'lead',
    vars: { '--rc': '#5a9e78', '--rc-faint': 'rgba(90,158,120,0.13)', '--rc-border': 'rgba(90,158,120,0.30)' },
  },
  {
    id: 'country',
    icon: '🕊️',
    title: 'המדינה שלי',
    text: 'המדינה שלי חשובה לי מאוד, כי כאן נולדתי וכאן אני מרגישה בבית.',
    size: 'lead',
    vars: { '--rc': '#5088b4', '--rc-faint': 'rgba(80,136,180,0.13)', '--rc-border': 'rgba(80,136,180,0.30)' },
  },
];

export default function BelongingPage() {
  const [imgError, setImgError] = useState(false);

  return (
    <PageLayout accent="forest" chapterLabel="פרק 1" title="מעגלי השייכות שלי">
      <div className={styles.layout}>

        {/* ── Rings stack (right column in RTL) ── */}
        <div className={styles.stack}>
          {RINGS.map((r, i) => (
            <div
              key={r.id}
              className={`${styles.ring} ${styles[r.size]}`}
              style={{ ...r.vars, animationDelay: `${0.15 + i * 0.10}s` }}
            >
              <div className={styles.badge} aria-hidden="true">{r.icon}</div>
              <div className={styles.body}>
                <h3 className={styles.heading}>{r.title}</h3>
                <p className={styles.text}>{r.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Photo (left column in RTL) ── */}
        <div className={styles.imageFrame}>
          {imgError ? (
            <div className={styles.placeholder} aria-label="תמונה חסרה">
              <span aria-hidden="true">📖</span>
            </div>
          ) : (
            <img
              className={styles.photo}
              src={PHOTO}
              alt="שיחות"
              onError={() => setImgError(true)}
            />
          )}
        </div>

      </div>
    </PageLayout>
  );
}
