import PageLayout from '../components/PageLayout';
import styles from './FamilyNameStoryPage.module.css';

export default function FamilyNameStoryPage() {
  return (
    <PageLayout
      accent="rose"
      chapterLabel="פרק 5 – שם המשפחה שלי"
      title="הסיפור מאחורי השם"
    >
      <div className={styles.wrapper}>

        {/* Soft pastel aura — warmth without decoration */}
        <div className={styles.aura} aria-hidden="true" />

        {/* Corner icons — present but unobtrusive */}
        <span className={styles.iconThought} aria-hidden="true">💭</span>
        <span className={styles.iconHeart}   aria-hidden="true">🤍</span>

        <div className={styles.textBlock}>

          <p className={styles.para}>
            <span className={styles.emphasis}>אין לי סיפור מיוחד</span>
            {' '}שקשור לשם המשפחה שלי.
          </p>

          <p className={styles.para}>
            אני גם{' '}
            <span className={styles.emphasis}>לא מרגישה צורך</span>
            {' '}שאנשים יכירו את המשפחה שלי דרך שם המשפחה.
          </p>

        </div>
      </div>
    </PageLayout>
  );
}
