import EventCard from './event-card';
import { EventCardProps } from './event-card';
import { IEvent } from '~/types';

export interface EventListProps {
  eventList: EventCardProps[];
}

export default function EventList({ eventList = [] }: { eventList: IEvent[] }) {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
        {eventList.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
    </div>
  );
}
