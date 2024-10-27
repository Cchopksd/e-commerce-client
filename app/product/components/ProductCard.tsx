import Image from "next/image";
import React from "react";

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
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <a
      href={`product/${product.name.replace(/ /g, "-")}-${product._id}`}
      className="bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 w-full max-w-xs overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-square w-full">
        <Image
          src={product.images[0]?.image_url || "/placeholder-image.jpg"}
          alt={product.name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
        {/* Sale Out Badge */}
        {/* {product.sale_out && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2.5 py-1 rounded">
            Sold Out
          </span>
        )} */}
        {/* Discount Percentage */}
        <span className="absolute right-0 bg-red-100 text-red-500 text-xs px-2 py-0.5 rounded">
          -
          {Math.round(
            ((product.price - product.discount) / product.price) * 100,
          )}
          %
        </span>
      </div>
      <hr className="mx-4" />
      {/* Product Details */}
      <div className="p-4 space-y-2">
        {/* Product Name */}
        <h4 className="text-lg font-medium text-gray-800 line-clamp-2 min-h-[3rem] text-ellipsis">
          {product.name}
        </h4>

        {/* Price Section */}
        <div className="flex items-center space-x-2">
          {product.discount > 0 ? (
            <>
              <p className="text-gray-400 line-through text-sm">
                ฿{product.price.toLocaleString()}
              </p>
              <p className="text-red-500 font-semibold">
                ฿{product.discount.toLocaleString()}
              </p>
            </>
          ) : (
            <p className="text-gray-800 font-semibold">
              ฿{product.price.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </a>
  );
}
