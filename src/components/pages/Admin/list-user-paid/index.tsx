'use client';

import React, { useMemo, useState } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { useGetPurchases } from '~/services/clientService/purchase/purchase.api';
import DynamicTable from '~/components/shared/dynamic-table';
import { PurchaseExtend } from '~/services/clientService/purchase/interface.api';
import { formatDate } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { LineIcon } from '~/components/shared/icons';
import { cn } from '~/lib/utils';

const PAGE_SIZE = 10;

export default function ListUserPaid() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetPurchases(page, PAGE_SIZE);

  const currentPage = data?.pagination?.page ?? page;

  const columns: ColumnDef<PurchaseExtend>[] = useMemo(
    () => [
      {
        header: '番号順',
        accessorKey: 'id',
        cell: ({ row }) => <div>{(currentPage - 1) * PAGE_SIZE + row.index + 1}</div>,
        size: 80,
      },
      {
        header: 'ユーザー名',
        accessorKey: 'user.fullName',
        cell: ({ row }) => <div>{row.original.user.fullName}</div>,
      },
      {
        header: '購入したプロジェクト名',
        accessorKey: 'event.title',
        cell: ({ row }) => <div>{row.original.event.title}</div>,
        size: 100,
      },
      {
        header: '購入日',
        accessorKey: 'createdAt',
        cell: ({ row }) => <div>{formatDate(row.original.createdAt)}</div>,
      },
      {
        header: '',
        accessorKey: 'sendLine',
        cell: ({ row }) => {
          // TODO: handle late
          const isSent = false;
          return (
            <Button
              leadingIcon={<LineIcon color={isSent ? 'white' : 'brown'} />}
              variant={isSent ? 'solid' : 'outline'}
              className={cn(isSent && 'bg-brown-700 text-white')}
            >
              LINEで連絡する
            </Button>
          );
        },
        size: 100,
      },
    ],
    [currentPage]
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <DynamicTable
      data={data?.data ?? []}
      columns={columns}
      isFetching={isLoading}
      canPaginate={true}
      initialPageIndex={currentPage}
      initialPageSize={PAGE_SIZE}
      rowCount={data?.pagination?.total ?? 0}
      onPageChange={handlePageChange}
    />
  );
}
