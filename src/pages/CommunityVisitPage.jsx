import PageLayout from '../components/PageLayout';
import styles from './CommunityVisitPage.module.css';

export default function CommunityVisitPage() {
  return (
    <PageLayout
      accent="forest"
      variant="compact"
      chapterLabel="פרק 9 – קהילות שביקרתי בהן"
      title="באיזה קהילות כבר ביקרנו?"
    >
      <div className={styles.wrapper}>
        <div className={styles.aura} aria-hidden="true" />

        <span className={styles.iconMap}   aria-hidden="true">🗺️</span>
        <span className={styles.iconHands} aria-hidden="true">🤝</span>
        <span className={styles.iconLeaf}  aria-hidden="true">🌿</span>

        <div className={styles.content}>

          {/* ── Q1 ─────────────────────────────────────────── */}
          <div className={styles.qaCard}>
            <span className={styles.qLabel}>באיזה קהילות כבר ביקרנו?</span>
            <p className={styles.answer}>
              ביקרנו ב<strong className={styles.keyword}>לוחמי הגטאות</strong>,
              {' '}ב<strong className={styles.keyword}>כפר מסריק</strong>{' '}
              וב<strong className={styles.keyword}>ראש הנקרה</strong>.
            </p>
          </div>

          <div className={styles.rule} aria-hidden="true" />

          {/* ── Q2 ─────────────────────────────────────────── */}
          <div className={styles.qaCard}>
            <span className={styles.qLabel}>מה למדתי על קהילה מסוימת שלא ידעתי קודם?</span>
            <p className={styles.answer}>
              למדתי שלכל קהילה יש סיפור מיוחד ושונה. בלוחמי הגטאות למשל למדתי על אנשים שעברו דברים מאוד קשים ובנו קהילה חזקה למרות הכול.
            </p>
          </div>

          <div className={styles.rule} aria-hidden="true" />

          {/* ── Q3 ─────────────────────────────────────────── */}
          <div className={styles.qaCard}>
            <span className={styles.qLabel}>מה הפתיע אותי?</span>
            <p className={styles.answer}>
              הפתיע אותי כמה אנשים היו חזקים והצליחו להמשיך לחיות ולבנות קהילה גם אחרי דברים לא פשוטים.
            </p>
          </div>

          <div className={styles.rule} aria-hidden="true" />

          {/* ── Q4 ─────────────────────────────────────────── */}
          <div className={styles.qaCard}>
            <span className={styles.qLabel}>מה מצא חן בעיניי במיוחד?</span>
            <p className={styles.answer}>
              מאוד מצא חן בעיניי שיש תחושת ביחד, שאנשים עוזרים אחד לשני ושומרים על הקהילה שלהם.
            </p>
          </div>

          <div className={styles.rule} aria-hidden="true" />

          {/* ── Q5 ─────────────────────────────────────────── */}
          <div className={styles.qaCard}>
            <span className={styles.qLabel}>האם משהו גרם לי לחשוב אחרת ממה שחשבתי לפני הביקור?</span>
            <p className={`${styles.answer} ${styles.answerClosing}`}>
              כן, לפני הביקור חשבתי שקהילה זה רק מקום שגרים בו, אבל עכשיו אני מבינה שקהילה זה גם אנשים, סיפור וחיבור ביניהם.
            </p>
          </div>

        </div>
      </div>
    </PageLayout>
  );
}
