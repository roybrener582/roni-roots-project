import PageLayout from '../components/PageLayout';
import styles from './FamilyRolePage.module.css';

export default function FamilyRolePage() {
  return (
    <PageLayout
      accent="rose"
      variant="compact"
      chapterLabel="פרק 6 – המשפחה שלי"
      title="המקום שלי במשפחה"
    >
      <div className={styles.wrapper}>

        <div className={styles.aura} aria-hidden="true" />
        <span className={styles.starA} aria-hidden="true">✦</span>
        <span className={styles.starB} aria-hidden="true">✦</span>

        <div className={styles.grid}>

          {/* ── 1: אחות בכורה ─────────────────────────── */}
          <div className={`${styles.card} ${styles.cardSister}`}>
            <span className={styles.icon} aria-hidden="true">👧</span>
            <h3 className={styles.title}>אחות בכורה</h3>
            <div className={styles.divider} aria-hidden="true" />
            <p className={styles.desc}>
              אני הבכורה.
              <br />
              יש דברים שאני יכולה לעשות
              <br />
              שאחי הקטן עדיין לא יכול.
            </p>
          </div>

          {/* ── 2: עוזרת בבית ────────────────────────── */}
          <div className={`${styles.card} ${styles.cardHelper}`}>
            <span className={styles.icon} aria-hidden="true">✔️</span>
            <h3 className={styles.title}>עוזרת בבית</h3>
            <div className={styles.divider} aria-hidden="true" />
            <p className={styles.desc}>
              ניקיון, סידור —
              <br />
              ועזרה לאחי הקטן.
            </p>
          </div>

          {/* ── 3: הטכנולוגית ────────────────────────── */}
          <div className={`${styles.card} ${styles.cardTech}`}>
            <span className={styles.icon} aria-hidden="true">💻</span>
            <h3 className={styles.title}>הטכנולוגית</h3>
            <div className={styles.divider} aria-hidden="true" />
            <p className={styles.desc}>
              כל שאלה טכנולוגית?
              <br />
              שואלים אותי.
            </p>
          </div>

          {/* ── 4: אחות אוהבת ────────────────────────── */}
          <div className={`${styles.card} ${styles.cardBrother}`}>
            <span className={styles.icon} aria-hidden="true">😄</span>
            <h3 className={styles.title}>אחות אוהבת</h3>
            <div className={styles.divider} aria-hidden="true" />
            <p className={styles.desc}>
              אני אוהבת את אח שלי —
              <br />
              גם כשהוא קצת מעייף.
            </p>
          </div>

          {/* ── 5: שפית הבית ──────────────────────────── */}
          <div className={`${styles.card} ${styles.cardChef}`}>
            <span className={styles.icon} aria-hidden="true">🍳</span>
            <h3 className={styles.title}>שפית הבית</h3>
            <div className={styles.divider} aria-hidden="true" />
            <p className={styles.desc}>
              המומחית של הבישול בבית.
            </p>
          </div>

        </div>
      </div>
    </PageLayout>
  );
}
