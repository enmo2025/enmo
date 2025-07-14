'use client';

import { notFound, useParams } from 'next/navigation';
import EventDetailPage from '~/components/pages/Events/EventDetail/EventDetailPage';
import { getEventById } from '~/components/pages/Events/EventDetail/eventDetail.service';

export default function Pages() {
  const params = useParams();
  const id = params.id as string;
  const event = getEventById(id);

  if (!event) {
    return notFound();
  }

  return <EventDetailPage event={event} />;
}
