"use client";
import { updateOrders } from "@/libs/features/admin/manageOrderSlice";
import React, {useState } from "react";

import { IoIosArrowBack, IoIosArrowForward, IoIosMore } from "react-icons/io";
import { fetchAllOrders } from "./action";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";

interface Pagination {
  maxVisible: number;
  totalPages: number;
  currentPage: number;
}

export default function Pagination({
  maxVisible,
  totalPages,
  currentPage,
}: Pagination) {
  const dispatch = useAppDispatch();
  const { options } = useAppSelector((state) => state.manageOrder);

  const [effectiveTotalPages, setEffectiveTotalPages] = useState(totalPages);
  const [effectiveCurrentPage, setEffectiveCurrentPage] = useState(currentPage);

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (effectiveTotalPages <= maxVisible) {
      return Array.from({ length: effectiveTotalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    const start = Math.max(
      2,
      effectiveCurrentPage - Math.floor((maxVisible - 4) / 2),
    );
    const end = Math.min(effectiveTotalPages - 1, start + maxVisible - 4);

    if (start > 2) {
      pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < effectiveTotalPages - 1) {
      pages.push("...");
    }

    if (effectiveTotalPages > 1) {
      pages.push(effectiveTotalPages);
    }

    return pages;
  };

  const onPageChange = async (page: number) => {
    try {
      const order = await fetchAllOrders(options, page);
      if (order) {
        dispatch(updateOrders(order.orders));
        setEffectiveCurrentPage(order.page_now);
        setEffectiveTotalPages(order.total_page);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <nav
      className="flex items-center justify-center space-x-2"
      role="navigation"
      aria-label="Pagination">
      <button
        onClick={() =>
          effectiveCurrentPage > 1 && onPageChange(effectiveCurrentPage - 1)
        }
        disabled={effectiveCurrentPage === 1}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page">
        <IoIosArrowBack className="w-5 h-5" />
      </button>

      <div className="hidden sm:flex items-center space-x-1">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <IoIosMore
              key={`ellipsis-${index}`}
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(Number(page))}
              className={`px-3 py-2 rounded-lg ${
                effectiveCurrentPage === page
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
              aria-current={effectiveCurrentPage === page ? "page" : undefined}>
              {page}
            </button>
          ),
        )}
      </div>

      <button
        onClick={() =>
          effectiveCurrentPage < effectiveTotalPages &&
          onPageChange(effectiveCurrentPage + 1)
        }
        disabled={effectiveCurrentPage === effectiveTotalPages}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page">
        <IoIosArrowForward className="w-5 h-5" />
      </button>
    </nav>
  );
}
