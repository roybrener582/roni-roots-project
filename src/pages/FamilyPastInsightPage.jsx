import PageLayout from '../components/PageLayout';
import styles from './FamilyPastInsightPage.module.css';

export default function FamilyPastInsightPage() {
  return (
    <PageLayout
      accent="rose"
      chapterLabel="פרק 6 – המשפחה שלי"
      title="תובנה אישית"
    >
      <div className={styles.wrapper}>

        <div className={styles.aura} aria-hidden="true" />

        <span className={styles.iconClock} aria-hidden="true">🕰️</span>
        <span className={styles.iconBook}  aria-hidden="true">📖</span>

        <div className={styles.textBlock}>
          <p className={styles.reflection}>
            למדתי על הדברים שהיו עושים{' '}
            <span className={styles.pastWord}>פעם</span>,
            <br />
            ועל איך החיים שלהם נראו ב<span className={styles.pastWord}>עבר</span>.
          </p>
        </div>

      </div>
    </PageLayout>
  );
}
