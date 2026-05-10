import PageLayout from '../components/PageLayout';
import styles from './CommunityPersonalInsightPage.module.css';

export default function CommunityPersonalInsightPage() {
  return (
    <PageLayout
      accent="forest"
      chapterLabel="פרק 9 – הקהילה שלי"
      title="תובנה אישית"
    >
      <div className={styles.canvas}>
        <span className={styles.glow} aria-hidden="true" />

        <div className={styles.card}>
          <span className={styles.icon} aria-hidden="true">🌱</span>

          <p className={styles.para}>
            הדבר המשמעותי ביותר שלמדתי על קהילה הוא שקהילה זה לא רק מקום, אלא האנשים והקשר ביניהם.
            מהביקורים שעשינו הבנתי שגם אחרי דברים קשים, אנשים יכולים להתחבר, לעזור אחד לשני
            ולבנות קהילה חזקה. זה גרם לי להבין כמה חשוב להיות חלק מקהילה ולתרום לה,
            אפילו בדברים קטנים.
          </p>

          <div className={styles.rule} aria-hidden="true" />
        </div>
      </div>
    </PageLayout>
  );
}
