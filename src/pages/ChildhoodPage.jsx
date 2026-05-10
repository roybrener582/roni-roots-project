import PageLayout from '../components/PageLayout';
import styles from './ChildhoodPage.module.css';

const SECTIONS = [
  {
    id: 'home',
    icon: '🎭',
    label: 'מהבית',
    text: 'הלכנו להצגות ולהופעות – ותמיד היה ממש כיף!',
    vars: {
      '--cc-bg':     'rgba(255,215,185,0.60)',
      '--cc-border': 'rgba(230,130,65,0.42)',
      '--cc-accent': '#c46028',
      '--cc-tilt':   '-1.8deg',
    },
  },
  {
    id: 'school',
    icon: '🏫',
    label: 'בית ספר',
    text: 'בכיתה א׳, כשעשינו חיסונים, שמנו שירים וצחקנו אחת על השנייה.',
    vars: {
      '--cc-bg':     'rgba(185,222,255,0.60)',
      '--cc-border': 'rgba(80,155,215,0.42)',
      '--cc-accent': '#2882b8',
      '--cc-tilt':   '1.6deg',
    },
  },
  {
    id: 'friends',
    icon: '👭',
    label: 'חברות',
    text: 'תמיד היה לי כיף עם חברות!',
    vars: {
      '--cc-bg':     'rgba(255,192,218,0.60)',
      '--cc-border': 'rgba(210,95,148,0.42)',
      '--cc-accent': '#bc4572',
      '--cc-tilt':   '-1.3deg',
    },
  },
  {
    id: 'hobbies',
    icon: '🤸',
    label: 'תחביבים',
    text: 'אהבתי לרקוד ולהתאמן בהתעמלות קרקע – אלה היו החוגים שלי.',
    vars: {
      '--cc-bg':     'rgba(212,192,255,0.60)',
      '--cc-border': 'rgba(138,98,225,0.42)',
      '--cc-accent': '#7040b5',
      '--cc-tilt':   '2.0deg',
    },
  },
  {
    id: 'leisure',
    icon: '📺',
    label: 'שעות פנאי',
    text: 'שיחקתי עם המשפחה וצפיתי ביוטיוב במחשב.',
    vars: {
      '--cc-bg':     'rgba(185,248,218,0.60)',
      '--cc-border': 'rgba(68,185,128,0.42)',
      '--cc-accent': '#259c62',
      '--cc-tilt':   '-0.9deg',
    },
  },
];

export default function ChildhoodPage() {
  return (
    <PageLayout
      accent="violet"
      chapterLabel="פרק 4"
      title="גיל הילדות"
      subtitle="זיכרונות מלאים בכיף ואנרגיה"
    >
      <div className={styles.grid}>
        {SECTIONS.map((s, i) => (
          <div
            key={s.id}
            className={`${styles.wrapper}${i === 4 ? ` ${styles.wrapperFull}` : ''}`}
            style={{ animationDelay: `${0.12 + i * 0.10}s` }}
          >
            <div className={styles.card} style={s.vars}>
              <span className={styles.icon} aria-hidden="true">{s.icon}</span>
              <h3 className={styles.label}>{s.label}</h3>
              <p className={styles.text}>{s.text}</p>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
