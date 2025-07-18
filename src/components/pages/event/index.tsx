'use client';

import { useState } from 'react';
import EventList from '~/components/shared/event-list';
import LoadingOverlay from '~/components/shared/indicator/loading-overlay';
import { Pagination } from '~/components/ui/pagination';
import { useGetEvents } from '~/services/clientService/event/event.api';

const PAGE_SIZE = 12;

export default function EventsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetEvents(currentPage, PAGE_SIZE);
  const eventList = data?.data ?? [];
  const totalPage = Math.ceil(data?.pagination?.total ?? 0 / PAGE_SIZE);

  return (
    <div>
      <div className="mx-auto flex max-w-300 flex-col gap-10 px-5 pt-15 md:gap-15 md:px-10 lg:gap-10">
        <span className="text-headline-lg font-bold text-red-700">くらしの窓口リスト</span>
        <EventList eventList={eventList} />
        <div className="flex justify-center pb-10">
          {totalPage > 1 && (
            <Pagination
              totalItems={eventList.length}
              itemsPerPage={PAGE_SIZE}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
      {isLoading && <LoadingOverlay />}
    </div>
  );
}
