import { getEvents } from "~/components/pages/Events/events.service";
import EventsPage from "~/components/pages/Events/EventsPage";

export default async function pages() {
    const eventList = await getEvents();
    return (
        <EventsPage eventList={eventList} />
    );
}
