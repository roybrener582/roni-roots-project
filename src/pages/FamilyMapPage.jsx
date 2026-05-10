import PageLayout from '../components/PageLayout';
import styles from './FamilyMapPage.module.css';

export default function FamilyMapPage() {
  return (
    <PageLayout
      accent="rose"
      variant="compact"
      chapterLabel="פרק 6 – המשפחה שלי"
      title="מפת המשפחה שלי"
    >
      <div className={styles.wrapper}>

        {/* Ambient background aura */}
        <div className={styles.aura} aria-hidden="true" />

        {/* Ambient floating icons */}
        <span className={styles.iconStar1} aria-hidden="true">✦</span>
        <span className={styles.iconStar2} aria-hidden="true">✦</span>

        <div className={styles.grid}>

          {/* ── Card: עמית ─────────────────────────────── */}
          <div className={`${styles.card} ${styles.cardAmit}`}>
            <span className={styles.cardEmoji} aria-hidden="true">⚡</span>
            <h2 className={styles.cardName}>עמית</h2>
            <p className={styles.cardRelation}>אח שלי הקטן</p>
            <div className={styles.cardDivider} aria-hidden="true" />
            <p className={styles.cardDesc}>
              אח טוב,{' '}
              <br />
              לפעמים קצת קרציה{' '}
              <span className={styles.inlineEmoji}>😄</span>
            </p>
          </div>

          {/* ── Card: עינת ─────────────────────────────── */}
          <div className={`${styles.card} ${styles.cardEinat}`}>
            <span className={styles.cardEmoji} aria-hidden="true">🌸</span>
            <h2 className={styles.cardName}>עינת</h2>
            <p className={styles.cardRelation}>אמא שלי</p>
            <div className={styles.cardDivider} aria-hidden="true" />
            <p className={styles.cardDesc}>
              אמא נדירה,
              <br />
              מלמדת אותי שלא צריך
              <br />
              לפחד מהפחד
            </p>
          </div>

          {/* ── Card: רועי ─────────────────────────────── */}
          <div className={`${styles.card} ${styles.cardRoi}`}>
            <span className={styles.cardEmoji} aria-hidden="true">😎</span>
            <h2 className={styles.cardName}>רועי</h2>
            <p className={styles.cardRelation}>אבא שלי</p>
            <div className={styles.cardDivider} aria-hidden="true" />
            <p className={styles.cardDesc}>
              אבא נדיר,
              <br />
              תמיד אומר שצריך לצחוק —
              <br />
              כי לבכות לא עוזר,
              <br />
              חיים פעם אחת
            </p>
          </div>

        </div>
      </div>
    </PageLayout>
  );
}
