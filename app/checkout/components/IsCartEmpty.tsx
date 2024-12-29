import React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

export default function IsCartEmpty() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md text-center space-y-8">
        <div className="relative h-64 w-64 mx-auto mb-8">
          <Image
            src="https://static.vecteezy.com/system/resources/previews/004/999/463/large_2x/shopping-cart-icon-illustration-free-vector.jpg"
            alt="Empty Cart"
            fill
            className="object-contain animate-float"
            priority
            unoptimized
          />
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-gray-900">
            Your shopping cart is empty
          </h2>
          <p className="text-gray-500 text-lg">
            Looks like you haven&apos;t made your choice yet
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl">
          <ShoppingCart className="w-5 h-5" />
          Start Shopping
        </Link>
      </div>
    </div>
  );
}
