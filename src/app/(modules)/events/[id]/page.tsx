import { notFound } from 'next/navigation';
import EventDetailPage from '~/components/pages/Events/EventDetail/EventDetailPage';
import { getEventById } from '~/services/clientService/event/event.service';

export default async function Pages({ params }: { params: { id: string } }) {
  const { id } = params;
  const event = await getEventById(id);

  if (!event) return notFound();

  return <EventDetailPage event={event} />;
}
