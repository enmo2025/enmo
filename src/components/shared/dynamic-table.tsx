import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type Column,
  type ColumnDef,
  type FilterFn,
  type PaginationState,
  type Row,
  type SortingState,
  type AccessorKeyColumnDef,
} from '@tanstack/react-table';
import React, { useMemo, useState, useEffect } from 'react';
import LoadingOverlay from './indicator/loading-overlay';
import NoDataPlaceholder from './indicator/no-data-placeholder';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { cn } from '~/lib/utils';
import { Pagination } from '../ui/pagination';

export enum EDynamicTableVariant {
  Borderless = 'borderless',
  Bordered = 'bordered',
  RowBordered = 'row-bordered',
}

const tableClassNameMap = {
  [EDynamicTableVariant.Bordered]: {
    headerCell: 'border-x border-t py-4 text-sm text-quaternary',
    bodyCell: 'border-x text-sm',
    headerRow: 'border-b',
    table: 'border-b',
  },
  [EDynamicTableVariant.Borderless]: {
    headerCell: 'py-4 text-sm text-quaternary',
    bodyCell: 'text-sm',
    headerRow: 'border-b',
    table: '',
  },
  [EDynamicTableVariant.RowBordered]: {
    headerCell: 'py-4 text-sm text-quaternary border',
    bodyCell: 'text-sm',
    headerRow: 'border-b',
    table: 'border',
  },
};

interface TableProps<TData, TFilter> {
  data: TData[];
  uniqueRowId?: (row: TData) => string | undefined | null;
  columns: ColumnDef<TData>[];
  pageSizeOptions?: number[];
  isShowDefaultPagePositionIndicator?: boolean;
  initialPageIndex?: number;
  initialPageSize?: number;
  isFetching?: boolean;
  canPaginate?: boolean;
  rowCount?: number;
  controlledSorting?: SortingState;
  setControlledSorting?: React.Dispatch<React.SetStateAction<SortingState>>;
  controlledGlobalFilter?: TFilter;
  setControlledGlobalFilter?: React.Dispatch<React.SetStateAction<TFilter>>;
  globalFilterFn?: FilterFn<TData>;
  initialSelectedRowIds?: number[] | string[];
  onRowSelectionChange?: (selectedRows: TData[]) => void;
  tableClassName?: string;
  containerClassName?: string;
  variant?: EDynamicTableVariant;
  renderRowPositionIndicator?: (params: { rowsPerPage: number; totalRows: number }) => React.ReactElement;
  renderSubComponent?: (props: { row: Row<TData> }) => React.ReactElement;
  getRowCanExpand?: (row: Row<TData>) => boolean;
  renderNoDataComponent?: () => React.ReactNode;
  rowSpanColumns?: string[];
  renderFetchingComponent?: () => React.ReactNode;
  onPageChange?: (page: number) => void;
}

