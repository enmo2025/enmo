import EventDetailPage from '~/components/pages/event/even-detail';
import NoDataPlaceholder from '~/components/shared/indicator/no-data-placeholder';
import { getEventById } from '~/services/serverService/event/event.service';
import { prisma } from '~/lib/server/db';

export async function generateStaticParams() {
  const events = await prisma?.event.findMany({
    select: { id: true },
  });

  return events?.map((event) => ({
    id: event.id,
  }));
}

export default async function Pages({ params }: { params: { id: string } }) {
  const { id } = await params;
  const data = await getEventById(id);
  if (!data) return <NoDataPlaceholder />;
  return <EventDetailPage eventDetail={data} />;
}
