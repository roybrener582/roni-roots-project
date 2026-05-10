import PageLayout from '../components/PageLayout';
import styles from './CitizenshipInsightPage.module.css';

export default function CitizenshipInsightPage() {
  return (
    <PageLayout
      accent="gold"
      chapterLabel="פרק 10 – אזרחות"
      title="מה זה להיות אזרח בישראל?"
    >
      <div className={styles.wrapper}>

        <div className={styles.aura} aria-hidden="true" />

        <span className={styles.iconFlag}  aria-hidden="true">🇮🇱</span>
        <span className={styles.iconHands} aria-hidden="true">🤝</span>
        <span className={styles.iconLeaf}  aria-hidden="true">🌱</span>

        <div className={styles.flow}>

          {/* ── Section 1 ── */}
          <div className={styles.section}>
            <span className={styles.sectionLabel}>
              מה זה אומר בעיניי להיות אזרח/ית במדינת ישראל?
            </span>
            <p className={styles.para}>
              בעיניי, להיות אזרחית במדינת ישראל זה להיות{' '}
              <span className={styles.keyWord}>חלק מהמדינה,</span>{' '}
              לחיות כאן ולהרגיש שייכת למקום. זה גם אומר{' '}
              <span className={styles.keyWord}>לכבד את החוקים,</span>{' '}
              את האנשים שחיים כאן ואת המדינה שלנו.
            </p>
          </div>

          <div className={styles.rule} aria-hidden="true" />

          {/* ── Section 2 ── */}
          <div className={`${styles.section} ${styles.sectionClosing}`}>
            <span className={styles.sectionLabel}>
              איזו זכות או אחריות חשובה בעיניי במיוחד?
            </span>
            <p className={`${styles.para} ${styles.paraClosing}`}>
              בעיניי, אחת האחריות הכי חשובות היא{' '}
              <span className={styles.keyWord}>לעזור לאחרים</span>{' '}
              ולשמור על הסביבה שלנו. חשוב גם{' '}
              <span className={styles.keyWord}>לכבד אחד את השני</span>{' '}
              ולהיות אנשים טובים, כדי שיהיה לכולנו מקום נעים לחיות בו.
            </p>
          </div>

        </div>
      </div>
    </PageLayout>
  );
}
