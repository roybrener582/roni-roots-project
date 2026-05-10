import styles from './EventsList.module.css';
import AppHeader from './AppHeader';
import EventCard from './EventCard';

export default function EventsList({
  events,
  onBack,
  onOpenEvent,
  onViewMyEvents,
  registrations,
  volunteerings,
  toggleRegistration,
  toggleVolunteering,
}) {
  const myCount = registrations.size + volunteerings.size;

  return (
    <div className={styles.screen}>
      <AppHeader
        title="אירועים קרובים"
        onBack={onBack}
        onMyEvents={onViewMyEvents}
        myEventsCount={myCount}
      />
      <div className={styles.content}>
        <p className={styles.subtitle}>בחרו אירוע — הירשמו או התנדבו לעזור 🙌</p>
        <div className={styles.grid}>
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onOpenEvent={onOpenEvent}
              onRegister={toggleRegistration}
              onVolunteer={toggleVolunteering}
              isRegistered={registrations.has(event.id)}
              isVolunteering={volunteerings.has(event.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
