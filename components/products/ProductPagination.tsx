"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ProductPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ProductPaginationProps) {
  if (totalPages <= 1) return null;

  const generatePages = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="mt-12 flex flex-col items-center justify-between gap-5 sm:flex-row">
      {/* Info */}
      <p className="text-sm text-gray-500">
        Page{" "}
        <span className="font-semibold text-orange-600">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-orange-600">
          {totalPages}
        </span>
      </p>

      {/* Pagination */}
      <nav
        className="flex items-center gap-2"
        aria-label="Product Pagination"
      >
        {/* Previous */}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`
            flex h-10 w-10 items-center justify-center rounded-lg border
            transition
            ${
              currentPage === 1
                ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                : "border-gray-300 bg-white hover:border-orange-500 hover:bg-orange-50"
            }
          `}
          aria-label="Previous Page"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Page Numbers */}
        {pages.map((page, index) =>
          page === "..." ? (
            <div
              key={`ellipsis-${index}`}
              className="flex h-10 w-10 items-center justify-center text-gray-500"
            >
              <MoreHorizontal size={18} />
            </div>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`
                h-10 min-w-[40px] rounded-lg border px-3 text-sm font-medium transition
                ${
                  currentPage === page
                    ? "border-orange-600 bg-orange-600 text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:border-orange-500 hover:bg-orange-50"
                }
              `}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          )
        )}

        {/* Next */}
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`
            flex h-10 w-10 items-center justify-center rounded-lg border
            transition
            ${
              currentPage === totalPages
                ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                : "border-gray-300 bg-white hover:border-orange-500 hover:bg-orange-50"
            }
          `}
          aria-label="Next Page"
        >
          <ChevronRight size={18} />
        </button>
      </nav>
    </div>
  );
}