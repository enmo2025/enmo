import EventDetailPage from '~/components/pages/event/even-detail';

export default async function Pages({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EventDetailPage id={id} />;
}
