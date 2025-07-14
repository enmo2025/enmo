'use client';

import { useEffect, useState } from 'react';
import EventList, { EventListProps } from '~/components/shared/event-list';
import { Pagination } from '~/components/ui/pagination';

export default function EventsPage({ eventList = [] }: { eventList: EventListProps['eventList'] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsRendered, setItemsRendered] = useState<EventListProps['eventList']>([]);

  const itemsPerPage = 12;

  useEffect(() => {
    setItemsRendered(eventList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
  }, [currentPage, eventList, itemsPerPage]);

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-5 pt-[60px] md:gap-[60px] md:px-10 lg:gap-10">
      <span className="text-headline-lg font-bold text-red-700">くらしの窓口リスト</span>
      <EventList eventList={itemsRendered} />
      <div className="flex justify-center pb-10">
        <Pagination
          totalItems={eventList.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
