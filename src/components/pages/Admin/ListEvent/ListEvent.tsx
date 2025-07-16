'use client';

import React, { useState, useRef } from 'react';
import { IEvent } from '~/types';
import AdminSubMenu from '~/components/shared/admin-sub-menu';
import MoreVerticalIcon from '~/components/shared/icons/more-vertical';
import { Button } from '~/components/ui/button';
import { apiClient } from '~/services/clientService';
import { useRouter } from 'next/navigation';
import ConfirmModal from '~/components/shared/confirm-modal';

export default function ListEvent({ events }: { events: IEvent[] }) {
  const router = useRouter();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleEdit = async (event: IEvent) => {
    router.push(`/admin/event/${event.id}`);
  };
  const handleDelete = async (id: string) => {
    await apiClient.delete(`/event/${id}`);
    router.refresh();
  };

  React.useEffect(() => {
    const handleClick = () => setOpenMenuId(null);
    if (openMenuId !== null) {
      window.addEventListener('click', handleClick);
      return () => window.removeEventListener('click', handleClick);
    }
  }, [openMenuId]);

  return (
    <div className="flex h-[calc(100vh-80px)] w-full flex-col overflow-x-auto md:h-[calc(100vh-150px)] md:overflow-visible">
      <div className="min-w-[900px] gap-5 md:min-w-0">
        <div className="border-b border-t border-yellow-500">
          <div className="grid grid-cols-12 gap-3 py-3 text-sm font-semibold text-brown-900">
            <div className="col-span-1">番号順</div>
            <div className="col-span-3">プロジェクト名</div>
            <div className="col-span-3">説明</div>
            <div className="col-span-2">参加者数</div>
            <div className="col-span-2">日付</div>
            <div className="col-span-1"></div>
          </div>
        </div>
        <div className="flex flex-col gap-1 bg-brown-50">
          {events.map((event, index) => (
            <div key={event.id} className="grid grid-cols-12 items-center gap-3 py-3 text-sm text-brown-900">
              <div className="col-span-1 pl-5">{index + 1}</div>
              <div className="col-span-3 flex items-center gap-2">
                <img src={event.eventBanner} alt="event" className="h-12 w-16 rounded object-cover" />
                <span className="line-clamp-1 text-ellipsis whitespace-nowrap text-sm font-bold">{event.title}</span>
              </div>
              <div className="col-span-3 line-clamp-1 text-ellipsis whitespace-nowrap">{event.description}</div>
              <div className="col-span-2">{event.participantFee}</div>
              <div className="col-span-2">
                {event.date ? new Date(event.date).toISOString().slice(0, 10).replace(/-/g, '/') : '2025/02/25'}
              </div>
              <div className="relative col-span-1 flex justify-end">
                <Button
                  variant="ghost"
                  typeStyle="pill"
                  ref={(el) => {
                    buttonRefs.current[event.id] = el;
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (openMenuId === event.id) {
                      setOpenMenuId(null);
                      setMenuPosition(null);
                    } else {
                      const rect = buttonRefs.current[event.id]?.getBoundingClientRect();
                      if (rect) {
                        setMenuPosition({ top: rect.bottom + window.scrollY, left: rect.right - 110 });
                      }
                      setOpenMenuId(event.id);
                    }
                  }}
                >
                  <MoreVerticalIcon size={18} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {openMenuId && menuPosition && (
        <div
          className="fixed z-50 rounded bg-white shadow-lg"
          style={{ top: menuPosition.top, left: menuPosition.left }}
        >
          <AdminSubMenu
            item={[
              {
                title: '編集',
                onClick: () => {
                  handleEdit(events.find((e) => e.id === openMenuId)!);
                  setOpenMenuId(null);
                  setMenuPosition(null);
                },
                className: 'text-yellow-900',
              },
              {
                title: '削除',
                onClick: () => {
                  setConfirmDeleteId(openMenuId);
                  setOpenMenuId(null);
                  setMenuPosition(null);
                },
                className: 'text-warning',
              },
            ]}
          />
        </div>
      )}
      {confirmDeleteId && (
        <ConfirmModal
          open={!!confirmDeleteId}
          title="くらしの窓口を削除しますか？"
          description="この操作は取り消せません。よろしいですか？"
          onCancel={() => setConfirmDeleteId(null)}
          onConfirm={async () => {
            await handleDelete(confirmDeleteId);
            setConfirmDeleteId(null);
          }}
          confirmText="削除"
          cancelText="キャンセル"
        />
      )}
    </div>
  );
}
