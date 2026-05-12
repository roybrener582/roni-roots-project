import PageLayout from '../components/PageLayout';
import styles from './NameFactsPage.module.css';

const FACTS = [
  {
    key: 'name',
    icon: '✨',
    label: 'השם שלי',
    answer: 'רוני ברנר',
    hero: true,
  },
  {
    key: 'who',
    icon: '👨‍👩‍👧',
    label: 'מי בחר את השם',
    answer: 'אמא ואבא בחרו יחד',
  },
  {
    key: 'why',
    icon: '💬',
    label: 'למה דווקא רוני?',
    answer: 'כי זה שם קצר, חזק, ועם אופי — מתאים לשני המינים ונשמע טוב בעברית ובאנגלית.',
  },
  {
    key: 'namesake',
    icon: '🌸',
    label: 'על שם מישהו?',
    answer: 'על שם דוד שלי ניר שנרצח בפיגוע.',
  },
  {
    key: 'nickname',
    icon: '💛',
    label: 'כינוי',
    answer: 'רונצ׳ו',
    note: 'ההורים שלי קוראים לי ככה',
    nickname: true,
  },
];

export default function NameFactsPage() {
  return (
    <PageLayout accent="rose" chapterLabel="פרק 2" title="עובדות על השם שלי">
      <div className={styles.column}>
        {FACTS.map((fact, idx) => (
          <div
            key={fact.key}
            className={`${styles.row} ${fact.hero ? styles.heroRow : ''} ${fact.nickname ? styles.nicknameRow : ''} ${idx === FACTS.length - 1 ? styles.lastRow : ''}`}
          >
            <div className={styles.rowMeta}>
              <span className={styles.icon} aria-hidden="true">{fact.icon}</span>
              <span className={styles.label}>{fact.label}</span>
            </div>
            <p className={`${styles.answer} ${fact.hero ? styles.heroAnswer : ''} ${fact.nickname ? styles.nicknameAnswer : ''}`}>
              {fact.answer}
            </p>
            {fact.note && (
              <p className={styles.note}>{fact.note}</p>
            )}
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
