import EventDetailPage from '~/components/pages/event/even-detail';
import NoDataPlaceholder from '~/components/shared/indicator/no-data-placeholder';
import { getEvent } from '~/services/clientService/event/event.api';

export default async function Pages({ params }: { params: { id: string } }) {
  const data = await getEvent(params.id);
  const eventDetail = data.data;
  if (!eventDetail) return <NoDataPlaceholder />;
  return <EventDetailPage eventDetail={eventDetail} />;
}
