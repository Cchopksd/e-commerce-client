"use client";
import Image from "next/image";
import React from "react";
import { LuPlus, LuMinus, LuShoppingCart } from "react-icons/lu";
import { addToCart } from "./action";
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
}

export default function ProductContent({ product, token }: Product) {
  const dispatch = useAppDispatch();

  const { value } = useAppSelector((state) => state.cart);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const images: string[] = [];

  product.images.map((items) => {
    images.push(items.image_url);
  });

  const discountPercentage = Math.round(
    ((product.price - product.discount) / product.price) * 100,
  );

  const handleCartSubmit = async () => {
    if (value <= 0) {
      return;
    }
    if (!token) {
      window.location.href = "/login";
    }

    try {
      const result = await addToCart(token, product._id, value);
      console.log(result);
    } catch (error) {
      console.error("Cart submission error:", error);
    }
  };

  return (
    <div className="mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-20">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-50">
            <Image
              src={images[currentImageIndex]}
              alt={`Product B - Image ${currentImageIndex + 1}`}
              className="object-cover w-full h-auto "
              fill
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`aspect-square rounded-lg overflow-hidden border-2 ${
                  currentImageIndex === idx
                    ? "border-blue-500"
                    : "border-transparent"
                }`}>
                <div className="w-full h-full relative aspect-square overflow-hidden">
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="object-cover w-full h-auto"
                    fill
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="space-y-6 py-10">
          <div>
            <div className="mb-2 flex">
              <div className="block bg-neutral-100 px-3 shadow-sm rounded-lg text-sm">
                {product.category}
              </div>
            </div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-4">
              {product.discount ? (
                <>
                  {/* Discounted Price and Original Price */}
                  <span className="text-3xl font-bold text-red-600">
                    ฿{product.discount}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ฿{product.price}
                  </span>
                  <div className="text-[10px] text-white font-semibold bg-red-500 py-1 px-2 rounded-md">
                    {discountPercentage}% OFF
                  </div>
                </>
              ) : (
                // Only Original Price when no discount is available
                <span className="text-3xl font-bold text-gray-900">
                  ฿{product.price}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">
              {product.amount} available | {product.sale_out} sold
            </p>
          </div>
          <hr />
          <div>
            <div className="p-4 shadow-sm border rounded-lg bg-gray-50">
              <p className="text-gray-700">{product.detail}</p>
            </div>
          </div>
          <hr />
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(decrement(1))}
                  disabled={value <= 1}
                  className="shadow-sm p-1 rounded-md border">
                  <LuMinus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center">{value}</span>
                <button
                  onClick={() => dispatch(increment(1))}
                  disabled={value >= product.amount}
                  className="shadow-sm p-1 rounded-md border">
                  <LuPlus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <section className="w-full">
              <button
                onClick={handleCartSubmit}
                className="w-full flex justify-center gap-4 bg-black text-white p-2 shadow-sm rounded-lg">
                <LuShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
