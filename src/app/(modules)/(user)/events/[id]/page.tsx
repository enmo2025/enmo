import EventDetailPage from '~/components/pages/event/even-detail';
import NoDataPlaceholder from '~/components/shared/indicator/no-data-placeholder';
import { getEvent } from '~/services/clientService/event/event.api';

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await getEvent(id);
  const eventDetail = data.data;
  return {
    title: eventDetail.title,
    description: eventDetail.content,
    openGraph: {
      title: eventDetail.title,
      description: eventDetail.content,
      images: [eventDetail.eventBanner],
    },
    twitter: {
      title: eventDetail.title,
      description: eventDetail.content,
      images: [eventDetail.eventBanner],
    },
  };
};

export default async function Pages({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getEvent(id);
  const eventDetail = data.data;
  if (!eventDetail) return <NoDataPlaceholder />;
  return <EventDetailPage eventDetail={eventDetail} />;
}
