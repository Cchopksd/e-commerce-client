"use client";
import React from "react";

import { IoIosArrowBack, IoIosArrowForward, IoIosMore } from "react-icons/io";

interface Pagination {
  search: string;
  totalPages: number;
  currentPage: number;
  maxVisible: number;
}

export default function Pagination({
  search,
  totalPages,
  currentPage,
  maxVisible,
}: Pagination) {
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    console.log(totalPages);
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    // Calculate start and end of visible pages
    let start = Math.max(2, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages - 1, start + maxVisible - 3);

    // Adjust start if we're near the end
    if (end === totalPages - 1) {
      start = Math.max(2, end - (maxVisible - 3));
    }

    // Add ellipsis after first page if needed
    if (start > 2) {
      pages.push("...");
    }

    // Add visible page numbers
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (end < totalPages - 1) {
      pages.push("...");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const onPageChange = (page: number) => {
    window.location.href = `${search}&page=${page}`;
  };

  console.log(getPageNumbers());

  return (
    <nav
      className='flex items-center justify-center space-x-2'
      role='navigation'
      aria-label='Pagination'>
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
        aria-label='Previous page'>
        <IoIosArrowBack className='w-5 h-5' />
      </button>

      <div className='hidden sm:flex items-center space-x-1'>
        {getPageNumbers().map((page: any, index) =>
          page === "..." ? (
            <IoIosMore
              key={`ellipsis-${index}`}
              className='w-5 h-5 text-gray-400'
            />
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-2 rounded-lg ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}>
              {page}
            </button>
          )
        )}
      </div>

      <div className='sm:hidden text-sm'>
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>

      <button
        onClick={() => {
          if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
          }
        }}
        disabled={currentPage === totalPages}
        className='p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
        aria-label='Next page'>
        <IoIosArrowForward className='w-5 h-5' />
      </button>
    </nav>
  );
}
