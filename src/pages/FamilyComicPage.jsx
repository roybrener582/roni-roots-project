import PageLayout from '../components/PageLayout';
import styles from './FamilyComicPage.module.css';

export default function FamilyComicPage() {
  return (
    <PageLayout
      accent="violet"
      chapterLabel="פרק 6 – המשפחה שלי"
      title="קומיקס – אז והיום"
      subtitle="עבר מול הווה"
    >
      <div className={styles.wrapper}>

        {/* Halftone dot texture */}
        <div className={styles.halftone} aria-hidden="true" />

        {/* Scattered comic decorations */}
        <span className={`${styles.deco} ${styles.decoA}`} aria-hidden="true">✦</span>
        <span className={`${styles.deco} ${styles.decoB}`} aria-hidden="true">★</span>
        <span className={`${styles.deco} ${styles.decoC}`} aria-hidden="true">✦</span>

        <div className={styles.stage}>

          {/* Speech bubble — "היום" perspective */}
          <div className={styles.bubble}>
            <span className={styles.bubbleTag}>היום</span>
            <p className={styles.bubbleText}>תראו כמה השתניתי! 😄</p>
          </div>

          {/* Comic panel — hero image */}
          <div className={styles.panelWrap}>
            <div className={styles.panel}>
              <img
                src="/mz.jpeg"
                alt="אז – תמונה מהעבר"
                className={styles.photo}
              />
            </div>

            {/* "אז" stamp overlapping panel corner */}
            <div className={styles.stampAz} aria-hidden="true">אז</div>
          </div>

          {/* Caption strip */}
          <div className={styles.caption}>
            <span className={styles.captionMark} aria-hidden="true">◆</span>
            <p className={styles.captionText}>כמה דברים השתנו... וכמה נשארו אותו דבר</p>
            <span className={styles.captionMark} aria-hidden="true">◆</span>
          </div>

        </div>
      </div>
    </PageLayout>
  );
}
