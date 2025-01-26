import React from "react";
import ProductCard from "@/app/product/components/ProductCard";
import { fetchTrendingProduct } from "../action";
import { Product } from "@/interface/Product";
import TrendingProductComponent from "./Slide";

export default async function Trending() {
  const trendingProduct = await fetchTrendingProduct();

  if (!trendingProduct) {
    return null;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
      <TrendingProductComponent trendingProduct={trendingProduct} />
    </div>
  );
}
