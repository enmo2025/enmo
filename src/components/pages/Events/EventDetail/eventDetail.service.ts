import { events } from '../events.service';

const getEventById = (id: string) => {
  const event = events.find((event) => event.id === id);
  return event;
};

export { getEventById };
