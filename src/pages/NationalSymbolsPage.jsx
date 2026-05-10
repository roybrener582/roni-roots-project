import PageLayout from '../components/PageLayout';
import styles from './NationalSymbolsPage.module.css';

export default function NationalSymbolsPage() {
  return (
    <PageLayout
      accent="sky"
      variant="compact"
      chapterLabel="פרק 10 – סמלים לאומיים"
      title="סמלים לאומיים – הדגל וההמנון"
    >
      <div className={styles.wrapper}>

        <div className={styles.aura} aria-hidden="true" />

        {/* Ambient floating icons */}
        <span className={styles.iconMusic} aria-hidden="true">🎵</span>
        <span className={styles.iconFlag}  aria-hidden="true">🇮🇱</span>
        <span className={styles.iconStar}  aria-hidden="true">✨</span>

        <div className={styles.flow}>

          {/* ── Illustration block ─────────────────────────── */}
          <div className={styles.illustrationBlock} aria-hidden="true">
            <div className={styles.illustrationIcons}>
              <span>🎵</span>
              <span>🇮🇱</span>
            </div>
            <p className={styles.illustrationCaption}>סמלים שמספרים את הסיפור שלנו</p>
          </div>

          {/* ══ Section: ההמנון ══════════════════════════════ */}
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIcon} aria-hidden="true">🎵</span>
            <span className={styles.sectionTitle}>ההמנון – "התקווה"</span>
          </div>

          {/* Q1 — anthem meaning */}
          <div className={styles.qaCard}>
            <span className={styles.qLabel}>מה ההמנון מסמל בעיניי?</span>
            <p className={styles.answer}>
              בעיניי, ההמנון מסמל את{' '}
              <strong className={styles.keyword}>התקווה של העם היהודי</strong>{' '}
              לחזור לארץ ישראל ולהיות חופשי בה. הוא מספר על הרצון להיות שייכים
              למקום שלנו ועל החלום שהתגשם.
            </p>
          </div>

          <div className={styles.rule} aria-hidden="true" />

          {/* Q2 — anthem feeling */}
          <div className={styles.qaCard}>
            <span className={styles.qLabel}>מה אני מרגישה כשאני שומעת אותו?</span>
            <p className={styles.answer}>
              כשאני שומעת את ההמנון אני מרגישה{' '}
              <strong className={styles.keyword}>גאווה ושייכות</strong>.
              לפעמים זה גם מרגש אותי, במיוחד בטקסים או באירועים חשובים.
            </p>
          </div>

          {/* ── Section divider ────────────────────────────── */}
          <div className={styles.sectionDivider} aria-hidden="true" />

          {/* ══ Section: הדגל ════════════════════════════════ */}
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIcon} aria-hidden="true">🇮🇱</span>
            <span className={styles.sectionTitle}>הדגל</span>
          </div>

          {/* Q3 — flag meaning */}
          <div className={styles.qaCard}>
            <span className={styles.qLabel}>מה הדגל מסמל בעיניי?</span>
            <p className={styles.answer}>
              בעיניי, הדגל מסמל את{' '}
              <strong className={styles.keyword}>העם שלנו ואת המדינה שלנו</strong>.
              המגן דוד והצבעים הכחול והלבן מזכירים את ההיסטוריה והמסורת שלנו.
            </p>
          </div>

          <div className={styles.rule} aria-hidden="true" />

          {/* Q4 — flag feeling */}
          <div className={styles.qaCard}>
            <span className={styles.qLabel}>מה אני מרגישה כשאני רואה אותו?</span>
            <p className={styles.answer}>
              כשאני רואה את הדגל אני מרגישה{' '}
              <strong className={styles.keyword}>גאווה ושמחה</strong>{' '}
              שאני חלק מהמדינה הזאת.
            </p>
          </div>

          <div className={styles.rule} aria-hidden="true" />

          {/* Q5 — design a new flag (creative) */}
          <div className={`${styles.qaCard} ${styles.creativeCard}`}>
            <span className={styles.qLabel}>אם הייתי מעצבת דגל חדש למדינה, איך הוא היה נראה?</span>
            <p className={`${styles.answer} ${styles.answerClosing}`}>
              הייתי שומרת על הצבעים{' '}
              <strong className={styles.keyword}>כחול ולבן</strong>,
              אבל מוסיפה משהו שמסמל{' '}
              <strong className={styles.keyword}>אחדות בין אנשים</strong>,
              כמו לב או ידיים שמתחברות. הייתי רוצה שהדגל יראה גם את
              החיבור בין כל האנשים במדינה.
            </p>
          </div>

        </div>
      </div>
    </PageLayout>
  );
}
