import { Metadata } from 'next';
import EventsPage from '~/components/pages/event';
import { getEventsPagination } from '~/services/serverService/event/event.service';

export const metadata: Metadata = {
  title: 'イベント',
  description: 'イベントページ',
  keywords: ['イベント', 'Events', 'Enmo'],
};

const PAGE_SIZE = 12;

export default async function pages({ searchParams }: { searchParams: { page: string } }) {
  const { page } = await searchParams;
  const pageNumber = Number(page) || 1;
  const data = await getEventsPagination(pageNumber, PAGE_SIZE);
  const eventList = data?.data ?? [];
  const totalItems = data?.pagination?.total ?? 0;
  const totalPage = Math.ceil(totalItems / PAGE_SIZE);

  return <EventsPage eventList={eventList} totalPage={totalPage} currentPage={pageNumber} pageSize={PAGE_SIZE} />;
}
