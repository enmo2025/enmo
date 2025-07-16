'use client';

import React, { useState } from 'react';
import { IEvent } from '~/types';
import AdminSubMenu from '~/components/shared/admin-sub-menu';
import MoreVerticalIcon from '~/components/shared/icons/more-vertical';
import { Button } from '~/components/ui/button';
import { apiClient } from '~/services/clientService';
import { useRouter } from 'next/navigation';

export default function ListEvent({ events }: { events: IEvent[] }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = async (event: IEvent) => {
    router.push(`/admin/event/${event.id}`);
  };
  const handleDelete = async (event: IEvent) => {
    await apiClient.delete(`/events/${event.id}`);
    router.refresh();
  };
  return (
    <div className="flex h-[calc(100vh-80px)] w-full flex-col overflow-x-auto md:h-[calc(100vh-150px)] md:overflow-visible">
      <div className="min-w-[900px] md:min-w-0">
        <div className="border-b border-[#E5E5E5]">
          <div className="grid grid-cols-12 gap-2 py-2 text-sm font-semibold text-[#8C8C8C]">
            <div className="col-span-1">番号順</div>
            <div className="col-span-3">プロジェクト名</div>
            <div className="col-span-3">説明</div>
            <div className="col-span-2">参加者数</div>
            <div className="col-span-2">日付</div>
            <div className="col-span-1"></div>
          </div>
        </div>
        <div>
          {events.map((event, index) => (
            <div
              key={event.id}
              className="grid grid-cols-12 items-center gap-2 border-b border-[#F5F5F5] py-3 text-sm text-[#3B2F2F]"
            >
              <div className="col-span-1">{index + 1}</div>
              <div className="col-span-3 flex items-center gap-2">
                <img
                  src={event.eventBanner || '/event-banner.png'}
                  alt="event"
                  className="h-12 w-16 rounded object-cover"
                />
                <span className="text-sm font-bold">{event.title}</span>
              </div>
              <div className="col-span-3">{event.description}</div>
              <div className="col-span-2 text-center">{event.participantFee || 120}</div>
              <div className="col-span-2">
                {event.date ? new Date(event.date).toISOString().slice(0, 10).replace(/-/g, '/') : '2025/02/25'}
              </div>
              <div className="relative col-span-1">
                <Button variant="ghost" typeStyle="pill" className="p-2" onClick={() => setIsOpen(!isOpen)}>
                  <MoreVerticalIcon size={18} />
                </Button>
                <div className={`absolute right-0 top-10 ${isOpen ? 'block' : 'hidden'}`}>
                  <AdminSubMenu
                    item={[
                      { title: '編集', onClick: () => handleEdit(event), className: 'text-yellow-900' },
                      { title: '削除', onClick: () => handleDelete(event), className: 'text-warning' },
                    ]}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
