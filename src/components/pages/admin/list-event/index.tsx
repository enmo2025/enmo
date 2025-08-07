/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useMemo, useState } from 'react';
import { IEvent } from '~/types';
import { useRouter } from 'next/navigation';
import { Button } from '~/components/ui/button';
import MoreVerticalIcon from '~/components/shared/icons/more-vertical';
import AdminSubMenu from '~/components/shared/admin-sub-menu';
import ConfirmModal from '~/components/shared/confirm-modal';
import DynamicTable from '~/components/shared/dynamic-table';
import { toast } from '~/hooks/use-toast';
import { useDeleteEvent } from '~/services/clientService/event/event.api';
import { useGetEvents } from '~/services/clientService/event/event.api';
import { PATH } from '~/constants/routes';
import { useClickOutside } from '~/components/shared/use-click-outside';
import TruncatedText from '~/components/shared/truncated-text';

const PAGE_SIZE = 10;

export default function ListEvent() {
  const router = useRouter();
  const ref = useClickOutside<HTMLDivElement>((e) => {
    setOpenMenuId(null);
  });
  const [page, setPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const { data, isLoading } = useGetEvents(page, PAGE_SIZE);
  const { mutate: deleteEvent, isPending: isDeleting } = useDeleteEvent(() => {
    toast({
      title: '削除しました',
      description: 'イベントを削除しました',
    });
  });
  const handleEdit = (event: IEvent) => {
    router.push(PATH.ADMIN.EDIT_EVENT(event.id));
  };
  const handleDelete = async (id: string) => {
    deleteEvent(id);
  };

  const columns = useMemo(
    () => [
      {
        header: '番号順',
        accessorKey: 'index',
        cell: ({ row }: any) => <div>{row.index + 1}</div>,
        size: 80,
      },
      {
        header: 'プロジェクト名',
        accessorKey: 'title',
        cell: ({ row }: any) => (
          <div className="flex items-center gap-2">
            <img src={row.original.eventBanner} alt="event" className="h-12 w-16 rounded object-cover" />
            <span className="line-clamp-1 text-ellipsis whitespace-nowrap text-sm font-bold">{row.original.title}</span>
          </div>
        ),
        size: 200,
      },
      {
        header: '説明',
        accessorKey: 'description',
        cell: ({ row }: any) => <TruncatedText>{row.original.description}</TruncatedText>,
        size: 200,
      },
      {
        header: '参加者数',
        accessorKey: 'participantFee',
        cell: ({ row }: any) => <div>{row.original.participantFee}</div>,
        size: 100,
      },
      {
        header: '日付',
        accessorKey: 'date',
        cell: ({ row }: any) => (
          <div>
            {row.original.date
              ? new Date(row.original.date).toISOString().slice(0, 10).replace(/-/g, '/')
              : '2025/02/25'}
          </div>
        ),
        size: 120,
      },
      {
        header: '',
        accessorKey: 'actions',
        cell: ({ row }: any) => (
          <div className="relative flex justify-end">
            <Button
              variant="ghost"
              typeStyle="pill"
              onClick={(e) => {
                e.stopPropagation();
                if (openMenuId === row.original.id) {
                  setOpenMenuId(null);
                } else {
                  setOpenMenuId(row.original.id);
                }
              }}
            >
              <MoreVerticalIcon size={18} />
            </Button>
            {openMenuId === row.original.id && (
              <div className="absolute right-0 top-full z-10 mt-2 rounded bg-white shadow-lg" ref={ref}>
                <AdminSubMenu
                  item={[
                    {
                      title: '編集',
                      onClick: () => {
                        handleEdit(row.original);
                        setOpenMenuId(null);
                      },
                      className: 'text-yellow-900',
                    },
                    {
                      title: '削除',
                      onClick: () => {
                        setConfirmDeleteId(row.original.id);
                        setOpenMenuId(null);
                      },
                      className: 'text-warning',
                    },
                  ]}
                />
              </div>
            )}
          </div>
        ),
        size: 80,
      },
    ],
    [openMenuId]
  );

  const isFetching = isLoading || isDeleting;
  return (
    <div className="w-full">
      <DynamicTable
        isFetching={isFetching}
        data={data?.data || []}
        columns={columns}
        canPaginate={true}
        initialPageIndex={page}
        initialPageSize={PAGE_SIZE}
        rowCount={data?.pagination?.total ?? 0}
        onPageChange={setPage}
      />
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
