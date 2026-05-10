import styles from './PdfLoadingOverlay.module.css';

export default function PdfLoadingOverlay({ progress }) {
  if (!progress) return null;

  const { current, total } = progress;
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className={styles.overlay} role="alert" aria-live="polite" dir="rtl">
      <div className={styles.box}>
        <div className={styles.spinner} aria-hidden="true" />
        <p className={styles.title}>מכין את ה-PDF...</p>
        <p className={styles.sub}>
          {current === 0
            ? 'טוען עמודים...'
            : `עמוד ${current} מתוך ${total}`}
        </p>
        <div className={styles.barTrack} aria-hidden="true">
          <div className={styles.barFill} style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}
