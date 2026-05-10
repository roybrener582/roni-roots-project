import styles from './EventCard.module.css';
import AppButton from './AppButton';

export default function EventCard({
  event,
  onOpenEvent,
  onRegister,
  onVolunteer,
  isRegistered,
  isVolunteering,
}) {
  return (
    <article
      className={styles.card}
      style={{ '--accent': event.colorAccent, '--card-bg': event.color }}
    >
      {/* clickable top portion opens details */}
      <div
        className={styles.cardHeader}
        onClick={() => onOpenEvent(event)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onOpenEvent(event)}
      >
        <div className={styles.topRow}>
          <span className={styles.emoji}>{event.emoji}</span>
          <span className={styles.category}>{event.category}</span>
          {(isRegistered || isVolunteering) && (
            <span className={styles.statusPill}>
              {isRegistered && isVolunteering
                ? '✓ רשום ומתנדב'
                : isRegistered
                ? '✓ רשום'
                : '✓ מתנדב'}
            </span>
          )}
        </div>
        <h3 className={styles.name}>{event.name}</h3>
        <ul className={styles.meta}>
          <li>📅 {event.dateDisplay}</li>
          <li>⏰ {event.time}</li>
          <li>📍 {event.location}</li>
        </ul>
        <p className={styles.description}>{event.description}</p>
        <span className={styles.detailsHint}>לפרטים מלאים ›</span>
      </div>

      <div className={styles.actions}>
        <AppButton
          onClick={(e) => { e.stopPropagation(); onRegister(event.id); }}
          variant={isRegistered ? 'active-primary' : 'primary'}
          size="sm"
          fullWidth
          icon={isRegistered ? '✓' : ''}
        >
          {isRegistered ? 'רשום/ה לאירוע!' : 'אני רוצה להשתתף'}
        </AppButton>
        <AppButton
          onClick={(e) => { e.stopPropagation(); onVolunteer(event.id); }}
          variant={isVolunteering ? 'active-secondary' : 'secondary'}
          size="sm"
          fullWidth
          icon={isVolunteering ? '✓' : ''}
        >
          {isVolunteering ? 'מתנדב/ת לעזור!' : 'אני רוצה לעזור'}
        </AppButton>
      </div>
    </article>
  );
}
