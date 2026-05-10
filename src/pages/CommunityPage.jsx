import PageLayout from '../components/PageLayout';
import styles from './CommunityPage.module.css';
import regbaPhoto from '../assets/regba.jpg';

export default function CommunityPage() {
  return (
    <PageLayout
      accent="forest"
      variant="compact"
      chapterLabel="פרק 9 – הקהילה שלי"
      title="הקהילה שבה אני גרה"
    >
      <div className={styles.wrapper}>
        <div className={styles.aura} aria-hidden="true" />

        <div className={styles.content}>

          {/* ── Section 1: על הקהילה היום ──────────────── */}
          <section className={styles.sectionBlock}>

            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon} aria-hidden="true">🏡</span>
              <h2 className={styles.sectionTitle}>על הקהילה היום</h2>
              <span className={styles.locationTag}>📍 מושב רגבה</span>
              <div className={styles.sectionLine} aria-hidden="true" />
            </div>

            <div className={styles.qaGrid}>

              <div className={styles.qaItem}>
                <span className={styles.question}>מה מאפיין את המקום?</span>
                <p className={styles.answer}>
                  מקום קטן ונעים שבו כולם מכירים את כולם. האנשים נחמדים ועוזרים אחד לשני,
                  יש אווירה רגועה וכיפית, נוף יפה של שדות ושל טבע, ועושים פעילויות ואירועים ביחד בחגים.
                </p>
              </div>

              <div className={styles.qaRow}>
                <div className={styles.qaItem}>
                  <span className={styles.question}>מה אני אוהבת?</span>
                  <p className={styles.answer}>
                    שיש לי חברות קרובות, ושאני מרגישה בטוחה ונוח להסתובב במושב.
                  </p>
                </div>
                <div className={styles.qaItem}>
                  <span className={styles.question}>מה הייתי רוצה לשפר?</span>
                  <p className={styles.answer}>
                    שיהיו יותר פעילויות לנוער — חוגים או מקומות להיפגש בהם.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* ── Photo of Regba ───────────────────────── */}
          <div className={styles.imageBlock}>
            <div className={styles.imageFrame}>
              <img
                src={regbaPhoto}
                alt="כניסה למושב רגבה"
                className={styles.villagePhoto}
              />
            </div>
            <p className={styles.imageCaption}>כניסה למושב רגבה</p>
          </div>

          {/* ── Section 2: קצת היסטוריה ──────────────── */}
          <section className={styles.sectionBlock}>

            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon} aria-hidden="true">📜</span>
              <h2 className={styles.sectionTitle}>קצת היסטוריה</h2>
              <div className={styles.sectionLine} aria-hidden="true" />
            </div>

            <div className={styles.qaGrid}>

              <div className={styles.qaRow}>
                <div className={styles.qaItem}>
                  <span className={styles.question}>מי הקים ומתי?</span>
                  <p className={styles.answer}>
                    המושב הוקם ב<strong className={styles.keyword}>1946</strong> על ידי עולים חדשים שהגיעו לארץ.
                  </p>
                </div>
                <div className={styles.qaItem}>
                  <span className={styles.question}>מה היה מיוחד בו פעם?</span>
                  <p className={styles.answer}>
                    פעם זה היה מקום חקלאי — אנשים עבדו יחד בשדות ובנו את החיים שלהם מחדש.
                  </p>
                </div>
              </div>

              <div className={`${styles.qaItem} ${styles.qaHighlight}`}>
                <span className={styles.question}>מה הכי מעניין בסיפור של המקום?</span>
                <p className={styles.answer}>
                  שאנשים ממקומות שונים בעולם הגיעו לכאן והצליחו לבנות{' '}
                  <strong className={styles.keyword}>קהילה חזקה</strong>{' '}
                  ומשפחה אחת גדולה.
                </p>
              </div>

            </div>
          </section>

        </div>
      </div>
    </PageLayout>
  );
}
