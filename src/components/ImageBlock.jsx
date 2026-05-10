import styles from './ImageBlock.module.css';

/**
 * ImageBlock — elegant photo frame
 *
 * When `src` is absent renders a placeholder (camera icon + label).
 * Replace `src` and `alt` once the real photo is available.
 *
 * Props:
 *   src       string   — image URL (optional)
 *   alt       string   — alt text for real image
 *   label     string   — accessible label + placeholder caption
 *   maxWidth  string   — CSS max-width (default "min(440px, 72%)")
 *   aspect    string   — CSS aspect-ratio value (default "4/3")
 */
export default function ImageBlock({
  src,
  alt,
  label = 'תמונה משפחתית',
  maxWidth = 'min(440px, 72%)',
  aspect = '4/3',
}) {
  return (
    <div
      className={styles.frame}
      style={{ maxWidth, aspectRatio: aspect }}
      role={src ? undefined : 'img'}
      aria-label={src ? undefined : label}
    >
      {src ? (
        <img src={src} alt={alt ?? label} className={styles.img} />
      ) : (
        <div className={styles.placeholder}>
          <span className={styles.icon} aria-hidden="true">📷</span>
          <span className={styles.caption}>{label}</span>
        </div>
      )}
    </div>
  );
}
