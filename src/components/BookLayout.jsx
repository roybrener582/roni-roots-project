import styles from './BookLayout.module.css';

/**
 * BookLayout — the responsive shell that wraps every page of the book.
 *
 * Props:
 *   label    — the floating title shown above the cover (optional)
 *   nav      — Navigation component rendered at the bottom of the cover
 *   children — the page-stack content (managed by Book.jsx)
 */
export default function BookLayout({ label = 'עבודת השורשים', nav, children }) {
  return (
    <div className={styles.shell}>
      <div className={styles.bookWrapper}>

        <div className={styles.bookLabel} aria-hidden="true">
          <span className={styles.labelLine} />
          <span className={styles.labelText}>{label}</span>
          <span className={styles.labelLine} />
        </div>

        <div className={styles.cover}>
          {/* Gold accent on the right edge (RTL spine side) */}
          <div className={styles.spineAccent} aria-hidden="true" />

          {/* Page area: fills all remaining cover height via flex */}
          <div className={styles.pageArea}>
            {children}
          </div>

          {nav && <div className={styles.navArea}>{nav}</div>}
        </div>

      </div>
    </div>
  );
}
