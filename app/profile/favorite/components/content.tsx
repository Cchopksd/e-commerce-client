"use client";
import React from "react";
import { Favorite } from "../../../../interface/Favorite";
import Image from "next/image";
import ProductCard from "@/app/product/components/ProductCard";

export default function Content({ favorites }: { favorites: Favorite[] }) {

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">รายการโปรด</h2>

      {favorites && favorites.length === 0 ? (
        <div className="text-center text-gray-500">ยังไม่มีรายการโปรด</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* //{ product, isFavorite } */}
          {favorites &&
            favorites.map((item, idx) => (
              <ProductCard
                key={idx}
                product={item.product_id}
                isFavorite={item.is_favorite}
              />
            ))}
        </div>
      )}
    </div>
  );
}
