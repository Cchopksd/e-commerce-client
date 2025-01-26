"use client";
import React from "react";
import { BiCart } from "react-icons/bi";

export default function Cart({ getCartItem }: { getCartItem: number }) {
  return (
    <a
      href="/cart"
      className="relative flex items-center hover:text-gray-600 transition-colors">
      <BiCart size={32} />
      {getCartItem > 0 && (
        <span
          className="absolute -top-2 -right-2 bg-black text-white text-xs 
          rounded-full min-w-[20px] min-h-[20px] flex items-center justify-center px-1">
          {getCartItem <= 99 ? getCartItem : "99+"}
        </span>
      )}
    </a>
  );
}
