// PaginationSSR.tsx
import * as React from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export interface PaginationSSRProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  renderPageLink: (pageNum: number) => React.ReactNode;
}

export function PaginationSSR({
  totalItems,
  itemsPerPage,
  currentPage,
  renderPageLink,
}: PaginationSSRProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages < 2) return null;

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <div className="flex items-center gap-2">
      {currentPage > 1 ? (
        renderPageLink(prevPage)
      ) : (
        <Button variant="outline" size="lg" disabled>
          前を表示
        </Button>
      )}

      <div className="min-h-10 min-w-[120px] flex items-center justify-center text-center gap-[10px] bg-brown-100 text-body-lg font-bold rounded-lg">
        {currentPage}ページ
      </div>

      {currentPage < totalPages ? (
        renderPageLink(nextPage)
      ) : (
        <Button variant="outline" size="lg" disabled>
          次を表示
        </Button>
      )}
    </div>
  );
}
