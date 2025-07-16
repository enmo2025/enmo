import { notFound } from 'next/navigation';
import EventsPage from '~/components/pages/Events/EventsPage';
import { getEvents } from '~/services/clientService/event/event.service';

export default async function pages() {
  const events = await getEvents();

  if (!events) return notFound();

  return <EventsPage eventList={events} />;
}
