import styles from './NavigationItem.module.css';

export default function NavigationItem({ label, isActive, onClick }) {
  return (
    <button
      className={`${styles.item} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </button>
  );
}
