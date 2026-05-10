import { forwardRef } from 'react';
import styles from './HamburgerButton.module.css';

const HamburgerButton = forwardRef(function HamburgerButton({ onClick, isOpen }, ref) {
  return (
    <button
      ref={ref}
      className={`${styles.btn} ${isOpen ? styles.active : ''}`}
      onClick={onClick}
      aria-label={isOpen ? 'סגור תפריט' : 'פתח תפריט'}
      aria-expanded={isOpen}
    >
      <span className={styles.bar} />
      <span className={styles.bar} />
      <span className={styles.bar} />
    </button>
  );
});

export default HamburgerButton;
