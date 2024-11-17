import Image from "next/image";
import React from "react";
import { CircleDollarSign, Package } from "lucide-react";

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
}

export default function ProductCard({
  product,
  className = "",
}: ProductCardProps) {
  const discountPercentage = Math.round(
    ((product.price - product.discount) / product.price) * 100,
  );

  return (
    <div
      className={`group relative flex w-full flex-col overflow-hidden rounded-2xl shadow-md bg-white border border-gray-200
      h-[230px] md:h-[330px]  ${className}`}>
      {/* Image Container */}
      <div className="relative h-[200px]  w-full overflow-hidden bg-gray-50">
        <Image
          src={product.images[0]?.image_url || "/placeholder-image.jpg"}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          priority
          className="object-cover aspect-square bg-gray-400"
        />

        {/* Discount Tag - Simplified */}
        {product.discount > 0 && (
          <span className="absolute left-2 top-2 rounded bg-red-400 px-2 py-0.5 text-[10px] font-medium text-white">
            -{discountPercentage}%
          </span>
        )}

        {/* Category Badge - Simplified */}
        <span className="absolute bottom-2 left-2 rounded bg-white/90 px-2 py-0.5 text-[10px] font-medium text-gray-600">
          {product.category}
        </span>
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col p-3">
        {/* Product Name */}
        <h4 className="line-clamp-2 text-sm font-medium text-gray-800 mb-2">
          <a
            href={`product/${product.name.replace(/ /g, "-")}-${product._id}`}
            className="hover:text-red-500">
            {product.name}
          </a>
        </h4>

        {/* Price Section */}
        <div className="flex items-center gap-1.5 mt-auto">
          <CircleDollarSign className="h-3.5 w-3.5 text-gray-400" />
          <div className="flex items-center gap-1.5">
            {product.discount > 0 ? (
              <>
                <span className="text-base text-gray-400 line-through">
                  ฿{product.price.toLocaleString()}
                </span>
                <span className="text-base font-semibold text-gray-900">
                  ฿{product.discount.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-base font-semibold text-gray-900">
                ฿{product.price.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Stock Status - Simplified */}
        {product.sale_out > 0 && (
          <div className="flex items-center gap-1.5 mt-1">
            <Package className="h-3.5 w-3.5 text-gray-400" />
            <p className="text-xs">
              {product.sale_out < 10 ? (
                <span className="text-gray-600">
                  เหลือ {product.sale_out} ชิ้น
                </span>
              ) : (
                <span className="text-gray-600">
                  สินค้า {product.sale_out} ชิ้น
                </span>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
