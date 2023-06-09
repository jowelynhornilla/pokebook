import cn from "classnames";
import { usePagination } from "hooks/usePagination";
import { FC } from "react";
import { PaginationProps } from "./Pagination.types";

const DOTS = "...";

export const Pagination: FC<PaginationProps> = (props) => {
  const {
    onPageChange,
    totalCount,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    pageSize,
  });

  if (currentPage === 0 || (paginationRange && paginationRange?.length < 2)) {
    return null;
  }

  const onNext = () => {
    currentPage != null && onPageChange && onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    currentPage != null && onPageChange && onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange?.[paginationRange?.length - 1];

  return (
    <ul className={cn("flex list-none w-full justify-center", className)}>
      <li
        className={cn("group cursor-pointer", {
          hidden: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="group-hover:-translate-y-1 transition ease-in-out">
          <img
            src="/chevron-up.svg"
            className="w-5 -rotate-90"
            alt="Previous page"
          />
        </div>
      </li>
      {paginationRange?.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return (
            <li
              key={pageNumber}
              className="pagination-item hover:bg-transparent cursor-default"
            >
              &#8230;
            </li>
          );
        }
        return (
          <li
            key={pageNumber}
            className={cn(
              "text-center flex justify-center box-border items-center rounded-full cursor-pointer px-3 py-1 hover:-translate-y-1 transition ease-in-out",
              {
                "bg-fire text-white": pageNumber === currentPage,
                "text-water": pageNumber !== currentPage,
              }
            )}
            onClick={() =>
              pageNumber != null &&
              onPageChange &&
              onPageChange(Number(pageNumber))
            }
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={cn("group cursor-pointer", {
          hidden: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="group-hover:-translate-y-1 transition ease-in-out">
          <img
            src="/chevron-up.svg"
            className="w-5 rotate-90"
            alt="Previous page"
          />
        </div>
      </li>
    </ul>
  );
};
