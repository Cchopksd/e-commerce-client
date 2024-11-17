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
    <div className="w-full h-full">
      <main className="w-full max-w-[1440px] m-auto p-4">
        <div className="py-16">
          <p>Home / product</p>
          <h1 className="text-5xl lg:text-[96px]">Product</h1>
        </div>
        <div className="pb-10">
          <p>Showing all {totalProduct} results</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {product &&
            product.map((product: any) => (
              <div key={product._id} className="flex justify-center">
                <ProductCard product={product} />
              </div>
            ))}
        </div>
        <div className="w-full py-10">
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
