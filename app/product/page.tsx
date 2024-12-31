import React from "react";
import Image from "next/image";

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

  console.log(resourceProduct, "chopper");

  const categories = [
    {
      name: "เสื้อผ้า",
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800",
    },
    {
      name: "รองเท้า",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800",
    },
    {
      name: "กระเป๋า",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800",
    },
    {
      name: "เครื่องประดับ",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="my-8 flex flex-wrap gap-4 items-center justify-between">
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

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {product &&
            product.map((product: any) => (
              <div key={product._id} className="group relative">
                <ProductCard product={product} />
              </div>
            ))}
        </div>
        <div className="mt-12 mb-16 flex justify-center">
          <Pagination
            search={`/product?search=${search}`}
            totalPages={totalPages}
            currentPage={currentPage}
            maxVisible={5}
          />
        </div>

        <div className="py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div
                key={category.name}
                className="relative group cursor-pointer">
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity" />
                </div>
                <h3 className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-white">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
