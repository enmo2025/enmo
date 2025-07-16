import React from 'react';
import ListEvent from '~/components/pages/Admin/ListEvent/ListEvent';
import { getEvents } from '~/services/serverService/event/event.service';

export default async function Page() {
  const events = await getEvents();

  return <ListEvent events={events} />;
}
