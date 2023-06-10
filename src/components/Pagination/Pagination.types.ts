export interface PaginationProps {
  onPageChange?: (page?: number) => void;
  totalCount?: number;
  siblingCount?: number;
  currentPage?: number;
  pageSize?: number;
  className?: string;
  dataElementName?: string;
}
