import EventDetailPage from '~/components/pages/event/even-detail';
import NoDataPlaceholder from '~/components/shared/indicator/no-data-placeholder';
import { stripHtmlTags } from '~/lib/utils';
import { getEvent } from '~/services/clientService/event/event.api';

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await getEvent(id);
  const eventDetail = data.data;
  const description = stripHtmlTags(eventDetail.description);
  return {
    title: eventDetail.title,
    description: description,
    openGraph: {
      title: eventDetail.title,
      description: description,
      images: [eventDetail.eventBanner],
      type: 'website',
    },
    twitter: {
      title: eventDetail.title,
      description: description,
      images: [eventDetail.eventBanner],
      card: 'summary_large_image',
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
