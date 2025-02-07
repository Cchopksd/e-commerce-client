"use client";
import React from "react";

export function ProductCardLoading() {
  return (
    <div className="group relative flex w-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all duration-300 h-[300px] md:h-[420px] animate-pulse">
      {/* Image Container */}
      <div className="relative h-[180px] md:h-[260px] w-full overflow-hidden bg-gray-200">
        {/* Placeholder for Image */}
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col p-4">
        {/* Product Name */}
        <div className="w-full flex items-center gap-2">
          {/* Placeholder for Product Name */}
          <div className="flex-1 h-6 bg-gray-200 rounded"></div>

          {/* Placeholder for Favorite Button */}
          <div className="rounded-full bg-gray-200 p-2 shadow-md">
            <div className="h-4 md:h-5 w-4 md:w-5 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Price Section */}
        <div className="mt-auto space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium text-white bg-gray-200">
            <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const ProductList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <ProductCardLoading key={index} />
      ))}
    </div>
  );
};
