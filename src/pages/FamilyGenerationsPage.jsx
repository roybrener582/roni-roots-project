import PageLayout from '../components/PageLayout';
import styles from './FamilyGenerationsPage.module.css';

export default function FamilyGenerationsPage() {
  return (
    <PageLayout
      accent="forest"
      variant="compact"
      chapterLabel="פרק 7 – עץ המשפחה שלי"
      title="איסוף מידע על הדורות במשפחה"
    >
      <div className={styles.wrapper}>
        <div className={styles.aura} aria-hidden="true" />

        <div className={styles.tree}>

          {/* ── Generation 1: הדור שלי ─────────────────── */}
          <div className={`${styles.genSection} ${styles.gen1}`}>
            <div className={styles.genHeader}>
              <div className={styles.genLine} aria-hidden="true" />
              <span className={styles.genLabel}>הדור שלי</span>
              <div className={styles.genLine} aria-hidden="true" />
            </div>
            <div className={styles.cards}>
              <div className={`${styles.card} ${styles.cardMe}`}>
                <span className={styles.meBadge}>✦ אני</span>
                <strong className={styles.name}>רוני ברנר</strong>
                <span className={styles.meta}>2013 · ישראל</span>
              </div>
              <div className={styles.card}>
                <strong className={styles.name}>עמית ברנר</strong>
                <span className={styles.meta}>2015 · ישראל</span>
                <span className={styles.relation}>אח שלי</span>
              </div>
            </div>
          </div>

          <div className={styles.connector} aria-hidden="true" />

          {/* ── Generation 2: ההורים שלי ───────────────── */}
          <div className={`${styles.genSection} ${styles.gen2}`}>
            <div className={styles.genHeader}>
              <div className={styles.genLine} aria-hidden="true" />
              <span className={styles.genLabel}>ההורים שלי</span>
              <div className={styles.genLine} aria-hidden="true" />
            </div>
            <div className={styles.cards}>
              <div className={styles.card}>
                <strong className={styles.name}>עינת רגב</strong>
                <span className={styles.meta}>1984 · ישראל</span>
                <span className={styles.relation}>אמא שלי</span>
              </div>
              <div className={styles.card}>
                <strong className={styles.name}>רועי ברנר</strong>
                <span className={styles.meta}>1983 · ישראל</span>
                <span className={styles.relation}>אבא שלי</span>
              </div>
            </div>
          </div>

          <div className={styles.connector} aria-hidden="true" />

          {/* ── Generation 3: סבים וסבתות ──────────────── */}
          <div className={`${styles.genSection} ${styles.gen3}`}>
            <div className={styles.genHeader}>
              <div className={styles.genLine} aria-hidden="true" />
              <span className={styles.genLabel}>סבים וסבתות</span>
              <div className={styles.genLine} aria-hidden="true" />
            </div>
            <div className={styles.subgroups}>
              <div className={styles.subgroup}>
                <span className={styles.subgroupLabel}>צד אבא</span>
                <div className={styles.cards}>
                  <div className={styles.card}>
                    <strong className={styles.name}>סילבה (ביאטריס)</strong>
                    <span className={styles.meta}>1961 · ארגנטינה</span>
                    <span className={styles.relation}>סבתא שלי מצד אבא</span>
                  </div>
                  <div className={styles.card}>
                    <strong className={styles.name}>נתנאל</strong>
                    <span className={styles.meta}>1955 · ישראל</span>
                    <span className={styles.relation}>סבא שלי מצד אבא</span>
                  </div>
                </div>
              </div>
              <div className={styles.subgroup}>
                <span className={styles.subgroupLabel}>צד אמא</span>
                <div className={styles.cards}>
                  <div className={styles.card}>
                    <strong className={styles.name}>אורה</strong>
                    <span className={styles.meta}>1952 · ישראל</span>
                    <span className={styles.relation}>סבתא שלי מצד אמא</span>
                  </div>
                  <div className={styles.card}>
                    <strong className={styles.name}>אליהו</strong>
                    <span className={styles.meta}>1948 · קפריסין</span>
                    <span className={styles.relation}>סבא שלי מצד אמא</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.connector} aria-hidden="true" />

          {/* ── Generation 4: דורות קודמים ─────────────── */}
          <div className={`${styles.genSection} ${styles.gen4}`}>
            <div className={styles.genHeader}>
              <div className={styles.genLine} aria-hidden="true" />
              <span className={styles.genLabel}>דורות קודמים</span>
              <div className={styles.genLine} aria-hidden="true" />
            </div>
            <div className={styles.subgroups}>

              <div className={styles.subgroup}>
                <span className={styles.subgroupLabel}>צד אבא</span>
                <div className={styles.cards}>
                  <div className={styles.card}>
                    <strong className={styles.name}>פנינה</strong>
                    <span className={styles.meta}>1935 · בולגריה</span>
                    <span className={styles.relation}>סבתא רבתה</span>
                  </div>
                  <div className={styles.card}>
                    <strong className={styles.name}>משה</strong>
                    <span className={styles.meta}>1931 · לטביה</span>
                    <span className={styles.relation}>סבא רבה</span>
                  </div>
                  <div className={styles.card}>
                    <strong className={styles.name}>פולה</strong>
                    <span className={styles.meta}>1941 · ארגנטינה</span>
                    <span className={styles.relation}>סבתא רבתה</span>
                  </div>
                  <div className={styles.card}>
                    <strong className={styles.name}>ראובן</strong>
                    <span className={styles.meta}>1930 · ארגנטינה</span>
                    <span className={styles.relation}>סבא רבה</span>
                  </div>
                </div>
              </div>

              <div className={styles.subgroup}>
                <span className={styles.subgroupLabel}>צד אמא</span>
                <div className={styles.cards}>
                  <div className={styles.card}>
                    <strong className={styles.name}>לוטי</strong>
                    <span className={styles.meta}>1921 · רומניה</span>
                    <span className={styles.relation}>סבתא רבתה</span>
                  </div>
                  <div className={styles.card}>
                    <strong className={styles.name}>מנשה</strong>
                    <span className={styles.meta}>1919 · רומניה</span>
                    <span className={styles.relation}>סבא רבה</span>
                  </div>
                  <div className={styles.card}>
                    <strong className={styles.name}>נתן</strong>
                    <span className={styles.meta}>1920 · פולין</span>
                    <span className={styles.relation}>סבא רבה</span>
                  </div>
                  <div className={styles.card}>
                    <strong className={styles.name}>אסתר</strong>
                    <span className={styles.meta}>1920 · פולין</span>
                    <span className={styles.relation}>סבתא רבתה</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </PageLayout>
  );
}
