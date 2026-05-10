import PageLayout from '../components/PageLayout';
import styles from './BusinessCardPage.module.css';

/* ─── SVG icons ──────────────────────────────────────────── */

function HouseHeartIcon() {
  return (
    <svg viewBox="0 0 40 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Roof */}
      <path d="M2 17L20 3l18 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Walls */}
      <path d="M7 17v13a1 1 0 001 1h24a1 1 0 001-1V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      {/* Heart inside */}
      <path
        d="M20 20.5c-.9-1.1-2.8-1.1-3.8 0-1 1.1-.8 3.2 3.8 5.5 4.6-2.3 4.8-4.4 3.8-5.5-1-.9-2.9-.9-3.8 0z"
        fill="currentColor"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.03-8.7A2 2 0 012.01 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2.5"/>
      <polyline points="2,6 12,13 22,6"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4.5"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>
    </svg>
  );
}

/* ─── Front card ──────────────────────────────────────────── */

function FrontCard() {
  return (
    <div className={`${styles.card} ${styles.cardFront}`}>
      {/* Soft background glow blobs */}
      <span className={styles.blobTR} aria-hidden="true" />
      <span className={styles.blobBL} aria-hidden="true" />

      {/* 1px inset gold border — mimics card printing edge */}
      <span className={styles.insetBorder} aria-hidden="true" />

      <div className={styles.frontInner}>
        {/* Icon */}
        <div className={styles.iconWrap}>
          <HouseHeartIcon />
        </div>

        {/* Name + rule + role */}
        <div className={styles.nameBlock}>
          <h2 className={styles.cardName}>רוני ברנר</h2>
          <div className={styles.goldRule}>
            <span className={styles.goldRuleLine} />
            <span className={styles.goldRuleDot} />
            <span className={styles.goldRuleLine} />
          </div>
          <p className={styles.cardRole}>אדריכלית &nbsp;·&nbsp; מעצבת פנים</p>
        </div>

        {/* Tagline */}
        <p className={styles.tagline}>עיצוב נקי, מודרני ומהלב</p>
      </div>
    </div>
  );
}

/* ─── Back card ───────────────────────────────────────────── */

function BackCard() {
  return (
    <div className={`${styles.card} ${styles.cardBack}`}>
      {/* Gold accent band at top */}
      <div className={styles.topBand} aria-hidden="true" />

      {/* 1px inset border */}
      <span className={styles.insetBorder} aria-hidden="true" />

      <div className={styles.backInner}>
        {/* Contact list */}
        <ul className={styles.contactList}>
          <li className={styles.contactItem}>
            <span className={styles.contactIcon}><PhoneIcon /></span>
            <span className={styles.contactText}>054-123-4567</span>
          </li>
          <li className={styles.contactItem}>
            <span className={styles.contactIcon}><EmailIcon /></span>
            <span className={styles.contactText}>roni@brener.co.il</span>
          </li>
          <li className={styles.contactItem}>
            <span className={styles.contactIcon}><InstagramIcon /></span>
            <span className={styles.contactText}>@roni.brener</span>
          </li>
        </ul>

        {/* Bottom name strip */}
        <div className={styles.backFooter}>
          <span className={styles.backFooterLine} />
          <div className={styles.backNameRow}>
            <span className={styles.backName}>רוני ברנר</span>
            <span className={styles.backSep} aria-hidden="true">·</span>
            <span className={styles.backJobTitle}>מעצבת פנים</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────── */

export default function BusinessCardPage() {
  return (
    <PageLayout
      accent="sky"
      chapterLabel="פרק 3׳"
      title="כרטיס הביקור שלי"
      subtitle="כך אני מדמיינת את עצמי בעתיד"
    >
      <div className={styles.scene}>
        <div className={styles.cardPair}>

          {/* Front — rightmost in RTL */}
          <div className={styles.cardWrap} style={{ '--delay': '0s' }}>
            <span className={styles.sideLabel}>צד קדמי</span>
            <FrontCard />
          </div>

          {/* Flip hint */}
          <div className={styles.flipHint} aria-hidden="true">
            <span className={styles.flipArrow}>↔</span>
          </div>

          {/* Back — leftmost in RTL */}
          <div className={styles.cardWrap} style={{ '--delay': '0.14s' }}>
            <span className={styles.sideLabel}>צד אחורי</span>
            <BackCard />
          </div>

        </div>
      </div>
    </PageLayout>
  );
}
