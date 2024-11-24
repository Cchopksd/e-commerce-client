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
      <div className="relative h-[60vh] bg-gray-900 text-white">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600"
          alt="Collection Banner"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            คอลเลคชั่นใหม่ล่าสุด
          </h1>
          <p className="mt-6 max-w-3xl text-xl">
            ค้นพบสินค้าคุณภาพที่คัดสรรมาเพื่อคุณโดยเฉพาะ
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
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

        <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <select className="rounded-md border-gray-300 py-2 px-4">
              <option>เรียงตามล่าสุด</option>
              <option>ราคา: ต่ำ - สูง</option>
              <option>ราคา: สูง - ต่ำ</option>
            </select>
            <div className="flex gap-2">
              <button className="p-2 rounded-md border hover:bg-gray-100">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <button className="p-2 rounded-md border hover:bg-gray-100">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            แสดงผลลัพธ์ทั้งหมด {totalProduct} รายการ
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
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

        <div className="my-16">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1604147495798-57beb5d6af73?q=80&w=1600"
                alt="Newsletter background"
                fill
                className="object-cover opacity-10"
              />
            </div>
            <div className="relative bg-gray-900 bg-opacity-50 px-6 py-16 sm:px-12 sm:py-24 lg:py-32">
              <h2 className="text-3xl font-bold text-white">คอลเลคชั่นพิเศษ</h2>
              <p className="mt-4 max-w-3xl text-xl text-gray-100">
                ค้นพบสินค้าสุดพิเศษที่คัดสรรมาเพื่อคุณ
              </p>
              <button className="mt-8 bg-white text-gray-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                ดูเพิ่มเติม
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
