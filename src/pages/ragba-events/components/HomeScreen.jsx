import styles from './HomeScreen.module.css';
import AppButton from './AppButton';

export default function HomeScreen({
  onViewEvents,
  onViewMyEvents,
  registrations,
  volunteerings,
}) {
  const totalCount = registrations.size + volunteerings.size;

  return (
    <div className={styles.screen}>
      <div className={styles.hero}>
        <div className={styles.heroEmoji}>🌿</div>
        <h1 className={styles.heroTitle}>רגבה Events</h1>
        <p className={styles.heroSubtitle}>
          כל האירועים, הפעילויות והחגיגות של המושב שלנו — במקום אחד
        </p>
        <div className={styles.heroCtas}>
          <AppButton onClick={onViewEvents} size="lg" fullWidth icon="📅">
            לצפייה באירועים
          </AppButton>
          {totalCount > 0 && (
            <AppButton
              onClick={onViewMyEvents}
              size="lg"
              fullWidth
              variant="ghost"
              icon="👤"
            >
              האירועים שלי ({totalCount})
            </AppButton>
          )}
        </div>
      </div>

      <div className={styles.features}>
        {[
          { icon: '📋', label: 'הירשם לאירועים' },
          { icon: '🤝', label: 'התנדב לעזור' },
          { icon: '📆', label: 'עקוב אחרי הפעילויות' },
        ].map((f) => (
          <div key={f.label} className={styles.feature}>
            <span className={styles.featureIcon}>{f.icon}</span>
            <span className={styles.featureLabel}>{f.label}</span>
          </div>
        ))}
      </div>

      {totalCount > 0 && (
        <div className={styles.statsRow}>
          {registrations.size > 0 && (
            <button className={styles.statCard} onClick={onViewMyEvents}>
              <span className={styles.statNum}>{registrations.size}</span>
              <span className={styles.statLabel}>אירועים רשומים</span>
            </button>
          )}
          {volunteerings.size > 0 && (
            <button
              className={`${styles.statCard} ${styles.statCardVolunteer}`}
              onClick={onViewMyEvents}
            >
              <span className={styles.statNum}>{volunteerings.size}</span>
              <span className={styles.statLabel}>התנדבויות</span>
            </button>
          )}
        </div>
      )}

      <div className={styles.footer}>
        <span>🏘️</span> מושב רגבה — קהילה, שיתוף, חיבור
      </div>
    </div>
  );
}
