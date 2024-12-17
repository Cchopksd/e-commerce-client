import Image from "next/image";
import React from "react";
import { CircleDollarSign, Package, Heart } from "lucide-react";

interface ImagesProduct {
  image_url: string;
  public_id: string;
}

interface Product {
  _id: string;
  name: string;
  images: ImagesProduct[];
  price: number;
  discount: number;
  category: string;
  detail: string;
  amount: number;
  sale_out: number;
}

interface ProductCardProps {
  product: Product;
  className?: string;
  isFavorite?: boolean;
}

export default function ProductCard({
  product,
  className = "",
  isFavorite = false,
}: ProductCardProps) {
  const discountPercentage = Math.round(
    ((product.price - product.discount) / product.price) * 100,
  );

  return (
    <a
      href={`product/${product.name.replace(/ /g, "-")}-${product._id}`}
      className={`group relative flex w-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white 
      transition-all duration-300 hover:shadow-lg h-[250px] md:h-[380px] ${className}`}>
      {/* Image Container */}
      <div className="relative h-[160px] md:h-[250px] w-full overflow-hidden">
        <Image
          src={product.images[0]?.image_url || "/placeholder-image.jpg"}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          priority
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Discount Tag */}
        {product.discount > 0 && (
          <div className="absolute left-0 top-3 bg-red-500 px-3 py-1 shadow-sm">
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

        {/* Add Favorite Button */}
        <button
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 transition-all hover:bg-white hover:shadow-md"
          aria-label={
            isFavorite ? "Remove from favorites" : "Add to favorites"
          }>
          <Heart
            className={`h-4 w-4 ${
              isFavorite
                ? "fill-red-500 text-red-500"
                : "fill-none text-gray-600"
            }`}
          />
        </button>
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col p-4">
        {/* Product Name */}
        <h4 className="mb-2 line-clamp-2 min-h-[40px] text-sm font-medium">
          <p className="text-gray-700 transition-colors hover:text-red-500">
            {product.name}
          </p>
        </h4>

        {/* Price Section */}
        <div className="mt-auto space-y-2">
          <div className="flex items-center gap-2">
            <CircleDollarSign className="h-4 w-4 text-gray-400" />
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
          {product.sale_out > 0 && (
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-gray-400" />
              <p className="text-xs font-medium text-gray-500">
                {product.sale_out < 10 ? (
                  <span className="text-red-500">
                    เหลือเพียง {product.sale_out} ชิ้น
                  </span>
                ) : (
                  <span>มีสินค้า {product.sale_out} ชิ้น</span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </a>
  );
}
