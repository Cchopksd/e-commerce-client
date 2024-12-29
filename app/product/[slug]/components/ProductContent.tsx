"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  LuPlus,
  LuMinus,
  LuShoppingCart,
  LuHeart,
  LuShare2,
} from "react-icons/lu";
import { addToCart, favoriteProduct } from "./action";
import { decrement, increment } from "@/libs/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";

interface ProductImage {
  image_url: string;
  public_id: string;
}

interface ProductData {
  _id: string;
  name: string;
  category: string;
  detail: string;
  price: number;
  discount: number;
  amount: number;
  sale_out: number;
  images: ProductImage[];
}

interface Product {
  product: ProductData;
  token: string | null;
  favorite: boolean;
}

export default function ProductContent({ product, token, favorite }: Product) {
  const dispatch = useAppDispatch();

  const { value } = useAppSelector((state) => state.cart);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [isAdding, setIsAdding] = React.useState(false);
  const images: string[] = [];

  const [isFavorite, setIsFavorite] = useState<boolean>(favorite);

  const handleFavoriteToggle = async (isFavorite: boolean) => {
    setIsFavorite(isFavorite);
    await favoriteProduct({
      product_id: product._id,
      is_favorite: isFavorite,
    });
  };

  product.images.map((items) => {
    images.push(items.image_url);
  });

  const discountPercentage = Math.round(
    ((product.price - product.discount) / product.price) * 100,
  );

  const isSoldOut = product.amount <= 0;

  const handleCartSubmit = async () => {
    if (value <= 0) {
      return;
    }
    if (!token) {
      window.location.href = "/login";
    }

    setIsAdding(true);
    try {
      await addToCart(token, product._id, value);
    } catch (error) {
      console.error("Cart submission error:", error);
    } finally {
      setTimeout(() => {
        setIsAdding(false);
      }, 1000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 border">
            {isSoldOut && (
              <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
                <span className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg">
                  สินค้าหมด
                </span>
              </div>
            )}
            <Image
              src={images[currentImageIndex]}
              alt={`Product - Image ${currentImageIndex + 1}`}
              className={`object-contain w-full h-full p-4 ${
                isSoldOut ? "opacity-75" : ""
              }`}
              fill
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 
                  ${
                    currentImageIndex === idx
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-200 hover:border-gray-300"
                  } transition-all duration-200`}>
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="object-contain p-1"
                  fill
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="space-y-6">
          <div className="flex justify-between">
            <div>
              <div className="mb-3">
                <span className="px-3 py-1 text-sm font-medium bg-gray-100 rounded-full">
                  {product.category}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
            </div>
            <div>
              <div className="top-4 right-4 z-20 flex space-x-2">
                <button
                  onClick={() => handleFavoriteToggle(!isFavorite)}
                  className={`p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md transition-colors 
                    ${
                      isFavorite
                        ? "text-red-500 hover:bg-red-50"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}>
                  <LuHeart
                    className="w-5 h-5"
                    fill={isFavorite ? "currentColor" : "none"}
                  />
                </button>
                <button className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md text-gray-600 hover:bg-gray-100">
                  <LuShare2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              {product.discount ? (
                <>
                  <span
                    className={`text-3xl font-bold ${
                      isSoldOut ? "text-gray-400" : "text-red-600"
                    }`}>
                    ฿{product.discount.toLocaleString()}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    ฿{product.price.toLocaleString()}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs font-semibold text-white rounded-md
                    ${isSoldOut ? "bg-gray-400" : "bg-red-500"}`}>
                    {discountPercentage}% OFF
                  </span>
                </>
              ) : (
                <span
                  className={`text-3xl font-bold ${
                    isSoldOut ? "text-gray-400" : "text-gray-900"
                  }`}>
                  ฿{product.price.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              {isSoldOut ? (
                <span className="text-red-500 font-medium">Out of Stock</span>
              ) : (
                <span>{product.amount} available</span>
              )}
              <span>•</span>
              <span>{product.sale_out} sold</span>
            </p>
          </div>

          <div className="border-t border-b py-6 space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed">{product.detail}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">Quantity</span>
              <div className="flex items-center">
                <button
                  onClick={() => dispatch(decrement(1))}
                  disabled={value <= 1 || isSoldOut}
                  className={`p-2 rounded-l-lg border 
                    ${
                      value <= 1 || isSoldOut
                        ? "bg-gray-50 text-gray-400"
                        : "hover:bg-gray-50 active:bg-gray-100"
                    }`}>
                  <LuMinus className="h-4 w-4" />
                </button>
                <div className="w-16 text-center border-t border-b py-2">
                  {isSoldOut ? 0 : value}
                </div>
                <button
                  onClick={() => dispatch(increment(1))}
                  disabled={value >= product.amount || isSoldOut}
                  className={`p-2 rounded-r-lg border 
                    ${
                      value >= product.amount || isSoldOut
                        ? "bg-gray-50 text-gray-400"
                        : "hover:bg-gray-50 active:bg-gray-100"
                    }`}>
                  <LuPlus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <button
              onClick={handleCartSubmit}
              disabled={isAdding || value <= 0 || isSoldOut}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg
                font-medium transition-all duration-300 
                ${
                  isSoldOut
                    ? "bg-gray-400 cursor-not-allowed"
                    : isAdding
                    ? "bg-green-500 text-white scale-95"
                    : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                } disabled:opacity-50 disabled:cursor-not-allowed`}>
              <LuShoppingCart
                className={`h-5 w-5 ${isAdding ? "animate-bounce" : ""}`}
              />
              {isSoldOut
                ? "Out of Stock"
                : isAdding
                ? "Added to Cart!"
                : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
