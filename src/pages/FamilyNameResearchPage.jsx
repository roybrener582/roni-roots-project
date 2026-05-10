import PageLayout from '../components/PageLayout';
import styles from './FamilyNameResearchPage.module.css';

export default function FamilyNameResearchPage() {
  return (
    <PageLayout
      accent="mint"
      chapterLabel="פרק 5 – שם המשפחה שלי"
      title="מקור ומשמעות – מחקר קצר"
    >
      <div className={styles.wrapper}>

        {/* Ambient floating icons */}
        <span className={styles.iconBookAmbient} aria-hidden="true">📖</span>
        <span className={styles.iconThoughtAmbient} aria-hidden="true">💭</span>

        {/* ── Section 1: מה גיליתי ──────────────────────────── */}
        <section className={styles.card}>
          <h2 className={styles.sectionTitle}>
            <span aria-hidden="true">📖</span>
            מה גיליתי
          </h2>

          <p className={styles.body}>
            שם המשפחה{' '}
            <span className={styles.nameHighlight}>ברנר</span>{' '}
            הוא ממוצא גרמני / יידיש,
            <br />
            ופירושו{' '}
            <span className={styles.fireWord}>שורף</span>.
          </p>

          <div className={styles.infoBox}>
            <span className={styles.infoIcon} aria-hidden="true">🔥</span>
            <p className={styles.infoText}>
              בעבר, שם זה ניתן לאנשים שעסקו בעבודות הקשורות לאש —
              כמו ייצור משקאות חריפים או עבודות דומות.
            </p>
          </div>
        </section>

        {/* ── Separator ─────────────────────────────────────── */}
        <div className={styles.sep} aria-hidden="true" />

        {/* ── Section 2: מה עניין אותי ─────────────────────── */}
        <section className={`${styles.card} ${styles.cardPersonal}`}>
          <h2 className={styles.sectionTitle}>
            <span aria-hidden="true">💭</span>
            מה עניין אותי
          </h2>

          <p className={styles.reflectionText}>
            האמת היא שמה שהכי עניין אותי
            <br />
            הוא המשמעות של השם —
            <br />
            שפירושו{' '}
            <span className={styles.fireWord}>שורף</span>.
          </p>
        </section>

      </div>
    </PageLayout>
  );
}
