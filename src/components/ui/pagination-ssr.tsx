import * as React from 'react';
import Link from 'next/link';
import { Button } from '~/components/ui/button';

export interface PaginationSSRProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  pageBasePath?: string; 
}

export function PaginationSSR({
  totalItems,
  itemsPerPage,
  currentPage,
  pageBasePath,
}: PaginationSSRProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages < 2) return null;

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const buildHref = (pageNum: number) => `${pageBasePath}?page=${pageNum}`;

  return (
    <div className="flex items-center gap-2">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link href={buildHref(prevPage)}>
          <Button variant="outline" size="lg">
            前を表示
          </Button>
        </Link>
      ) : (
        <Button variant="outline" size="lg" disabled>
          前を表示
        </Button>
      )}

      {/* Current Page Info */}
      <div className="min-h-10 min-w-[120px] flex items-center justify-center text-center gap-[10px] bg-brown-100 text-body-lg font-bold rounded-lg">
        {currentPage}ページ
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link href={buildHref(nextPage)}>
          <Button variant="outline" size="lg">
            次を表示
          </Button>
        </Link>
      ) : (
        <Button variant="outline" size="lg" disabled>
          次を表示
        </Button>
      )}
    </div>
  );
}