function DynamicTable<TData, TFilter>({
  data,
  uniqueRowId,
  columns,
  initialPageIndex = 1,
  initialPageSize = 10,
  isFetching,
  canPaginate = true,
  globalFilterFn,
  controlledSorting,
  setControlledSorting,
  controlledGlobalFilter,
  setControlledGlobalFilter,
  tableClassName,
  containerClassName,
  variant = EDynamicTableVariant.Borderless,
  renderSubComponent,
  getRowCanExpand,
  renderNoDataComponent,
  rowSpanColumns = [],
  renderFetchingComponent,
  onPageChange,
  rowCount,
}: TableProps<TData, TFilter>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: initialPageIndex - 1,
    pageSize: initialPageSize,
  });

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: initialPageIndex - 1,
    }));
  }, [initialPageIndex]);

  const hasControlledSorting = !!(controlledSorting && setControlledSorting);

  const columnsWithDefaultSortingDisabled = useMemo(
    () =>
      columns.map((column) => ({
        ...column,
        enableSorting: column.enableSorting ?? false,
      })),
    [columns]
  );

  const sortingOptions = !hasControlledSorting
    ? {
        getSortedRowModel: getSortedRowModel(),
      }
    : {
        state: {
          sorting: controlledSorting,
        },
        manualSorting: true,
        onSortingChange: setControlledSorting,
      };

  const paginationOptions = useMemo(() => {
    if (!canPaginate) return {};

    return {
      state: {
        pagination,
      },
      manualPagination: true, // Enable manual pagination since we're using server-side
      pageCount: Math.ceil((rowCount ?? 0) / pagination.pageSize),
      onPaginationChange: setPagination,
    };
  }, [canPaginate, pagination, rowCount]);

  const filterOptions = !(controlledGlobalFilter && setControlledGlobalFilter)
    ? {}
    : {
        state: {
          globalFilter: controlledGlobalFilter,
        },
        onGlobalFilterChange: setControlledGlobalFilter,
      };

  const table = useReactTable<TData>({
    data,
    columns: columnsWithDefaultSortingDisabled,
    ...(uniqueRowId ? { getRowId: (row: TData, index: number) => uniqueRowId(row) ?? index.toString() } : {}),
    getRowCanExpand,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...sortingOptions,
    ...paginationOptions,
    ...filterOptions,
    ...(globalFilterFn ? { globalFilterFn } : {}),
    state: {
      ...(sortingOptions.state ?? {}),
      ...(paginationOptions.state ?? {}),
      ...(filterOptions.state ?? {}),
    },
  });

  const columnSizeMap = useMemo(() => {
    const map = new Map();
    columns.forEach((col) => {
      const key = col.id || (col as AccessorKeyColumnDef<TData, keyof TData>).accessorKey || col.header;
      if (col.size !== undefined) {
        map.set(key, col.size);
      }
    });
    return map;
  }, [columns]);

  const getColumnWidth = (column: Column<TData>) => {
    const columnSize = columnSizeMap.get(column.id);
    return columnSize ? { maxWidth: `${columnSize}px` } : {};
  };

  const renderTableBody = () => {
    if (isFetching && renderFetchingComponent) {
      return renderFetchingComponent();
    }

    if (table.getRowModel().rows.length === 0) {
      return (
        <tr>
          <td colSpan={table.getAllColumns().length} className={cn(tableClassNameMap[variant].bodyCell)}>
            {renderNoDataComponent?.() || isFetching ? renderNoDataComponent?.() : <NoDataPlaceholder />}
          </td>
        </tr>
      );
    }

    return table.getRowModel().rows.map((row: Row<TData>, index: number) => {
      const cells = row.getVisibleCells();
      return (
        <React.Fragment key={row.id}>
          <TableRow className="border-2 border-l-0 border-r-0 border-t-0 border-white">
            {cells.map((cell, cellIndex) => {
              const { column } = cell;
              const isRowSpanningColumn = rowSpanColumns.includes(column.id);
              const cellClassNames = cn(
                cellIndex === 0 && 'pl-6',
                cellIndex === cells.length - 1 && 'pr-6',
                tableClassNameMap[variant].bodyCell
              );

              if (isRowSpanningColumn) {
                if (index > 0) return null;
                return (
                  <TableCell
                    style={getColumnWidth(cell.column)}
                    key={cell.id}
                    rowSpan={table.getRowModel().rows.length}
                    className={cellClassNames}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              } else {
                return (
                  <TableCell style={getColumnWidth(cell.column)} key={cell.id} className={cellClassNames}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              }
            })}
          </TableRow>
          {renderSubComponent && row.getIsExpanded() && (
            <tr>
              <td colSpan={row.getVisibleCells().length} className={tableClassNameMap[variant].bodyCell}>
                {renderSubComponent({ row })}
              </td>
            </tr>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="w-full">
      <div className={cn('relative w-full overflow-x-auto', containerClassName)}>
        <Table className={cn('table border-t border-red-600', tableClassNameMap[variant].table, tableClassName)}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className={cn('mb-2 border-b border-red-600', tableClassNameMap[variant].headerRow)}
              >
                {headerGroup.headers.map((header, index) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={getColumnWidth(header.column)}
                    className={cn(
                      'overflow-hidden text-ellipsis whitespace-nowrap',
                      index === 0 && 'pl-6',
                      index === headerGroup.headers.length - 1 && 'pr-6',
                      tableClassNameMap[variant].headerCell
                    )}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        onClick={header.column.getToggleSortingHandler()}
                        className={cn(
                          header.column.getCanSort() && 'flex cursor-pointer select-none items-center gap-2'
                        )}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-brown-100 text-base">{renderTableBody()}</TableBody>
        </Table>
        {canPaginate && (
          <div className="mt-10 flex w-full justify-center">
            <Pagination
              totalItems={rowCount ?? 0}
              itemsPerPage={pagination.pageSize}
              currentPage={pagination.pageIndex + 1}
              onPageChange={(page) => {
                setPagination((prev) => ({ ...prev, pageIndex: page - 1 }));
                onPageChange?.(page);
              }}
            />
          </div>
        )}
        {isFetching && !renderFetchingComponent && <LoadingOverlay />}
      </div>
    </div>
  );
}

export default DynamicTable;
