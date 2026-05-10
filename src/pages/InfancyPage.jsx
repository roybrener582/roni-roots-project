import PageLayout from '../components/PageLayout';
import styles from './InfancyPage.module.css';

const MEMORIES = [
  {
    id: 'birth',
    icon: '👶',
    label: 'הלידה',
    text: 'שמי רוני, ונולדתי ב־20 בספטמבר 2013',
    vars: {
      '--mc-bg':     'rgba(255,210,190,0.38)',
      '--mc-border': 'rgba(240,150,110,0.35)',
      '--mc-dot':    '#e88a60',
    },
  },
  {
    id: 'zodiac',
    icon: '⭐',
    label: 'המזל שלי',
    text: 'נולדתי תחת מזל בתולה',
    vars: {
      '--mc-bg':     'rgba(220,210,250,0.35)',
      '--mc-border': 'rgba(160,140,210,0.35)',
      '--mc-dot':    '#9080c8',
    },
  },
  {
    id: 'word',
    icon: '💬',
    label: 'המילה הראשונה',
    text: 'המילה הראשונה שיצאה מפי הייתה: "אבא"',
    vars: {
      '--mc-bg':     'rgba(200,235,220,0.38)',
      '--mc-border': 'rgba(120,180,155,0.35)',
      '--mc-dot':    '#5aaa88',
    },
  },
  {
    id: 'walk',
    icon: '👣',
    label: 'הצעדים הראשונים',
    text: 'בגיל שנה וחודש לקחתי את צעדיי הראשונים',
    vars: {
      '--mc-bg':     'rgba(255,240,190,0.38)',
      '--mc-border': 'rgba(210,175,80,0.35)',
      '--mc-dot':    '#d4aa40',
    },
  },
  {
    id: 'laugh',
    icon: '😂',
    label: 'הצחוק',
    text: 'הייתי מצחיקה את אחי — והיינו צוחקים יחד המון',
    vars: {
      '--mc-bg':     'rgba(255,210,225,0.38)',
      '--mc-border': 'rgba(220,130,155,0.35)',
      '--mc-dot':    '#d87095',
    },
  },
];

export default function InfancyPage() {
  return (
    <PageLayout
      accent="rose"
      chapterLabel="פרק 4"
      title="תחילת הדרך – הינקות"
      subtitle="זיכרונות מתוקים מההתחלה"
    >
      <div className={styles.timeline}>
        {MEMORIES.map((m, i) => (
          <div
            key={m.id}
            className={styles.item}
            style={{ ...m.vars, animationDelay: `${0.15 + i * 0.12}s` }}
          >
            <div className={styles.dot} aria-hidden="true" />
            <div className={styles.card}>
              <span className={styles.icon} aria-hidden="true">{m.icon}</span>
              <div className={styles.body}>
                <span className={styles.label}>{m.label}</span>
                <p className={styles.text}>{m.text}</p>
              </div>
            </div>
          </div>
        ))}

        <p className={styles.closing} aria-hidden="true">✨ ✨ ✨</p>
      </div>
    </PageLayout>
  );
}
