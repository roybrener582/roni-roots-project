import styles from './MyEvents.module.css';
import AppHeader from './AppHeader';
import AppButton from './AppButton';

function EventRow({ event, onOpen, onRemove, type }) {
  return (
    <div
      className={`${styles.row} ${type === 'volunteering' ? styles.rowVolunteer : ''}`}
    >
      <span className={styles.rowEmoji}>{event.emoji}</span>
      <div className={styles.rowInfo} onClick={onOpen} role="button" tabIndex={0}>
        <div className={styles.rowName}>{event.name}</div>
        <div className={styles.rowMeta}>
          {event.dateDisplay} · {event.time}
        </div>
        <div className={styles.rowLocation}>📍 {event.location}</div>
      </div>
      <button
        className={styles.removeBtn}
        onClick={onRemove}
        title="הסר"
        aria-label="הסר אירוע"
      >
        ✕
      </button>
    </div>
  );
}

export default function MyEvents({
  events,
  onBack,
  onOpenEvent,
  registrations,
  volunteerings,
  toggleRegistration,
  toggleVolunteering,
}) {
  const myRegistrations = events.filter((e) => registrations.has(e.id));
  const myVolunteerings = events.filter((e) => volunteerings.has(e.id));
  const isEmpty = myRegistrations.length === 0 && myVolunteerings.length === 0;

  return (
    <div className={styles.screen}>
      <AppHeader title="האירועים שלי" onBack={onBack} />
      <div className={styles.content}>
        {isEmpty ? (
          <div className={styles.empty}>
            <span className={styles.emptyEmoji}>📭</span>
            <p className={styles.emptyTitle}>עדיין אין לך אירועים</p>
            <p className={styles.emptyText}>
              עבור לרשימת האירועים והירשם לאחד!
            </p>
            <AppButton onClick={onBack} variant="primary" icon="📅">
              לאירועים
            </AppButton>
          </div>
        ) : (
          <div className={styles.sections}>
            {myRegistrations.length > 0 && (
              <section>
                <h2 className={styles.sectionTitle}>
                  <span>📋</span>
                  נרשמתי להשתתף
                  <span className={styles.badge}>{myRegistrations.length}</span>
                </h2>
                <div className={styles.list}>
                  {myRegistrations.map((event) => (
                    <EventRow
                      key={event.id}
                      event={event}
                      onOpen={() => onOpenEvent(event)}
                      onRemove={() => toggleRegistration(event.id)}
                      type="registration"
                    />
                  ))}
                </div>
              </section>
            )}

            {myVolunteerings.length > 0 && (
              <section>
                <h2 className={styles.sectionTitle}>
                  <span>🤝</span>
                  הצעתי להתנדב
                  <span className={`${styles.badge} ${styles.badgeVolunteer}`}>
                    {myVolunteerings.length}
                  </span>
                </h2>
                <div className={styles.list}>
                  {myVolunteerings.map((event) => (
                    <EventRow
                      key={event.id}
                      event={event}
                      onOpen={() => onOpenEvent(event)}
                      onRemove={() => toggleVolunteering(event.id)}
                      type="volunteering"
                    />
                  ))}
                </div>
              </section>
            )}

            <p className={styles.hint}>לחץ על אירוע לפרטים מלאים · לחץ ✕ להסרה</p>
          </div>
        )}
      </div>
    </div>
  );
}
