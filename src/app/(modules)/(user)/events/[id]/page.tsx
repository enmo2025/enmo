import EventDetailPage from '~/components/pages/event/even-detail';
import NoDataPlaceholder from '~/components/shared/indicator/no-data-placeholder';
import { getEvent } from '~/services/clientService/event/event.api';

export default async function Pages({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getEvent(id);
  const eventDetail = data.data;
  if (!eventDetail) return <NoDataPlaceholder />;
  return <EventDetailPage eventDetail={eventDetail} />;
}
