import styles from './Divider.module.css';

export default function Divider({ width = 'md' }) {
  return (
    <div className={`${styles.divider} ${styles[`w${width}`]}`} aria-hidden="true">
      <span className={styles.line} />
      <span className={styles.diamond}>◆</span>
      <span className={styles.line} />
    </div>
  );
}
