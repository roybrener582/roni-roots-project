import styles from './TraitCard.module.css';

/**
 * TraitCard — one personal trait displayed as a two-zone card.
 *
 * Desktop: illustration panel | text panel (side by side).
 *   reversed=true flips the order for visual variety.
 * Mobile:  illustration stacked above text.
 *
 * Each card has its own accent color via the `variant` prop.
 * CSS variables are scoped to the card — they don't affect siblings.
 *
 * Props
 * ─────
 * icon          emoji — small decorative glyph next to trait name
 * trait         string — Hebrew trait name (heading)
 * text          string — short personal description
 * illustration  emoji — large focal image inside the illustration panel
 * decos         [emoji, emoji] — floating accent details in the panel
 * variant       'amber' | 'rose' | 'lavender'
 * reversed      boolean — swap illustration/text sides for layout variety
 * index         number — drives staggered fade-in delay
 */

const VARIANTS = {
  amber: {
    color:    '#c4a050',
    faint:    'rgba(196,160,80,0.11)',
    border:   'rgba(196,160,80,0.24)',
    gradient: 'linear-gradient(135deg, rgba(220,185,110,0.30) 0%, rgba(248,228,168,0.14) 100%)',
  },
  rose: {
    color:    '#c08080',
    faint:    'rgba(192,128,128,0.11)',
    border:   'rgba(192,128,128,0.24)',
    gradient: 'linear-gradient(135deg, rgba(215,155,155,0.30) 0%, rgba(248,210,210,0.14) 100%)',
  },
  lavender: {
    color:    '#9090c8',
    faint:    'rgba(144,144,200,0.11)',
    border:   'rgba(144,144,200,0.24)',
    gradient: 'linear-gradient(135deg, rgba(170,165,225,0.30) 0%, rgba(215,210,248,0.14) 100%)',
  },
};

export default function TraitCard({
  icon,
  trait,
  text,
  illustration,
  decos = [],
  variant = 'amber',
  reversed = false,
  index = 0,
}) {
  const v = VARIANTS[variant] ?? VARIANTS.amber;

  return (
    <div
      className={`${styles.card} ${reversed ? styles.reversed : ''}`}
      style={{
        '--tc':        v.color,
        '--tc-faint':  v.faint,
        '--tc-border': v.border,
        '--tc-grad':   v.gradient,
        animationDelay: `${0.20 + index * 0.16}s`,
      }}
    >
      {/* ── Text zone ── */}
      <div className={styles.text}>
        <div className={styles.heading}>
          <span className={styles.icon} aria-hidden="true">{icon}</span>
          <h2 className={styles.traitName}>{trait}</h2>
        </div>

        <div className={styles.rule} aria-hidden="true" />

        <p className={styles.description}>{text}</p>
      </div>

      {/* ── Illustration zone ── */}
      <div
        className={styles.illustration}
        role="img"
        aria-label={trait}
      >
        {decos[0] && <span className={styles.deco1} aria-hidden="true">{decos[0]}</span>}
        <span className={styles.mainEmoji} aria-hidden="true">{illustration}</span>
        {decos[1] && <span className={styles.deco2} aria-hidden="true">{decos[1]}</span>}
      </div>
    </div>
  );
}
