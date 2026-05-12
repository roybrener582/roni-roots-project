import PageLayout from '../components/PageLayout';
import styles from './BatMitzvahPage.module.css';

export default function BatMitzvahPage() {
  return (
    <PageLayout
      accent="rose"
      chapterLabel="פרק 10 – בת מצווה בין אישי ללאומי"
      title="בת מצווה – בין אישי ללאומי"
    >
      <div className={styles.wrapper}>

        <div className={styles.aura} aria-hidden="true" />

        <span className={styles.iconParty}  aria-hidden="true">🎉</span>
        <span className={styles.iconHeart}  aria-hidden="true">💛</span>
        <span className={styles.iconGlobe}  aria-hidden="true">🌍</span>

        <div className={styles.flow}>

          {/* ── Section 1 ── */}
          <div className={styles.section}>
            <span className={styles.sectionLabel}>איך חגגתי את בת המצווה שלי?</span>
            <p className={styles.para}>
              חגגתי את בת המצווה שלי במסיבה עם{' '}
              <span className={styles.keyWord}>כל הכיתה שלי,</span>{' '}
              והיה לי מאוד כיף. בנוסף, טסתי{' '}
              <span className={styles.keyWord}>ללונדון עם אמא שלי,</span>{' '}
              וזה היה זמן מיוחד רק שלנו שחיכיתי לו מאוד.
            </p>
          </div>

          <div className={styles.rule} aria-hidden="true" />

          {/* ── Section 2 ── */}
          <div className={styles.section}>
            <span className={styles.sectionLabel}>איזה ערכים ומסר קיבלתי מהטקס הזה?</span>
            <p className={styles.para}>
              מהבת מצווה הבנתי שאני כבר{' '}
              <span className={styles.keyWord}>גדלה וצריכה לוקחת יותר אחריות</span>{' '}
              על עצמי. זה גם לימד אותי{' '}
              <span className={styles.keyWord}>להעריך את המשפחה והחברים שלי,</span>{' '}
              כי הם חלק חשוב מהחיים שלי.
            </p>
          </div>

          <div className={styles.rule} aria-hidden="true" />

          {/* ── Section 3 ── */}
          <div className={`${styles.section} ${styles.sectionClosing}`}>
            <span className={styles.sectionLabel}>
              איך החגיגה קשורה לתחושת שייכות ולערכים שאני לוקחת איתי?
            </span>
            <p className={`${styles.para} ${styles.paraClosing}`}>
              החגיגה גרמה לי להרגיש{' '}
              <span className={styles.keyWord}>שייכת למשפחה ולחברים שלי,</span>{' '}
              ושיש לי אנשים שתומכים בי ואוהבים אותי. אני רוצה לקחת איתי את
              הערכים של{' '}
              <span className={styles.keyWord}>כבוד, אחריות וחברות טובה</span>{' '}
              להמשך החיים.
            </p>
          </div>

        </div>
      </div>
    </PageLayout>
  );
}
