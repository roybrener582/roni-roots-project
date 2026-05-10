import PageLayout from '../components/PageLayout';
import styles from './FutureAspirationsPage.module.css';

export default function FutureAspirationsPage() {
  return (
    <PageLayout
      accent="violet"
      chapterLabel="פרק 4 – מגילת החיים שלי"
      title="שאיפות לעתיד"
      subtitle="מי אני רוצה להיות ✨"
    >
      <div className={styles.body}>

        {/* ── Photos — side by side, object-fit: contain ── */}
        <div className={styles.imageRow}>
          <div className={styles.imageFrame} style={{ animationDelay: '0.15s' }}>
            <img src="/roni1.png" alt="רוני" className={styles.photo} />
          </div>
          <div className={styles.imageFrame} style={{ animationDelay: '0.28s' }}>
            <img src="/roni2.png" alt="רוני" className={styles.photo} />
          </div>
        </div>

        {/* ── Dreamy divider ── */}
        <p className={styles.sparkle} aria-hidden="true">✨ &nbsp; ✨ &nbsp; ✨</p>

        {/* ── Three content sections ── */}
        <div className={styles.sections}>

          {/* Section 1 – מה אני רוצה ללמוד */}
          <article
            className={styles.card}
            style={{
              '--cc-bg':     'rgba(210,195,255,0.28)',
              '--cc-border': 'rgba(155,120,220,0.32)',
              '--cc-accent': '#9070c8',
              animationDelay: '0.38s',
            }}
          >
            <div className={styles.cardHead}>
              <span className={styles.cardIcon} aria-hidden="true">🎨</span>
              <h2 className={styles.cardTitle}>מה אני רוצה ללמוד</h2>
            </div>
            <p className={styles.cardText}>
              להרחיב את הידע שלי ב<mark className={styles.hi}>עיצוב פנים</mark> —
              {' '}כי זה מאוד מעניין אותי.
              {' '}גם ללמוד <mark className={styles.hi}>עיצוב אירועים</mark> 🏡
            </p>
          </article>

          {/* Section 2 – מה אני רוצה להיות */}
          <article
            className={styles.card}
            style={{
              '--cc-bg':     'rgba(255,228,200,0.32)',
              '--cc-border': 'rgba(215,168,90,0.32)',
              '--cc-accent': '#c08840',
              animationDelay: '0.50s',
            }}
          >
            <div className={styles.cardHead}>
              <span className={styles.cardIcon} aria-hidden="true">🏗️</span>
              <h2 className={styles.cardTitle}>מה אני רוצה להיות</h2>
            </div>
            <p className={styles.cardText}>
              כשאהיה גדולה, להיות{' '}
              <mark className={styles.hi}>אדריכלית</mark>{' '}או{' '}
              <mark className={styles.hi}>מעצבת פנים</mark> ✨{' '}
              — מקצועות שמחברים יצירה, יופי ועיצוב.
            </p>
          </article>

          {/* Section 3 – מי אני רוצה להיות כאדם */}
          <article
            className={styles.card}
            style={{
              '--cc-bg':     'rgba(255,205,228,0.28)',
              '--cc-border': 'rgba(220,130,168,0.30)',
              '--cc-accent': '#c86090',
              animationDelay: '0.62s',
            }}
          >
            <div className={styles.cardHead}>
              <span className={styles.cardIcon} aria-hidden="true">💛</span>
              <h2 className={styles.cardTitle}>מי אני רוצה להיות כאדם</h2>
            </div>
            <p className={styles.cardText}>
              לא הייתי רוצה לשנות כלום בעצמי 💛{' '}
              שבסביבה שלי כולם יהיו נחמדים ויהיה לכולם כיף להיות יחד.
            </p>
          </article>

        </div>
      </div>
    </PageLayout>
  );
}
