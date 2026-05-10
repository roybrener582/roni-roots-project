import { useState } from 'react';
import styles from './EventsApp.module.css';
import { events } from './data/events';
import HomeScreen from './components/HomeScreen';
import EventsList from './components/EventsList';
import EventDetails from './components/EventDetails';
import MyEvents from './components/MyEvents';

export default function EventsApp() {
  // Navigation stack — back always returns to the previous screen
  const [navStack, setNavStack] = useState(['home']);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // User state persists across screen changes
  const [registrations, setRegistrations] = useState(new Set());
  const [volunteerings, setVolunteerings] = useState(new Set());

  const screen = navStack[navStack.length - 1];

  const push = (nextScreen, event = null) => {
    if (event !== null) setSelectedEvent(event);
    setNavStack((prev) => [...prev, nextScreen]);
  };

  const pop = () => {
    setNavStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const toggleRegistration = (eventId) => {
    setRegistrations((prev) => {
      const next = new Set(prev);
      if (next.has(eventId)) next.delete(eventId);
      else next.add(eventId);
      return next;
    });
  };

  const toggleVolunteering = (eventId) => {
    setVolunteerings((prev) => {
      const next = new Set(prev);
      if (next.has(eventId)) next.delete(eventId);
      else next.add(eventId);
      return next;
    });
  };

  const sharedProps = {
    registrations,
    volunteerings,
    toggleRegistration,
    toggleVolunteering,
  };

  return (
    <div className={styles.app}>
      {screen === 'home' && (
        <HomeScreen
          onViewEvents={() => push('events')}
          onViewMyEvents={() => push('myEvents')}
          {...sharedProps}
        />
      )}

      {screen === 'events' && (
        <EventsList
          events={events}
          onBack={pop}
          onOpenEvent={(event) => push('details', event)}
          onViewMyEvents={() => push('myEvents')}
          {...sharedProps}
        />
      )}

      {screen === 'details' && selectedEvent && (
        <EventDetails
          event={selectedEvent}
          onBack={pop}
          {...sharedProps}
        />
      )}

      {screen === 'myEvents' && (
        <MyEvents
          events={events}
          onBack={pop}
          onOpenEvent={(event) => push('details', event)}
          {...sharedProps}
        />
      )}
    </div>
  );
}
