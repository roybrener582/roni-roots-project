import PageLayout from '../components/PageLayout';
import styles from './FamilyNamePersonalInsightPage.module.css';

export default function FamilyNamePersonalInsightPage() {
  return (
    <PageLayout
      accent="mint"
      chapterLabel="פרק 5 – שם המשפחה שלי"
      title="תובנה אישית"
    >
      <div className={styles.wrapper}>

        {/* Soft mint aura */}
        <div className={styles.aura} aria-hidden="true" />

        {/* Floating icons */}
        <span className={styles.iconFire}  aria-hidden="true">🔥</span>
        <span className={styles.iconBook}  aria-hidden="true">📖</span>

        {/* Main insight */}
        <div className={styles.textBlock}>
          <p className={styles.insight}>
            למדתי שפירושו של שם המשפחה שלי הוא{' '}
            <span className={styles.fireWord}>שורף</span>,
            <br />
            ושהוא מגיע משפות כמו{' '}
            <span className={styles.langWord}>יידיש</span>{' '}
            או{' '}
            <span className={styles.langWord}>גרמנית</span>.
          </p>
        </div>

      </div>
    </PageLayout>
  );
}
