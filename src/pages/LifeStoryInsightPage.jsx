import PageLayout from '../components/PageLayout';
import styles from './LifeStoryInsightPage.module.css';

export default function LifeStoryInsightPage() {
  return (
    <PageLayout accent="rose" chapterLabel="פרק 4 – מגילת החיים שלי" title="תובנה אישית">
      <div className={styles.wrapper}>

        {/* Soft organic aura */}
        <div className={styles.aura} aria-hidden="true" />

        {/* Floating decorative icons */}
        <span className={styles.iconThought} aria-hidden="true">💭</span>
        <span className={styles.iconBaby}    aria-hidden="true">👶</span>
        <span className={styles.iconHeart}   aria-hidden="true">💛</span>

        {/* Main text block */}
        <div className={styles.textBlock}>
          <p className={styles.reflection}>
            למדתי על עצמי ש
            <span className={styles.keyWord}>השתניתי</span>
            {' '}בהרבה דברים,
            <br />
            <span className={styles.keyWord}>וגיליתי</span>
            {' '}גם דברים שלא ידעתי על הילדות שלי.
          </p>

          {/* The "אבא" discovery — a quiet, warm moment */}
          <div className={styles.abaSection}>
            <p className={styles.abaText}>
              למשל, לא ידעתי שהמילה הראשונה שאמרתי הייתה{' '}
              <span className={styles.abaWord}>אבא</span>.
            </p>
          </div>
        </div>

      </div>
    </PageLayout>
  );
}
