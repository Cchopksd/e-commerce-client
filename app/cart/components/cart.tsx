"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import Summary from "./summary";
import { CartWithAddress } from "./interface";
import { Minus, Plus } from "lucide-react";
import { addToCart, reduceFromCart } from "./action";
import Swal from "sweetalert2";

export default function Cart({ cart }: { cart: CartWithAddress }) {
  const [cartItems, setCartItems] = useState(cart.cart);

  const address = cart.address;

  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const totalPrice = cartItems.reduce((total, item) => {
      const price = item.product_id.discount || item.product_id.price;
      return total + price * item.quantity;
    }, 0);

    setTotalPrice(totalPrice);
  }, [cartItems]);

  const handleIncreaseItem = (
    item_id: string,
    product_id: string,
    quantity: number,
  ) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === item_id
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      ),
    );
    addToCart(product_id, quantity);
  };

  const handleDecreaseItem = (
    item_id: string,
    product_id: string,
    quantity: number,
    quantity_now: number,
  ) => {
    if (quantity_now === 1) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't to delete this item!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteItemsElement(item_id);
          reduceFromCart(product_id, quantity);
        }
      });
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === item_id
          ? { ...item, quantity: item.quantity - quantity }
          : item,
      ),
    );
    reduceFromCart(product_id, quantity);
  };

  const deleteItemsElement = (item_id: string) => {
    const updatedCart = cartItems.filter((item) => item._id !== item_id);
    setCartItems(updatedCart);
  };

  return (
    <div className="p-4 md:p-8 w-full max-w-[1440px] m-auto">
      <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
        <section className="w-full lg:w-3/4 flex flex-col">
          <h1 className="text-2xl font-semibold mb-2">Shopping Cart</h1>
          <p className="text-gray-600 mb-6">
            {cartItems.length} items in your cart
          </p>

          {/* Desktop Table View */}
          <div className="hidden md:block">
            <table className="w-full border-collapse shadow-xl my-4 bg-white rounded-2xl">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left font-semibold">Product</th>
                  <th className="p-4 text-center font-semibold">Price</th>
                  <th className="p-4 text-center font-semibold">Quantity</th>
                  <th className="p-4 text-center font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems && cartItems.length > 0 ? (
                  cartItems.map((product, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-left flex items-center gap-4">
                        <div className="w-20 h-20 flex-shrink-0">
                          <Image
                            src={product.product_id.images[0].image_url || ""}
                            alt={product.product_id.name}
                            className="w-full h-full object-cover rounded-md border"
                            width={100}
                            height={100}
                          />
                        </div>
                        <a
                          href={`product/${product.product_id._id}`}
                          className="text-gray-800 font-medium truncate border-b hover:border-b-red-200 hover:text-red-400">
                          {product.product_id.name}
                        </a>
                      </td>
                      <td className="p-4 text-center text-gray-700">
                        ฿
                        {(
                          product.product_id.discount ??
                          product.product_id.price
                        ).toLocaleString()}
                      </td>
                      <td className="p-4 text-center text-gray-700">
                        <div className="flex justify-center items-center gap-4">
                          <button
                            onClick={() =>
                              handleDecreaseItem(
                                product._id,
                                product.product_id._id,
                                1,
                                product.quantity,
                              )
                            }
                            className="w-6 h-6 p-1 flex items-center justify-center bg-white border text-gray-600 hover:bg-gray-200 rounded-md transition-colors">
                            <Minus size={16} />
                          </button>
                          <span className="text-lg font-medium text-gray-800">
                            {product.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleIncreaseItem(
                                product._id,
                                product.product_id._id,
                                1,
                              )
                            }
                            disabled={
                              product.quantity >= product.product_id.amount
                            }
                            className="w-6 h-6 p-1 flex items-center justify-center bg-white border text-gray-600 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50">
                            <Plus size={16} />
                          </button>
                        </div>
                      </td>
                      <td className="p-4 text-center font-semibold text-[#fed28c]">
                        ฿
                        {(
                          (product.product_id.discount ??
                            product.product_id.price) * product.quantity
                        ).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center p-4 text-gray-500">
                      Your cart is empty.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((product, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-4 flex items-center space-x-4">
                  <div className="w-20 h-20 flex-shrink-0">
                    <Image
                      src={product.product_id.images[0].image_url || ""}
                      alt={product.product_id.name}
                      className="w-full h-full object-cover rounded-md border"
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="flex-grow">
                    <a
                      href={`product/${product.product_id._id}`}
                      className="text-gray-800 font-medium block mb-2 truncate">
                      {product.product_id.name}
                    </a>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            handleDecreaseItem(
                              product._id,
                              product.product_id._id,
                              1,
                              product.quantity,
                            )
                          }
                          className="w-6 h-6 p-1 flex items-center justify-center bg-white border text-gray-600 hover:bg-gray-200 rounded-md transition-colors">
                          <Minus size={16} />
                        </button>
                        <span className="text-lg font-medium text-gray-800">
                          {product.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleIncreaseItem(
                              product._id,
                              product.product_id._id,
                              1,
                            )
                          }
                          disabled={
                            product.quantity >= product.product_id.amount
                          }
                          className="w-6 h-6 p-1 flex items-center justify-center bg-white border text-gray-600 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50">
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="text-[#fed28c] font-semibold">
                        ฿
                        {(
                          (product.product_id.discount ??
                            product.product_id.price) * product.quantity
                        ).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 p-4">
                Your cart is empty.
              </div>
            )}
          </div>
        </section>
        <section className="w-full lg:w-1/4">
          <Summary totalPrice={totalPrice} address={address} />
        </section>
      </div>
    </div>
  );
}
