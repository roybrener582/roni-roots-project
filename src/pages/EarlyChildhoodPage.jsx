import PageLayout from '../components/PageLayout';
import styles from './EarlyChildhoodPage.module.css';

const GARDENS = ['פצפונים', 'חצב', 'רגבים', 'חרצית קטנים', 'חרצית גדולים'];

export default function EarlyChildhoodPage() {
  return (
    <PageLayout
      accent="mint"
      variant="compact"
      chapterLabel="פרק 4"
      title="הגיל הרך – הגן"
    >
      <div className={styles.wrapper}>

        {/* Floating decorative icons */}
        <span className={styles.floatFlower} aria-hidden="true">🌻</span>
        <span className={styles.floatBalloon} aria-hidden="true">🎈</span>

        {/* ── Row 1: Kindergartens + Book ── */}
        <div className={styles.topRow}>

          {/* Block 1: Kindergartens */}
          <div className={`${styles.block} ${styles.blockGardens}`}>
            <div className={styles.blockHead}>
              <span className={styles.blockIcon} aria-hidden="true">🏫</span>
              <span className={styles.blockLabel}>הגנים שלי</span>
            </div>
            <div className={styles.gardenTags}>
              {GARDENS.map((name, i) => (
                <span key={name} className={styles.gardenGroup}>
                  <span className={styles.gardenTag}>{name}</span>
                  {i < GARDENS.length - 1 && (
                    <span className={styles.gardenSep} aria-hidden="true">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Block 2: Beloved book */}
          <div className={`${styles.block} ${styles.blockBook}`}>
            <div className={styles.blockHead}>
              <span className={styles.blockIcon} aria-hidden="true">📖</span>
              <span className={styles.blockLabel}>הספר שאהבתי</span>
            </div>
            <p className={styles.bookName}>חנן הגנן</p>
            <p className={styles.blockBody}>הספר הכי אהוב עליי מהילדות</p>
          </div>

        </div>

        {/* ── Block 3: Vacations ── */}
        <div className={`${styles.block} ${styles.blockVacations}`}>
          <div className={styles.blockHead}>
            <span className={styles.blockIcon} aria-hidden="true">✈️</span>
            <span className={styles.blockLabel}>חופשות ילדות</span>
          </div>
          <p className={styles.blockBody}>
            ביליתי חופשות גם בחו"ל וגם בארץ —
            {' '}במיוחד ב<strong>כינרת</strong> וב<strong>רמת הגולן</strong>
            {'  🌊'}
          </p>
        </div>

        {/* ── Block 4: Funny memory — special treatment ── */}
        <div className={styles.blockFunny}>
          <div className={styles.funnyBadge}>😄 הזיכרון הכי מצחיק</div>
          <p className={styles.funnyText}>
            בזמן הקורונה עשיתי בדיקה,
            {' '}וכשהוציאו את המקל מהאף...
          </p>
          <p className={`${styles.funnyText} ${styles.funnyPunchline}`}>
            קרה משהו מצחיק שגרם לכולם לצחוק — <em>כולל אותי!</em>
            {'  😄'}
          </p>
        </div>

      </div>
    </PageLayout>
  );
}
