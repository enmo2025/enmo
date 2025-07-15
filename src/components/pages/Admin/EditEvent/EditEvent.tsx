'use client';

import React from 'react';
import EventForm from '../EventForm/EventForm';
import { IEvent } from '~/types';

export default function EditEvent({ event }: { event: IEvent }) {
  return <EventForm event={event} />;
}
