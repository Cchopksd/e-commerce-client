import React from "react";

import fetchAllProduct from "./components/action";
import ProductCard from "./components/ProductCard";
import Pagination from "./components/Pagination";

export default async function Product({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const params = await searchParams;
  const search = params.search || "";
  const page = Number(params.page);

  const resourceProduct = await fetchAllProduct({
    search,
    page: page || 1,
  });

  const totalProduct = resourceProduct.total_items;
  const totalPages = resourceProduct.total_page;
  const currentPage = resourceProduct.page_now;

  const product = resourceProduct?.items;

  return (
    <div className="h-full bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 flex flex-wrap gap-4 items-center justify-between">
          <p className="text-sm text-gray-500">
            แสดงผลลัพธ์ทั้งหมด {totalProduct} รายการ
          </p>{" "}
          <div className="flex items-center gap-4">
            <select className="rounded-md border-gray-300 py-2 px-4">
              <option>เรียงตามล่าสุด</option>
              <option>ราคา: ต่ำ - สูง</option>
              <option>ราคา: สูง - ต่ำ</option>
            </select>
          </div>
        </div>

        <div>
          {product && product.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {product.map((product: any) => (
                <div key={product._id} className="group relative">
                  <ProductCard
                    product={product}
                    isFavorite={product.favorite}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-400 mb-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <p>No products found. Please check back later!</p>
            </div>
          )}
        </div>

        <div className="py-12  flex justify-center">
          <Pagination
            search={`/product?search=${search}`}
            totalPages={totalPages}
            currentPage={currentPage}
            maxVisible={5}
          />
        </div>
      </main>
    </div>
  );
}
