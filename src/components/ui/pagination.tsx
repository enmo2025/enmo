import * as React from "react";
import { Button } from "~/components/ui/button";



export interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}


const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({ totalItems, itemsPerPage, currentPage, onPageChange, ...props }, ref) => {

    const totalPages = Math.ceil(totalItems / itemsPerPage);


    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="lg" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          前を表示
        </Button>
        <div className="min-h-10 min-w-[120px] flex items-center justify-center text-center gap-[10px] bg-white text-body-lg font-bold rounded-lg">{currentPage}ページ</div>
        <Button variant="outline" size="lg" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          次を表示
        </Button>
      </div>
    );
  }
);
Pagination.displayName = 'Pagination';

export { Pagination };
