import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

type DashboardResultsExamsPaginationProps = {
  totalPages: number;
  currentPage: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
};

export function DashboardResultsExamsPagination({
  totalPages,
  currentPage,
  goToPage,
  nextPage,
  prevPage,
}: DashboardResultsExamsPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-6 border-t border-white/10 pt-4">
      <Pagination className="justify-center sm:justify-center">
        <PaginationContent className="gap-1 sm:gap-2">
          <PaginationItem>
            <PaginationPrevious
              onClick={prevPage}
              className="text-[var(--color-text-secondary)] hover:bg-white/10 hover:text-white/85"
            />
          </PaginationItem>

          {pages.map(page => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => goToPage(page)}
                isActive={page === currentPage}
                className={cn(
                  'text-[var(--color-text-secondary)] hover:bg-white/10 hover:text-white/85 cursor-pointer rounded-full',
                  page === currentPage &&
                    'border-[color:var(--color-accent)] text-white'
                )}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {totalPages > 5 && <PaginationEllipsis />}

          <PaginationItem>
            <PaginationNext
              onClick={nextPage}
              className="text-[var(--color-text-secondary)] hover:bg-white/10 hover:text-white/85"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
