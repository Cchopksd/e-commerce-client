"use client";
import React, { useEffect, useState } from "react";

import { MapPin, PenLine, Info } from "lucide-react";

import { CartItem, CartWithAddress } from "./interface";
import CartItems from "./items";
import { addToCart, decrementOfCart } from "./action";
import Summary from "./summary";

export default function Cart({ cart }: { cart: CartWithAddress }) {
  const address = cart.address;

  const [step, setStep] = useState<string>("cart");

  const [cartItems, setCartItems] = useState<CartItem[]>(cart.cart);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculatedTotalPrice = cartItems.reduce((total, item) => {
      const priceAfterDiscount = item.product_id.discount
        ? item.product_id.discount
        : item.product_id.price;

      return total + priceAfterDiscount * item.quantity;
    }, 0);

    setTotalPrice(calculatedTotalPrice);
  }, [cartItems]);

  const increaseItem = (
    item_id: string,
    product_id: string,
    quantity: number,
  ) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === item_id && item.product_id._id === product_id) {
        return {
          ...item,
          quantity: item.quantity + quantity,
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    addToCart(product_id, quantity);
  };

  const decreaseItem = (
    item_id: string,
    product_id: string,
    quantity: number,
  ) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === item_id && item.product_id._id === product_id) {
        return {
          ...item,
          quantity: item.quantity - quantity,
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    decrementOfCart(product_id, quantity);
  };

  return (
    <div className="p-4 md:p-8 w-full max-w-[1440px] m-auto">
      <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
        {/* Cart Section */}
        <section className="w-full lg:w-3/4 flex flex-col">
          <h1 className="text-2xl font-semibold mb-2">Shopping Cart</h1>
          <p className="text-gray-600 mb-6">2 items in your cart.</p>

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
                {cartItems.map((product: any, index: number) => (
                  <CartItems
                    key={product.id || index}
                    items={product}
                    increaseItem={increaseItem}
                    decreaseItem={decreaseItem}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Card layout for mobile */}
          {/* <div className="md:hidden space-y-4">
            {cartItems.map((product: any, index: number) => (
              <div
                key={product.id || index}
                className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-gray-600">฿{product.price}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Qty:</label>
                    <input
                      type="number"
                      value={product.quantity}
                      className="w-16 p-1 text-center border rounded"
                      min="1"
                    />
                  </div>
                  <p className="font-medium">
                    ฿{product.price * product.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div> */}
        </section>
        <section className="w-full lg:w-1/4">
          <Summary address={address} totalPrice={totalPrice} />
        </section>
      </div>
    </div>
  );
}
