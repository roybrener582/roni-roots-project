import { useState } from 'react';
import styles from './Navigation.module.css';

export default function Navigation({ current, total, onNext, onPrev, onGoTo, disabled }) {
  const [inputVal, setInputVal] = useState('');
  const [shake, setShake] = useState(false);

  const isFirst = current === 0;
  const isLast  = current === total - 1;

  const handleGoTo = () => {
    const raw = inputVal.trim();
    if (!raw) return;

    const num = parseInt(raw, 10);
    if (isNaN(num)) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    onGoTo(Math.max(1, Math.min(num, total)));
    setInputVal('');
  };

  return (
    <nav className={styles.nav} aria-label="ניווט בין עמודים">
      <div className={styles.pill}>

        <button
          className={styles.btn}
          onClick={onPrev}
          disabled={isFirst || disabled}
          aria-label="עמוד קודם"
        >
          <svg className={styles.chevron} viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className={styles.btnLabel}>הקודם</span>
        </button>

        <div className={styles.sep} aria-hidden="true" />

        <span className={styles.pageIndicator} aria-live="polite">
          עמוד <strong>{current + 1}</strong> מתוך {total}
        </span>

        <div className={styles.sep} aria-hidden="true" />

        <div className={styles.jumpGroup}>
          <input
            className={`${styles.jumpInput} ${shake ? styles.jumpShake : ''}`}
            type="number"
            min="1"
            max={total}
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleGoTo()}
            placeholder="עמוד"
            aria-label="קפוץ לעמוד"
            disabled={disabled}
          />
          <button
            className={styles.jumpBtn}
            onClick={handleGoTo}
            disabled={disabled}
            aria-label="עבור לעמוד"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </div>

        <div className={styles.sep} aria-hidden="true" />

        <button
          className={styles.btn}
          onClick={onNext}
          disabled={isLast || disabled}
          aria-label="עמוד הבא"
        >
          <span className={styles.btnLabel}>הבא</span>
          <svg className={`${styles.chevron} ${styles.chevronFlip}`}
            viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

      </div>
    </nav>
  );
}
