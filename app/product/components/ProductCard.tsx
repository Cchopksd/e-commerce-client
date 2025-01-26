"use client";
import Image from "next/image";
import React, { useState } from "react";
import { CircleDollarSign, Package, Heart } from "lucide-react";
import { favoriteProduct } from "../[slug]/components/action";
import { Product } from "@/interface/Product";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  className?: string;
  isFavorite: boolean;
}

export default function ProductCard({ product, isFavorite }: ProductCardProps) {
  const discountPercentage = Math.round(
    ((product.price - product.discount) / product.price) * 100,
  );

  const [favorite, setFavorite] = useState<boolean>(isFavorite);

  const stockStatus =
    product.amount === 0
      ? "สินค้าหมด"
      : product.amount < 10
      ? `เหลือเพียง ${product.amount} ชิ้น`
      : `มีสินค้า ${product.amount} ชิ้น`;

  const stockBadgeColor =
    product.amount === 0
      ? "bg-red-500"
      : product.amount < 10
      ? "bg-yellow-500"
      : "bg-green-500";

  const handleFavoriteClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation(); // หยุดการส่ง event ไปยัง parent
    event.preventDefault(); // หยุดการ redirect
    setFavorite(!favorite);
    await favoriteProduct({
      product_id: product._id,
      is_favorite: !favorite,
    });
  };

  return (
    <Link
      rel="preload"
      href={`product/${product.name.replace(/ /g, "-")}-${product._id}`}
      className={`group relative flex w-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm 
      transition-all duration-300 h-[300px] md:h-[420px]`}>
      {/* Image Container */}
      <div className="relative h-[180px] md:h-[260px] w-full overflow-hidden">
        <Image
          src={
            Array.isArray(product.images) && product.images.length > 0
              ? product.images[0]
              : "https://file.kiramiz.com/detailed.png"
          }
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-300"
        />

        {/* Discount Tag */}
        {product.discount > 0 && (
          <div className="absolute left-0 top-3 bg-red-500 px-3 py-1 shadow-md">
            <span className="text-xs font-bold text-white">
              -{discountPercentage}%
            </span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
            {product.category}
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col p-4">
        {/* Product Name */}
        <div className="w-full flex items-center gap-2">
          {/* Product Name */}
          <h4 className="flex-1 line-clamp-2 text-base font-semibold text-gray-800 hover:text-red-500 transition-colors">
            {product.name}
          </h4>

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="rounded-full bg-white/90 p-2 shadow-md hover:bg-white hover:shadow-lg transition-all"
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }>
            <Heart
              className={`h-4 md:h-5 w-4 md:w-5 ${
                favorite
                  ? "fill-red-500 text-red-500"
                  : "fill-none text-gray-600"
              }`}
            />
          </button>
        </div>

        {/* Price Section */}
        <div className="mt-auto space-y-2">
          <div className="flex items-center gap-2">
            <CircleDollarSign className="h-5 w-5 text-gray-400" />
            <div className="flex items-center gap-2">
              {product.discount > 0 ? (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    ฿{product.price.toLocaleString()}
                  </span>
                  <span className="text-lg font-bold text-red-500">
                    ฿{product.discount.toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-gray-900">
                  ฿{product.price.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* Stock Status */}
          <div
            className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium text-white ${stockBadgeColor}`}>
            <Package className="h-5 w-5" />
            <p>{stockStatus}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
