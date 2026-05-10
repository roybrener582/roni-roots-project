import PageLayout from '../components/PageLayout';
import styles from './CommunityContributionPage.module.css';

export default function CommunityContributionPage() {
  return (
    <PageLayout
      accent="forest"
      variant="compact"
      chapterLabel="פרק 9 – התרומה שלי לקהילה"
      title="התרומה שלי לקהילה"
    >
      <div className={styles.wrapper}>
        <div className={styles.aura} aria-hidden="true" />

        {/* Ambient floating icons */}
        <span className={styles.iconHeart}  aria-hidden="true">💛</span>
        <span className={styles.iconHands}  aria-hidden="true">🤝</span>
        <span className={styles.iconStar}   aria-hidden="true">🌟</span>

        <div className={styles.content}>

          {/* ── Illustration block ─────────────────────────── */}
          <div className={styles.illustrationBlock} aria-hidden="true">
            <div className={styles.illustrationIcons}>
              <span>🏡</span>
              <span>🤝</span>
              <span>💛</span>
            </div>
            <p className={styles.illustrationCaption}>לעזור לאחרים — זה הדבר הכי יפה שאפשר לעשות</p>
          </div>

          {/* ── Q1 ─────────────────────────────────────────── */}
          <div className={styles.qaCard}>
            <span className={styles.qLabel}>האם אני תורמת כיום לקהילה שלי בדרך כלשהי?</span>
            <p className={styles.answer}>
              כן, אני תורמת לקהילה שלי ברגבה.
              אני עוזרת <strong className={styles.keyword}>באירועים של המושב</strong>{' '}
              וגם עוזרת לפעמים <strong className={styles.keyword}>בגנים</strong>.
            </p>
          </div>

          <div className={styles.rule} aria-hidden="true" />

          {/* ── Q2 ─────────────────────────────────────────── */}
          <div className={styles.qaCard}>
            <span className={styles.qLabel}>למי אני יכולה לעזור בסביבה הקרובה שלי?</span>
            <p className={styles.answer}>
              אני יכולה לעזור לחברים שלי וגם לאנשים מבוגרים שצריכים עזרה.
            </p>
          </div>

          <div className={styles.rule} aria-hidden="true" />

          {/* ── Q3 ─────────────────────────────────────────── */}
          <div className={styles.qaCard}>
            <span className={styles.qLabel}>איך אני חושבת שארגיש כשאעזור לאחרים?</span>
            <p className={styles.answer}>
              אני חושבת שארגיש <strong className={styles.keyword}>טוב ושמחה</strong>,
              {' '}כי כיף לעזור לאחרים ולדעת שעשיתי משהו טוב.
            </p>
          </div>

          <div className={styles.rule} aria-hidden="true" />

          {/* ── Q4 ─────────────────────────────────────────── */}
          <div className={styles.qaCard}>
            <span className={styles.qLabel}>באילו דרכים הייתי רוצה לתרום יותר בעתיד?</span>
            <p className={`${styles.answer} ${styles.answerClosing}`}>
              בעתיד הייתי רוצה <strong className={styles.keyword}>להתנדב יותר בקהילה</strong>{' '}
              ולעזור כמה שאפשר.
            </p>
          </div>

        </div>
      </div>
    </PageLayout>
  );
}
