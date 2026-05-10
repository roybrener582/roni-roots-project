import styles from './AppHeader.module.css';

export default function AppHeader({ title, onBack, onMyEvents, myEventsCount = 0 }) {
  return (
    <header className={styles.header}>
      <div className={styles.slot}>
        {onBack && (
          <button className={styles.backBtn} onClick={onBack} aria-label="חזרה">
            חזרה
          </button>
        )}
      </div>

      <div className={styles.title}>{title}</div>

      <div className={styles.slot}>
        {onMyEvents && (
          <button className={styles.myEventsBtn} onClick={onMyEvents}>
            האירועים שלי
            {myEventsCount > 0 && (
              <span className={styles.badge}>{myEventsCount}</span>
            )}
          </button>
        )}
      </div>
    </header>
  );
}
