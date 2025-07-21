'use client';

import Link from 'next/link';
import EventList from '~/components/shared/event-list';
import NoDataPlaceholder from '~/components/shared/indicator/no-data-placeholder';
import { Button } from '~/components/ui/button';
import { PaginationSSR } from '~/components/ui/pagination-ssr';
import { EventDetail } from '~/services/clientService/event/event.interface';

export default function EventsPage({
  eventList,
  totalPage,
  currentPage,
  pageSize,
}: {
  eventList: EventDetail[];
  totalPage: number;
  currentPage: number;
  pageSize: number;
}) {
  if (eventList.length === 0) return <NoDataPlaceholder />;

  return (
    <div>
      <div className="mx-auto flex max-w-300 flex-col gap-10 px-5 pt-15 md:gap-15 md:px-10 lg:gap-10">
        <span className="text-headline-lg font-bold text-red-700">くらしの窓口リスト</span>
        <EventList eventList={eventList} />
        <div className="flex justify-center pb-10">
          {totalPage > 1 && (
            <PaginationSSR
              totalItems={totalPage * pageSize}
              itemsPerPage={pageSize}
              currentPage={currentPage}
              renderPageLink={(pageNum) => (
                <Link href={`/events?page=${pageNum}`}>
                  <Button variant="outline" size="lg">
                    {pageNum < currentPage ? '前を表示' : '次を表示'}
                  </Button>
                </Link>
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}
