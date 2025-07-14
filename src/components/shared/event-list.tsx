import EventCard from "./event-card";
import { EventCardProps } from "./event-card";

export interface EventListProps {
    eventList: EventCardProps[];
}

export default function EventList({ eventList = [] }: EventListProps) {
    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                {eventList.map((event, index) => (
                    <EventCard key={index} {...event} />
                ))}
            </div>
        </div>
    );
}
