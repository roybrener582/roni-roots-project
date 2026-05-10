import Divider from './Divider';
import styles from './PageLayout.module.css';

/**
 * PageLayout — the shared structure for every book page.
 *
 * Three zones (fills BookPage's full height):
 *   header   flex-shrink: 0   ornament · chapter label · title · subtitle · divider
 *   main     flex: 1          page content (children)
 *   footer   flex-shrink: 0   closing ornament
 *
 * Accent system
 * ─────────────
 * Each page picks a personality via the `accent` prop.
 * PageLayout injects three CSS custom properties onto its root:
 *   --c-page-accent         solid accent color
 *   --c-page-accent-faint   very light tint (backgrounds)
 *   --c-page-accent-border  30%-opacity version (borders)
 *
 * All child components (Divider, ContentBlock, ImageBlock, InfoCard)
 * reference these variables — so the whole page shifts to one palette
 * by changing a single prop.
 *
 * Available accents:
 *   'gold'    warm amber     — welcome / intro pages
 *   'forest'  earthy sage    — origins / nature pages
 *   'rose'    dusty pink     — personal / emotional pages
 *   'sky'     soft blue      — journey / future pages
 *
 * Props
 * ─────
 * accent       string      default 'gold'
 * titleScale   'normal' | 'large'   default 'normal'
 * chapterLabel string      optional — e.g. "פרק 1׳"
 * title        ReactNode   required
 * subtitle     string      optional — italic tagline under title
 * children     ReactNode   the main content zone
 */

const ACCENTS = {
  gold:   { accent: '#c4a96e', faint: 'rgba(196,169,110,0.10)', border: 'rgba(196,169,110,0.28)' },
  forest: { accent: '#7a956e', faint: 'rgba(122,149,110,0.10)', border: 'rgba(122,149,110,0.28)' },
  rose:   { accent: '#c08888', faint: 'rgba(192,136,136,0.10)', border: 'rgba(192,136,136,0.28)' },
  sky:    { accent: '#7aaac0', faint: 'rgba(122,170,192,0.10)', border: 'rgba(122,170,192,0.28)' },
  violet: { accent: '#8a70c0', faint: 'rgba(138,112,192,0.10)', border: 'rgba(138,112,192,0.28)' },
  mint:   { accent: '#5eac92', faint: 'rgba(94,172,146,0.10)',  border: 'rgba(94,172,146,0.28)'  },
};

export default function PageLayout({
  accent = 'gold',
  variant = 'normal',
  titleScale = 'normal',
  chapterLabel,
  title,
  subtitle,
  children,
}) {
  const { accent: accentColor, faint, border } = ACCENTS[accent] ?? ACCENTS.gold;

  return (
    <div
      className={`${styles.container}${variant === 'compact' ? ` ${styles.compact}` : ''}`}
      style={{
        '--c-page-accent':        accentColor,
        '--c-page-accent-faint':  faint,
        '--c-page-accent-border': border,
      }}
    >
      {/* ── Zone 1: Header ── */}
      <header className={styles.header}>
        <p className={styles.ornament} aria-hidden="true">✦ &nbsp; ✦ &nbsp; ✦</p>

        {chapterLabel && (
          <span className={styles.chapterLabel}>{chapterLabel}</span>
        )}

        <h1 className={`${styles.title} ${titleScale === 'large' ? styles.titleLarge : ''}`}>
          {title}
        </h1>

        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

        <Divider />
      </header>

      {/* ── Zone 2: Main content ── */}
      <section className={styles.main}>
        {children}
      </section>

      {/* ── Zone 3: Footer ── */}
      <footer className={styles.footer} aria-hidden="true">
        ✦ &nbsp; ✦ &nbsp; ✦
      </footer>
    </div>
  );
}
