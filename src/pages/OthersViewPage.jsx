import PageLayout from '../components/PageLayout';
import styles from './OthersViewPage.module.css';

export default function OthersViewPage() {
  return (
    <PageLayout
      accent="rose"
      chapterLabel="פרק 3 — אני בעיני אחרים"
      title="איך אחרים רואים אותי"
    >
      <div className={styles.wrapper}>

        <p className={styles.sourceLabel}>הורי בחרו בתכונה:</p>

        <div className={styles.badge}>
          <span className={styles.badgeIcon} aria-hidden="true">👭</span>
          <span className={styles.traitWord}>חברותית</span>
          <span className={styles.badgeIcon} aria-hidden="true">💛</span>
        </div>

        <div className={styles.rule} aria-hidden="true" />

        <div className={styles.reflection}>
          <p className={styles.paragraph}>
            לא הפתיע אותי שהם אמרו שאני חברותית,{' '}
            כי אני יודעת שאני חברה טובה והם בהחלט צדקו.
          </p>
          <p className={styles.paragraph}>
            אני לא רואה את עצמי אחרת ממה שהם אמרו,{' '}
            כי אני בטוחה שאני חברה טובה.
          </p>
        </div>

      </div>
    </PageLayout>
  );
}
