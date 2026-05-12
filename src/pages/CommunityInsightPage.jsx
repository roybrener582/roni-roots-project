import PageLayout from '../components/PageLayout';
import styles from './CommunityInsightPage.module.css';

export default function CommunityInsightPage() {
  return (
    <PageLayout
      accent="forest"
      chapterLabel="פרק 9 – הקהילה שלי"
      title="מהי קהילה בשבילי"
    >
      <div className={styles.wrapper}>

        <div className={styles.aura} aria-hidden="true" />

        <span className={styles.iconLeaf}    aria-hidden="true">🌿</span>
        <span className={styles.iconHands}   aria-hidden="true">🤝</span>
        <span className={styles.iconHome}    aria-hidden="true">🏡</span>

        <div className={styles.flow}>

          {/* ── Section 1 ─────────────────────────────── */}
          <div className={styles.section}>
            <span className={styles.sectionLabel}>מהי לדעתך קהילה?</span>
            <p className={styles.para}>
              בעיניי, קהילה היא קבוצה של אנשים שחיים ביחד, מכירים אחד את השני ועוזרים אחד לשני כשצריך.
            </p>
          </div>

          <div className={styles.rule} aria-hidden="true" />

          {/* ── Section 2 ─────────────────────────────── */}
          <div className={styles.section}>
            <span className={styles.sectionLabel}>האם אני מרגישה שייכת לקהילה?</span>
            <p className={styles.para}>
              כן, אני מרגישה שייכת לקהילה שלי{' '}
              <span className={styles.keyWord}>ברגבה.</span>{' '}
              אני גרה שם, מכירה את האנשים ,לוקחת חלק באירועים ובפעיליות.
            </p>
          </div>

          {/* ── Real-life example from Regba ─────────── */}
          <div className={styles.exampleBlock}>
            <span className={styles.exampleIcon} aria-hidden="true">🪁</span>
            <p className={styles.exampleText}>
              למשל, אצלנו ברגבה יש מסורת  כל סוכות כולם מכינים עפיפונים ביחד. זה משהו שאני זוכרת מאז שהייתי קטנה, וזה מרגיש ממש כמו קהילה אמיתית.
            </p>
          </div>

          <div className={styles.rule} aria-hidden="true" />

          {/* ── Section 3 ─────────────────────────────── */}
          <div className={`${styles.section} ${styles.sectionClosing}`}>
            <span className={styles.sectionLabel}>למה חשוב להיות חלק מקהילה?</span>
            <p className={`${styles.para} ${styles.paraClosing}`}>
              לדעתי חשוב להיות חלק מקהילה כי זה נותן תחושת{' '}
              <span className={styles.keyWord}>שייכות וביטחון.</span>{' '}
              כשיש קהילה, אנחנו לא לבד  יש אנשים שעוזרים לנו וגם שמחים איתנו ברגעים טובים.
            </p>
          </div>

        </div>
      </div>
    </PageLayout>
  );
}
