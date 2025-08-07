import * as React from "react";
import { Button } from "~/components/ui/button";
import { useIsMobile } from "~/hooks/use-mobile";

export interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({ totalItems, itemsPerPage, currentPage, onPageChange, ...props }, ref) => {
    const isMobile = useIsMobile();
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
    const handlePrevious = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };

    const handleNext = () => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };
    if (totalPages < 1) return null;

    return (
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size={isMobile ? 'md' : 'lg'} 
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          前を表示
        </Button>
        <div className="min-h-10 min-w-[120px] flex items-center justify-center text-center gap-[10px] bg-brown-100 text-body-lg font-bold rounded-lg">
          {currentPage}ページ
        </div>
        <Button 
          variant="outline" 
          size={isMobile ? 'md' : 'lg'} 
          onClick={handleNext}
          disabled={currentPage >= totalPages}
        >
          次を表示
        </Button>
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';

export { Pagination };
