import React from "react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartEmpty() {
  return (
    <div className="flex-1 min-h-screen h-full flex flex-col items-center justify-center p-8 md:p-12 bg-white rounded-lg shadow-sm">
      <div className="rounded-full bg-blue-50 p-6 mb-6 transform transition-all duration-300 hover:scale-105">
        <ShoppingCart size={32} className="text-blue-500" />
      </div>
      <div className="text-center space-y-2 mb-8">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800">
          Your cart is empty
        </h3>
        <p className="text-sm md:text-base text-gray-500 max-w-[300px]">
          Looks like you haven&apos;t added anything to your cart yet
        </p>
      </div>
      <Link href="/product">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full transition-colors duration-200">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
}
