'use client';

import { useEffect, useState } from 'react';
import EventList from '~/components/shared/event-list';
import { Pagination } from '~/components/ui/pagination';
import { IEvent } from '~/types';

export default function EventsPage({ eventList = [] }: { eventList: IEvent[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsRendered, setItemsRendered] = useState<IEvent[]>([]);

  const itemsPerPage = 12;
  const totalPage = Math.ceil(eventList.length / itemsPerPage);

  useEffect(() => {
    setItemsRendered(eventList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
  }, [currentPage, eventList, itemsPerPage]);

  return (
    <div className="mx-auto flex max-w-300 flex-col gap-10 px-5 pt-15 md:gap-15 md:px-10 lg:gap-10">
      <span className="text-headline-lg font-bold text-red-700">くらしの窓口リスト</span>
      <EventList eventList={itemsRendered} />
      <div className="flex justify-center pb-10">
        {totalPage > 1 && (
          <Pagination
            totalItems={eventList.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
