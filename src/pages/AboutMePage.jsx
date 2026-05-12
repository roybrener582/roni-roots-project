import PageLayout from '../components/PageLayout';
import styles from './AboutMePage.module.css';

const INTRO =
  'נעים להכיר, אני רוני, תלמידה בכיתה ז׳. הזהות שלי מורכבת מכמה מעגלים שמשלימים זה את זה.';

const SECTIONS = [
  {
    id: 'courage',
    icon: '🦋',
    label: 'אומץ',
    text: 'גם מול התחלות חדשות וחששות, אני תמיד בוחרת לנסות ולהתמודד.',
    vars: {
      '--sc': '#c49a4a',
      '--sc-faint': 'rgba(196,154,74,0.13)',
      '--sc-border': 'rgba(196,154,74,0.32)',
    },
  },
  {
    id: 'sensitivity',
    icon: '🌸',
    label: 'רגישות',
    text: 'אני רגישה מאוד לסביבה שלי, ומושפעת ממצבים מלחיצים או משמחים באותה מידה.',
    vars: {
      '--sc': '#9080c4',
      '--sc-faint': 'rgba(144,128,196,0.13)',
      '--sc-border': 'rgba(144,128,196,0.32)',
    },
  },
  {
    id: 'friendship',
    icon: '🌻',
    label: 'חברות',
    text: 'אני אוהבת מאוד לרקוד ולהיפגש עם החברות ,אנחנו חבורה מגובשת שהולכת יחד עוד מהגן.',
    vars: {
      '--sc': '#c4728a',
      '--sc-faint': 'rgba(196,114,138,0.13)',
      '--sc-border': 'rgba(196,114,138,0.32)',
    },
  },
  {
    id: 'family',
    icon: '🫶',
    label: 'משפחה',
    text: 'מהמשפחה שלי ספגתי את ערך הנתינה והתרומה לאחר מבלי לצפות לתמורה.',
    vars: {
      '--sc': '#c4954a',
      '--sc-faint': 'rgba(196,149,74,0.13)',
      '--sc-border': 'rgba(196,149,74,0.32)',
    },
  },
  {
    id: 'community',
    icon: '🌿',
    label: 'קהילה',
    text: 'במושב שלי יש קהילה מדהימה שמתגייסת לעזור בכל מצב : מארוחות למשפחות אחרי לידה, במלחמה, וכאשר מגיעות משפחות חדשות למשוב.',
    vars: {
      '--sc': '#5a9e78',
      '--sc-faint': 'rgba(90,158,120,0.13)',
      '--sc-border': 'rgba(90,158,120,0.32)',
    },
  },
  {
    id: 'country',
    icon: '🕊️',
    label: 'מדינה',
    text: 'המדינה שלי היא המקום הכי חשוב לי בעולם, אני גאה להיות ישראלית, לטייל בארץ, ולחגוג את החגים שלנו.',
    vars: {
      '--sc': '#5088b4',
      '--sc-faint': 'rgba(80,136,180,0.13)',
      '--sc-border': 'rgba(80,136,180,0.32)',
    },
  },
];

export default function AboutMePage() {
  return (
    <PageLayout accent="rose" chapterLabel="פרק 1" title="קצת על עצמי">
      <div className={styles.wrapper}>

        {/* ── Intro quote ── */}
        <p className={styles.intro}>
          <span className={styles.introMark} aria-hidden="true">❝</span>
          {INTRO}
        </p>

        {/* ── Value grid ── */}
        <div className={styles.grid}>
          {SECTIONS.map((s, i) => (
            <div
              key={s.id}
              className={styles.card}
              style={{ ...s.vars, animationDelay: `${0.12 + i * 0.08}s` }}
            >
              <div className={styles.cardTop}>
                <span className={styles.icon} aria-hidden="true">{s.icon}</span>
                <span className={styles.label}>{s.label}</span>
              </div>
              <p className={styles.text}>{s.text}</p>
            </div>
          ))}
        </div>

      </div>
    </PageLayout>
  );
}
