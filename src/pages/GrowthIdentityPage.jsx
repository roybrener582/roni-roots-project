import PageLayout from '../components/PageLayout';
import styles from './GrowthIdentityPage.module.css';

const SECTIONS = [
  {
    id: 'identity',
    icon: '✨',
    title: 'איך אני רואה את עצמי היום',
    text: 'אני מגדירה את עצמי כילדה חברותית ויפה שאוהבת לעשות הרבה דברים.',
    vars: {
      '--sc-bg':     'rgba(195,178,238,0.18)',
      '--sc-border': 'rgba(155,133,212,0.35)',
      '--sc-accent': '#9b85d4',
    },
  },
  {
    id: 'feelings',
    icon: '🌙',
    title: 'הרגשות שלי בתקופה הזאת',
    text: 'בתקופה הזאת מלווה אותי פחד בגלל המלחמה.',
    vars: {
      '--sc-bg':     'rgba(168,195,228,0.15)',
      '--sc-border': 'rgba(118,158,200,0.28)',
      '--sc-accent': '#7a9ec8',
    },
  },
  {
    id: 'thoughts',
    icon: '💭',
    title: 'מחשבות',
    text: 'כרגע אין מחשבות שמעסיקות אותי במיוחד.',
    vars: {
      '--sc-bg':     'rgba(225,215,195,0.18)',
      '--sc-border': 'rgba(185,165,130,0.28)',
      '--sc-accent': '#b8a070',
    },
  },
  {
    id: 'responsibility',
    icon: '✔️',
    title: 'אחריות',
    text: 'האחריות שלי גדלה, אני מסדרת את החדר, זוכרת דברים חשובים, ועוזרת גם לאח שלי.',
    vars: {
      '--sc-bg':     'rgba(175,215,198,0.18)',
      '--sc-border': 'rgba(108,168,148,0.30)',
      '--sc-accent': '#6ea894',
    },
  },
  {
    id: 'change',
    icon: '🌱',
    title: 'שינוי',
    text: 'בשנים האחרונות השתניתי מאוד אני יותר אחראית, מסודרת ונקייה.',
    vars: {
      '--sc-bg':     'rgba(188,225,200,0.18)',
      '--sc-border': 'rgba(118,178,145,0.30)',
      '--sc-accent': '#76b290',
    },
  },
];

export default function GrowthIdentityPage() {
  return (
    <PageLayout
      accent="violet"
      chapterLabel="פרק 4 – מגילת החיים שלי"
      title="אני היום"
      subtitle="התבגרות וזהות"
    >
      <div className={styles.sections}>
        {SECTIONS.map((s, i) => (
          <article
            key={s.id}
            className={styles.card}
            style={{ ...s.vars, animationDelay: `${0.12 + i * 0.10}s` }}
          >
            <div className={styles.cardHead}>
              <span className={styles.cardIcon} aria-hidden="true">{s.icon}</span>
              <h2 className={styles.cardTitle}>{s.title}</h2>
            </div>
            <p className={styles.cardText}>{s.text}</p>
          </article>
        ))}
      </div>
    </PageLayout>
  );
}
