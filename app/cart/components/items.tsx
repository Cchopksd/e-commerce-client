"use client";
import React, { useState } from "react";
import { CartItem, CartWithAddress } from "./interface";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";

export default function CartItems({
  items,
  increaseItem,
  decreaseItem,
}: {
  items: CartItem;
  increaseItem: (item_id: string, product_id: string, quantity: number) => void;
  decreaseItem: (item_id: string, product_id: string, quantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(items.quantity);
  const [subTotal, setSubTotal] = useState(() => {
    const priceAfterDiscount = items.product_id?.discount
      ? items.product_id.discount
      : items.product_id.price;

    return priceAfterDiscount * items.quantity;
  });

  const product_id = items.product_id._id;
  const image: string = items.product_id.images[0].image_url;
  const name: string = items.product_id.name;
  let price: number = items.product_id.price;
  let discount: number = items.product_id?.discount ?? 0;
  const amount: number = items.product_id.amount;

  const priceAfterDiscount = discount ?? price;

  const handleIncreaseItem = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);

    const newSubTotal = (discount ?? price) * newQuantity;
    setSubTotal(newSubTotal);

    increaseItem(items._id, product_id, 1);
  };

  const handleDecreaseItem = () => {
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);

    const newSubTotal = (discount ?? price) * newQuantity;
    setSubTotal(newSubTotal);
    decreaseItem(items._id, product_id, 1);
  };

  return (
    <tr className="border-b hover:bg-gray-50 transition-colors ">
      <td className="p-4 text-left flex items-center gap-4">
        <div className="w-20 h-20 flex-shrink-0">
          <Image
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-md border"
            width={100}
            height={100}
          />
        </div>
        <a
          href={`product/${product_id}`}
          className="text-gray-800 font-medium truncate border-b hover:border-b-red-200 hover:text-red-400">
          {name}
        </a>
      </td>
      <td className="p-4 text-center text-gray-700">
        ฿{priceAfterDiscount.toFixed(2)}
      </td>
      <td className="p-4 text-center text-gray-700 gap-4">
        <div className="flex justify-between">
          <button
            onClick={() => handleDecreaseItem()}
            disabled={quantity <= 1}
            className="w-6 h-6 p-1 flex items-center justify-center bg-white border text-gray-600 hover:bg-gray-200  rounded-md transition-colors">
            <Minus />
          </button>
          <span className="text-lg font-medium text-gray-800">{quantity}</span>
          <button
            onClick={() => handleIncreaseItem()}
            disabled={quantity >= amount}
            className="w-6 h-6 p-1 flex items-center justify-center bg-white border text-gray-600 hover:bg-gray-200  rounded-md transition-colors">
            <Plus className="" />
          </button>
        </div>
      </td>

      <td className="p-4 text-center font-semibold text-[#fed28c]">
        ฿{subTotal.toLocaleString()}
      </td>
    </tr>
  );
}
