import PageLayout from '../components/PageLayout';
import styles from './NameMeaningPage.module.css';

export default function NameMeaningPage() {
  return (
    <PageLayout accent="rose" chapterLabel="פרק 2" title="משמעות שמי כפי שאני מבינה אותה">
      <div className={styles.canvas}>

        {/* Background decorative blobs */}
        <span className={styles.blob1} aria-hidden="true" />
        <span className={styles.blob2} aria-hidden="true" />

        <div className={styles.reflections}>

          {/* ── Paragraph 1 ── */}
          <div className={styles.block}>
            <span className={styles.deco} aria-hidden="true">✨</span>
            <p className={styles.para}>
              אני מרגישה שהשם שלי קשור לאופי שלי,
              כי אני בדרך כלל אדם{' '}
              <span className={styles.highlight}>שמח</span>.
            </p>
          </div>

          {/* ── Separator ── */}
          <div className={styles.sep} aria-hidden="true">
            <span />
            <span className={styles.sepHeart}>💛</span>
            <span />
          </div>

          {/* ── Paragraph 2 ── */}
          <div className={styles.block}>
            <span className={styles.deco} aria-hidden="true">✨</span>
            <p className={styles.para}>
              השם שלי מעורר בי תחושה של{' '}
              <span className={styles.highlight}>שמחה</span>{' '}
              ו<span className={styles.highlight}>התלהבות</span>.
            </p>
          </div>

          {/* ── Separator ── */}
          <div className={styles.sep} aria-hidden="true">
            <span />
            <span className={styles.sepHeart}>💛</span>
            <span />
          </div>

          {/* ── Paragraph 3 ── */}
          <div className={styles.block}>
            <span className={styles.deco} aria-hidden="true">✨</span>
            <p className={styles.para}>
              לא הייתי רוצה לשנות את השם שלי,
              כי אני חושבת שהוא שם{' '}
              <span className={styles.highlight}>יפה</span>{' '}
              ומתאים לי.
            </p>
          </div>

        </div>
      </div>
    </PageLayout>
  );
}
