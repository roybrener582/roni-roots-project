import PageLayout from '../components/PageLayout';
import styles from './FamilyGeminiPage.module.css';

export default function FamilyGeminiPage() {
  return (
    <PageLayout
      accent="rose"
      variant="compact"
      chapterLabel="פרק 6 – המשפחה שלי"
      title="עיבוד בעזרת ג'מיני"
    >
      <div className={styles.wrapper}>

        <div className={styles.aura} aria-hidden="true" />

        <span className={styles.iconFamily} aria-hidden="true">💛</span>
        <span className={styles.iconMom}    aria-hidden="true">🌸</span>
        <span className={styles.iconGrowth} aria-hidden="true">🌱</span>

        <div className={styles.flow}>

          {/* ── Section 1: המשפחה שלי ──────────────────────── */}
          <div className={styles.section}>
            <span className={styles.sectionLabel}>המשפחה שלי 💛</span>
            <p className={styles.para}>
              המשפחה שלי היא{' '}
              <span className={styles.warmWord}>העוגן שלי.</span>
              <br />
              אני הכי אוהבת את הערבים שאנחנו מבלים יחד,
              <br />
              למרות האתגר שבידיעה שההורים שלי{' '}
              <span className={styles.softWord}>גרושים.</span>
            </p>
          </div>

          <div className={styles.rule} aria-hidden="true" />

          {/* ── Section 2: אבא ואח שלי ─────────────────────── */}
          <div className={styles.section}>
            <span className={styles.sectionLabel}>אבא ואח שלי</span>
            <p className={styles.para}>
              אבא שלי רועי הוא{' '}
              <span className={styles.warmWord}>אבא מושלם בעיניי.</span>
              <br />
              ממנו למדתי שלצעוק או להתלונן לא באמת עוזר,
              <br />
              ושצריך להתמודד עם דברים אחרת.
            </p>
            <p className={`${styles.para} ${styles.paraSecondary}`}>
              עמית, אחי הקטן,
              <br />
              הוא אח טוב שמוסיף הרבה{' '}
              <span className={styles.warmWord}>לשקט שלי.</span>
            </p>
          </div>

          <div className={styles.rule} aria-hidden="true" />

          {/* ── Section 3: אמא שלי ─────────────────────────── */}
          <div className={styles.section}>
            <span className={styles.sectionLabel}>אמא שלי 🌸</span>
            <p className={styles.para}>
              הדמות המשמעותית ביותר עבורי היא{' '}
              <span className={styles.warmWord}>אמא שלי, עינת.</span>
              <br />
              היא אשת הסודות שלי,
              <br />
              ועושה הכול כדי שיהיה לי טוב.
              <br />
              ממנה למדתי שיעור חשוב:
              <br />
              <span className={styles.keyWord}>לא צריך לפחד מהפחד.</span>
            </p>

            {/* Memory moment — held gently */}
            <div className={styles.memoryBlock}>
              <span className={styles.memoryDove} aria-hidden="true">🕊️</span>
              <p className={styles.memoryText}>
                דרך אמא גיליתי גם את פער הדורות.
                <br />
                בשבילי הצפירה היא רגע של זיכרון לאומי,
                <br />
                אבל עבורה זה רגע אישי וכואב,
                <br />
                שבו היא מתפרקת על אובדן אחיה בפיגוע.
              </p>
            </div>
          </div>

          <div className={styles.rule} aria-hidden="true" />

          {/* ── Section 4: מה למדתי ────────────────────────── */}
          <div className={`${styles.section} ${styles.sectionClosing}`}>
            <span className={styles.sectionLabel}>מה למדתי 🌱</span>
            <p className={`${styles.para} ${styles.paraClosing}`}>
              הפער הזה לימד אותי שלדור של אמא
              <br />
              יש חוויות עמוקות שמעצבות אותם,
              <br />
              ושאני יכולה ללמוד מהם על{' '}
              <span className={styles.keyWord}>חוזק ועל רגישות.</span>
            </p>
          </div>

        </div>
      </div>
    </PageLayout>
  );
}
