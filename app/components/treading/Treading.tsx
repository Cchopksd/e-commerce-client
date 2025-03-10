import React, { Suspense } from "react";
import { fetchTrendingProduct } from "../action";
import TrendingProductComponent from "./Slide";
import { ProductList } from "@/app/admin-dashboard/components/loading/CardLoading";

export default async function Trending() {
  const trendingProduct = await fetchTrendingProduct();

  if (!trendingProduct) {
    return null;
  }
  return (
    <div className='container mx-auto  py-8'>
      <h2 className='text-3xl font-bold text-start mb-8'>Popular Products</h2>
      <Suspense fallback={<ProductList />}>
        <TrendingProductComponent trendingProduct={trendingProduct} />
      </Suspense>
    </div>
  );
}
