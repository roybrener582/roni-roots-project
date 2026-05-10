import PageLayout from '../components/PageLayout';
import styles from './WhoIsMyFamilyPage.module.css';

export default function WhoIsMyFamilyPage() {
  return (
    <PageLayout
      accent="rose"
      chapterLabel="פרק 6 – המשפחה שלי"
      title="מי היא המשפחה בשבילי"
    >
      <div className={styles.wrapper}>

        {/* Soft aura */}
        <div className={styles.aura} aria-hidden="true" />

        {/* Ambient floating icons */}
        <span className={styles.iconFamily}  aria-hidden="true">💛</span>
        <span className={styles.iconMom}     aria-hidden="true">🌸</span>
        <span className={styles.iconGrowth}  aria-hidden="true">🌱</span>

        <div className={styles.flow}>

          {/* ── Section 1: מה אני אוהבת במשפחה ─────────── */}
          <div className={styles.section}>
            <span className={styles.sectionLabel}>מה אני אוהבת במשפחה</span>
            <p className={styles.para}>
              אני אוהבת במשפחה שלי{' '}
              <span className={styles.warmWord}>את הערבים שלנו ביחד.</span>
            </p>
          </div>

          <div className={styles.rule} aria-hidden="true" />

          {/* ── Section 2: מה מאתגר אותי ──────────────── */}
          <div className={styles.section}>
            <span className={styles.sectionLabel}>מה מאתגר אותי</span>
            <p className={styles.para}>
              אחד הדברים שמאתגרים אותי במשפחה
              <br />
              זה שההורים שלי{' '}
              <span className={styles.softWord}>גרושים.</span>
            </p>
          </div>

          <div className={styles.rule} aria-hidden="true" />

          {/* ── Section 3: אמא שלי ────────────────────── */}
          <div className={styles.section}>
            <span className={styles.sectionLabel}>אמא שלי 🌸</span>
            <p className={styles.para}>
              אמא שלי בשבילי היא{' '}
              <span className={styles.warmWord}>אשת הסודות והרכילויות שלי,</span>
              <br />
              ואני מרגישה שהיא עושה הכול
              <br />
              כדי שיהיה לי טוב.
            </p>

            {/* Memory moment — gentle, not dramatic */}
            <div className={styles.memoryBlock}>
              <span className={styles.memoryDove} aria-hidden="true">🕊️</span>
              <p className={styles.memoryText}>
                יש רגעים שמאוד נחרטים בי —
                <br />
                כמו בצפירות,
                <br />
                כשאמא שלי עומדת ומתפרקת
                <br />
                כי אח שלה נהרג בפיגוע.
              </p>
            </div>
          </div>

          <div className={styles.rule} aria-hidden="true" />

          {/* ── Section 4: מה אני לומדת ──────────────── */}
          <div className={`${styles.section} ${styles.sectionClosing}`}>
            <span className={styles.sectionLabel}>מה אני לומדת 🌱</span>
            <p className={`${styles.para} ${styles.paraClosing}`}>
              אני לומדת ממנה{' '}
              <span className={styles.keyWord}>המון.</span>
            </p>
          </div>

        </div>
      </div>
    </PageLayout>
  );
}
