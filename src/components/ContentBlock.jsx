import styles from './ContentBlock.module.css';

/**
 * ContentBlock — styled text section
 *
 * variant
 *   'body'      plain warm body text
 *   'highlight' boxed callout with accent start-border (RTL-aware)
 *   'quote'     centered italic block with decorative top/bottom rules
 */
export default function ContentBlock({ children, variant = 'body' }) {
  return (
    <div className={`${styles.block} ${styles[variant]}`}>
      {children}
    </div>
  );
}
