"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronRight, MapPin, ShoppingCart, CreditCard } from "lucide-react";
import { payWithPromptPay } from "./action";

const paymentMethods = [
  { id: "PromptPay", name: "PromptPay", image: "/icons/payment/thaiQR.png" },
  {
    id: "CreditCard",
    name: "Credit Card",
    image: "/icons/payment/card.png",
  },
  // Add more payment methods here
];

export default function Content({ product }: { product: any }) {
  const { address, cart } = product;
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const checkoutItem = async () => {
    if (selectedPayment === "PromptPay") {
      try {
        const result = await payWithPromptPay({
          type: "promptpay",
          currency: "THB",
          address: address._id,
        });

        if (result) {
          return (window.location.href = `/payment/${result.payment_id}`);
        } else {
          console.error("Payment failed or no response received.");
        }
      } catch (error) {
        console.error("An error occurred during the payment process:", error);
      }
    } else {
      console.warn("Selected payment method is not supported.");
    }
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total: number, item: any) =>
        total + item.product_id.price * item.quantity,
      0,
    );
  };

  return (
    <div className="p-10">
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
        {/* Shipping Address Section */}
        <section className="mb-6">
          <div className="flex items-center mb-4">
            <MapPin className="mr-2 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              ที่อยู่ในการจัดส่ง
            </h2>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-700">
              {address.detail}, {address.subdistrict}, {address.district},{" "}
              {address.province} {address.post_id}
            </p>
          </div>
        </section>

        {/* Cart Items Section */}
        <section className="mb-6">
          <div className="flex items-center mb-4">
            <ShoppingCart className="mr-2 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              รายการในตะกร้า
            </h2>
          </div>
          <table className="w-full table-auto bg-white shadow-sm rounded-lg">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left text-gray-700">สินค้า</th>
                <th className="py-2 px-4 text-right text-gray-700">
                  ราคาต่อหน่วย
                </th>
                <th className="py-2 px-4 text-right text-gray-700">จำนวน</th>
                <th className="py-2 px-4 text-right text-gray-700">ราคา</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item: any) => (
                <tr key={item._id} className="border-b">
                  <td className="py-4 flex items-center text-right">
                    <div className="w-16 h-16 mr-4 flex items-center">
                      <Image
                        src={item.product_id.images[0].image_url}
                        alt={item.product_id.name}
                        width={64}
                        height={64}
                        className="object-cover rounded-md"
                      />
                    </div>
                    <span className="text-gray-800 text-right">
                      {item.product_id.name}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600 text-right">
                    {item.product_id.price} ฿
                  </td>
                  <td className="py-4 px-4 text-gray-600 text-right">
                    {item.quantity}
                  </td>
                  <td className="py-4 px-4 font-semibold text-blue-600 text-right">
                    {item.product_id.price * item.quantity} ฿
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div></div>
          <div className="mt-4 px-4 flex justify-end text-lg font-semibold text-gray-800">
            <p>
              <span className="mr-2">ราคารวม:</span>
              {cart.reduce(
                (total: number, item: any) =>
                  total + item.product_id.price * item.quantity,
                0,
              )}{" "}
              ฿
            </p>
          </div>
        </section>

        {/* Payment Section */}
        <section className="mb-6">
          <div className="flex items-center mb-4">
            <CreditCard className="mr-2 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              วิธีการชำระเงิน
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`flex items-center justify-center p-4 rounded-lg border-2 
          ${
            selectedPayment === method.id
              ? "border-blue-600 bg-blue-50 text-blue-700"
              : "border-gray-200 hover:border-blue-300"
          }`}>
                <Image
                  src={method.image}
                  alt={method.name}
                  width={50}
                  height={50}
                  className="mr-2"
                />
                {method.name}
              </button>
            ))}
          </div>
        </section>

        {/* Total and Checkout */}
        <section className="bg-gray-100 p-4 rounded-lg">
          <div className="flex justify-between mb-4">
            <span className="text-gray-700">ยอดรวม</span>
            <span className="font-semibold text-gray-900">
              {calculateTotal()} ฿
            </span>
          </div>
          <button
            onClick={checkoutItem}
            disabled={!selectedPayment}
            className="
              w-full py-3 rounded-lg 
              flex items-center justify-center
              bg-blue-600 text-white font-semibold
              hover:bg-blue-700 transition-colors
              disabled:bg-gray-400 disabled:cursor-not-allowed
            ">
            ชำระเงิน
            <ChevronRight className="ml-2" />
          </button>
        </section>
      </div>
    </div>
  );
}
