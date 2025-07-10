import EventCard from "./event-card";
import { EventCardProps } from "./event-card";
import { cn } from "~/lib/utils";

interface EventListProps {
    className?: string;
    eventList: EventCardProps[];
}

export default function EventList({ className, eventList = [] }: EventListProps) {
    return (
        <div className={cn("flex flex-col", className)}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                {eventList.map((event, index) => (
                    <EventCard key={index} {...event} />
                ))}
            </div>
        </div>
    );
}
