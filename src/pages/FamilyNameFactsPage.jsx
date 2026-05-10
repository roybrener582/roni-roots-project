import PageLayout from '../components/PageLayout';
import styles from './FamilyNameFactsPage.module.css';

const FACTS = [
  {
    key: 'surname',
    icon: '✨',
    hero: true,
    before: 'שם המשפחה שלי הוא "',
    accent: 'ברנר',
    after: '"',
  },
  {
    key: 'origin',
    icon: '👨‍👩‍👧',
    text: 'שם המשפחה שלי מגיע מצד אבא',
  },
  {
    key: 'history',
    icon: '📜',
    before: 'שם המשפחה שלי תמיד היה ',
    accent: 'ברנר',
    after: ', ואף פעם לא שינו אותו',
  },
];

export default function FamilyNameFactsPage() {
  return (
    <PageLayout accent="forest" chapterLabel="פרק 5" title="עובדות על שם המשפחה שלי">
      <div className={styles.column}>
        {FACTS.map((fact) => (
          <div
            key={fact.key}
            className={`${styles.block} ${fact.hero ? styles.heroBlock : ''}`}
          >
            <span className={styles.icon} aria-hidden="true">{fact.icon}</span>
            <p className={`${styles.sentence} ${fact.hero ? styles.heroSentence : ''}`}>
              {fact.text ?? (
                <>
                  {fact.before}
                  <strong className={styles.highlight}>{fact.accent}</strong>
                  {fact.after}
                </>
              )}
            </p>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
