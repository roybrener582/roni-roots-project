import styles from './EventDetails.module.css';
import AppHeader from './AppHeader';
import AppButton from './AppButton';

export default function EventDetails({
  event,
  onBack,
  registrations,
  volunteerings,
  toggleRegistration,
  toggleVolunteering,
}) {
  const isRegistered = registrations.has(event.id);
  const isVolunteering = volunteerings.has(event.id);

  return (
    <div className={styles.screen}>
      <AppHeader title={event.name} onBack={onBack} />

      <div className={styles.content}>
        {/* Hero banner */}
        <div className={styles.hero} style={{ background: event.color }}>
          <div className={styles.heroEmoji}>{event.emoji}</div>
          <span className={styles.category}>{event.category}</span>
          <h1 className={styles.title}>{event.name}</h1>
        </div>

        <div className={styles.body}>
          {/* Quick-info grid */}
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>📅 תאריך</span>
              <span className={styles.infoValue}>{event.dateDisplay}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>⏰ שעה</span>
              <span className={styles.infoValue}>{event.time}</span>
            </div>
            <div className={`${styles.infoItem} ${styles.infoFull}`}>
              <span className={styles.infoLabel}>📍 מיקום</span>
              <span className={styles.infoValue}>{event.location}</span>
            </div>
          </div>

          {/* About */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>על האירוע</h2>
            <p className={styles.sectionText}>{event.description}</p>
          </div>

          {/* Who can join */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>👥 מי יכול להגיע?</h2>
            <p className={styles.sectionText}>{event.whoCanJoin}</p>
          </div>

          {/* Help needed */}
          <div className={`${styles.section} ${styles.helpSection}`}>
            <h2 className={styles.sectionTitle}>🤝 איך אפשר לעזור?</h2>
            <p className={styles.sectionText}>{event.helpNeeded}</p>
          </div>

          {/* Action buttons */}
          <div className={styles.actions}>
            <AppButton
              onClick={() => toggleRegistration(event.id)}
              variant={isRegistered ? 'active-primary' : 'primary'}
              size="lg"
              fullWidth
              icon={isRegistered ? '✓' : '📋'}
            >
              {isRegistered
                ? 'אני רשום/ה — לחץ לביטול'
                : 'אני רוצה להשתתף!'}
            </AppButton>
            <AppButton
              onClick={() => toggleVolunteering(event.id)}
              variant={isVolunteering ? 'active-secondary' : 'secondary'}
              size="lg"
              fullWidth
              icon={isVolunteering ? '✓' : '🤝'}
            >
              {isVolunteering
                ? 'אני מתנדב/ת — לחץ לביטול'
                : 'אני רוצה לעזור!'}
            </AppButton>
          </div>

          {/* Confirmation card */}
          {(isRegistered || isVolunteering) && (
            <div className={styles.confirmCard}>
              <span className={styles.confirmIcon}>🎉</span>
              <div>
                <div className={styles.confirmTitle}>כל הכבוד!</div>
                <div className={styles.confirmText}>
                  {isRegistered && isVolunteering
                    ? 'נרשמת לאירוע וגם הצעת להתנדב. תודה!'
                    : isRegistered
                    ? 'נרשמת לאירוע. נתראה שם!'
                    : 'הצעת להתנדב. תודה רבה על העזרה!'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
