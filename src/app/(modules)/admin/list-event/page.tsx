import React from 'react';
import ListEvent from '~/components/pages/Admin/ListEvent/ListEvent';
import { apiClient } from '~/services/clientService';
import { IEvent } from '~/types';

export default async function Page() {
  const { events } = await apiClient.get<{ events: IEvent[] }>('/event');

  return <ListEvent events={events} />;
}
