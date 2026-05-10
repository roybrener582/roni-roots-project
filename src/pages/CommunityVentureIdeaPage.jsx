import PageLayout from '../components/PageLayout';
import styles from './CommunityVentureIdeaPage.module.css';

export default function CommunityVentureIdeaPage() {
  return (
    <PageLayout
      accent="mint"
      variant="compact"
      chapterLabel="פרק 9 – רעיון למיזם קהילתי קטן"
      title="רעיון למיזם קהילתי קטן"
    >
      <div className={styles.wrapper}>

        <div className={styles.aura} aria-hidden="true" />

        {/* Ambient floating icons */}
        <span className={styles.iconPhone}    aria-hidden="true">📱</span>
        <span className={styles.iconCelebrate} aria-hidden="true">🎉</span>
        <span className={styles.iconPeople}   aria-hidden="true">👥</span>

        <div className={styles.flow}>

          {/* ── Illustration block ─────────────────────── */}
          <div className={styles.illustrationBlock} aria-hidden="true">
            <span className={styles.mainIcon}>📱</span>
            <div className={styles.sideIcons}>
              <span>👥</span>
              <span>🎉</span>
            </div>
          </div>

          {/* ── Idea tag ───────────────────────────────── */}
          <span className={styles.ideaTag}>הרעיון שלי</span>

          {/* ── Main paragraph card ────────────────────── */}
          <div className={styles.card}>
            <p className={styles.para}>
              הרעיון שלי הוא ליצור{' '}
              <span className={styles.highlight}>אפליקציה לניהול אירועים במושב</span>.
              {' '}דרך האפליקציה יהיה אפשר לראות אילו אירועים מתקיימים,
              להירשם אליהם ואפילו לעזור בארגון שלהם.
              זה יכול לעזור לכל התושבים להיות מעודכנים ולא לפספס דברים,
              וגם לעזור למי שמארגן את האירועים לעשות סדר.
              האפליקציה תעזור{' '}
              <span className={styles.highlight}>לחזק את הקהילה</span>{' '}
              ולגרום ליותר אנשים להשתתף בפעילויות.
              אני חושבת שגם חברים שלי וגם מבוגרים במושב יכולים להשתתף
              ולעזור{' '}
              <span className={styles.highlight}>בפיתוח הרעיון ובשימוש באפליקציה</span>.
            </p>
          </div>

          {/* ── Closing tagline ────────────────────────── */}
          <p className={styles.tagline}>כי קהילה טובה מתחילה ברעיון אחד קטן 💡</p>

        </div>
      </div>
    </PageLayout>
  );
}
