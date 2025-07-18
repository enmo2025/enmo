'use client';

import React from 'react';
import EventForm from '../event-form';
import { useGetEvent } from '~/services/clientService/event/event.api';
import NoDataPlaceholder from '~/components/shared/indicator/no-data-placeholder';
import LoadingOverlay from '~/components/shared/indicator/loading-overlay';

export default function EditEvent({ id }: { id: string }) {
  const { data, isLoading } = useGetEvent(id);
  const event = data?.data;
  if (isLoading) return <LoadingOverlay />;
  if (!event) return <NoDataPlaceholder />;
  return <EventForm event={event} />;
}
