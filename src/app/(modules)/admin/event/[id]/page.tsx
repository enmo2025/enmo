import { notFound } from 'next/navigation';
import React from 'react';
import EditEvent from '~/components/pages/Admin/EditEvent/EditEvent';
import { getEventById } from '~/services/clientService/event/event.service';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const event = await getEventById(id);

  if (!event) return notFound();

  return <EditEvent event={event} />;
}
