import styles from './InfoCard.module.css';

/**
 * InfoCard — clean family-member or topic card
 *
 * Props:
 *   icon      string — emoji or icon character
 *   title     string — main label (heading font)
 *   subtitle  string — secondary line (body font, muted)
 */
export default function InfoCard({ icon, title, subtitle }) {
  return (
    <div className={styles.card}>
      {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
      <p className={styles.title}>{title}</p>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
