import PageLayout from '../components/PageLayout';
import styles from './ThiyaRevivalPage.module.css';

const FlowArrow = () => (
  <svg width="36" height="16" viewBox="0 0 36 16" fill="none" aria-hidden="true">
    <line x1="34" y1="8" x2="2" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M10 2L2 8L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function ThiyaRevivalPage() {
  return (
    <PageLayout
      accent="rose"
      chapterLabel="פרק 6 – המשפחה שלי"
      title="העבר קם לתחייה"
      subtitle="זיכרון ישן שקיבל חיים מחדש"
    >
      <div className={styles.wrapper}>
        <div className={styles.aura} aria-hidden="true" />

        <div className={styles.stage}>

          {/* ── Row 1: Step labels ───────────────────────────── */}
          <div className={styles.labelsRow}>
            <div className={styles.labelSlot}>
              <span className={`${styles.stepBadge} ${styles.stepBadgeBefore}`}>1</span>
              <span className={`${styles.label} ${styles.labelBefore}`}>לפני</span>
            </div>
            <div className={styles.arrowSpacer} />
            <div className={styles.labelSlot}>
              <span className={`${styles.stepBadge} ${styles.stepBadgeAfter}`}>2</span>
              <span className={`${styles.label} ${styles.labelAfter}`}>אחרי</span>
            </div>
            <div className={styles.arrowSpacer} />
            <div className={styles.labelSlot}>
              <span className={`${styles.stepBadge} ${styles.stepBadgeLife}`}>3</span>
              <span className={`${styles.label} ${styles.labelLife}`}>לחיים</span>
            </div>
          </div>

          {/* ── Row 2: Media + arrows ────────────────────────── */}
          <div className={styles.mediaRow}>

            {/* Card 1: לפני */}
            <div className={`${styles.card} ${styles.cardBefore}`}>
              <div className={styles.frame}>
                <img
                  src="/thiya1.jpeg"
                  alt="תמונה מקורית"
                  className={`${styles.media} ${styles.imgBefore}`}
                />
              </div>
            </div>

            {/* Arrow 1 */}
            <div className={styles.arrow}>
              <FlowArrow />
            </div>

            {/* Card 2: אחרי */}
            <div className={`${styles.card} ${styles.cardAfter}`}>
              <div className={styles.frame}>
                <img
                  src="/thiya2.jpeg"
                  alt="תמונה ערוכה ומשוחזרת"
                  className={styles.media}
                />
              </div>
            </div>

            {/* Arrow 2 */}
            <div className={styles.arrow}>
              <FlowArrow />
            </div>

            {/* Card 3: לחיים */}
            <div className={`${styles.card} ${styles.cardLife}`}>
              <div className={`${styles.frame} ${styles.frameLife}`}>
                <video
                  src="/thiya3.mp4"
                  controls
                  playsInline
                  className={`${styles.media} ${styles.videoMedia}`}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </PageLayout>
  );
}
