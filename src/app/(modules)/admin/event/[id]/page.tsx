import React from 'react';
import EditEvent from '~/components/pages/Admin/EditEvent/EditEvent';
import { apiClient } from '~/services/clientService';
import { IEvent } from '~/types';

export default async function Page({ params }: { params: { id: string } }) {
  const { event } = await apiClient.get<{ event: IEvent }>(`/event/${params.id}`);
  return <EditEvent event={event} />;
}
