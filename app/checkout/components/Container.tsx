"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronRight,
  MapPin,
  ShoppingCart,
  CreditCard,
  CheckCircle2,
} from "lucide-react";

import { fetchCreditCard, payWithCard, payWithPromptPay } from "./action";
import Swal from "sweetalert2";

// Type definitions for better type safety
interface PaymentMethod {
  id: string;
  name: string;
  image: string;
}

interface CartItem {
  _id: string;
  product_id: {
    _id: string;
    name: string;
    images: { image_url: string }[];
    price: number;
    discount?: number;
  };
  quantity: number;
}

interface Address {
  _id: string;
  detail: string;
  subdistrict: string;
  district: string;
  province: string;
  post_id: string;
}

interface CreditCard {
  card_id: string;
  name: string;
  brand: string;
  last_digits: string;
  expiration_month: number;
  expiration_year: number;
  cust_id: string;
}

interface ProductData {
  address: Address;
  cart: CartItem[];
}

const paymentMethods: PaymentMethod[] = [
  { id: "PromptPay", name: "PromptPay", image: "/icons/payment/thaiQR.png" },
  {
    id: "CreditCard",
    name: "Credit Card",
    image: "/icons/payment/card.png",
  },
];

export default function Content({ product }: { product: ProductData }) {
  const { address, cart } = product;
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<CreditCard | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Memoize total calculation
  const calculateTotal = React.useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total +
        (item.product_id.discount || item.product_id.price) * item.quantity,
      0
    );
  }, [cart]);

  const checkoutItem = async () => {
    if (!selectedPayment) {
      alert("Please select a payment method");
      return;
    }

    setIsLoading(true);
    try {
      if (selectedPayment === "PromptPay") {
        if (calculateTotal < 20) {
          alert("Amount must be greater than or equal to ฿20");
          setIsLoading(false);
          return;
        }

        const result = await payWithPromptPay({
          type: "promptpay",
          currency: "THB",
          address: address._id,
        });

        if (result) {
          window.location.href = `/payment/${result.payment_id}`;
        } else {
          throw new Error("Payment failed or no response received.");
        }
      } else if (selectedPayment === "CreditCard") {
        if (!selectedCard) {
          alert("Please select a credit card");
          setIsLoading(false);
          return;
        }
        try {
          const result = await payWithCard({
            customer_id: selectedCard.cust_id,
            card_id: selectedCard.card_id,
            address_id: address._id,
            currency: "THB",
          });

          if (result && result.order_id) {
            Swal.fire({
              title: "Payment Success",
              text: "Your payment has been successfully processed.",
              icon: "success",
              confirmButtonText: "View Order",
              timer: 3000,
              timerProgressBar: true,
            }).then(() => {
              window.location.href = `/profile/order/${result.order_id}`;
            });
          } else {
            throw new Error("Payment failed or no order ID received.");
          }
        } catch (error: unknown) {
          console.error("Payment error:", error);
          Swal.fire({
            title: "Payment Failed",
            text:
              error instanceof Error
                ? error.message
                : "An unexpected error occurred.",
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }
      }
    } catch (error) {
      console.error("Payment process error:", error);
      alert("An error occurred during payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchCreditCardData = async () => {
      if (selectedPayment === "CreditCard") {
        try {
          const creditDetail = await fetchCreditCard();
          setCreditCards(creditDetail);
        } catch (error) {
          console.error("Failed to fetch credit cards:", error);
          alert("Failed to load credit cards. Please try again.");
        }
      }
    };

    fetchCreditCardData();
  }, [selectedPayment]);

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
              {cart.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="py-4 flex items-center">
                    <div className="w-16 h-16 mr-4 flex items-center">
                      <Image
                        src={item.product_id.images[0].image_url}
                        alt={item.product_id.name}
                        width={64}
                        height={64}
                        className="object-cover rounded-md"
                      />
                    </div>
                    <span className="text-gray-800">
                      {item.product_id.name}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600 text-right">
                    {(
                      item.product_id.discount || item.product_id.price
                    ).toLocaleString()}{" "}
                    ฿
                  </td>
                  <td className="py-4 px-4 text-gray-600 text-right">
                    {item.quantity}
                  </td>
                  <td className="py-4 px-4 font-semibold text-blue-600 text-right">
                    {(
                      (item.product_id.discount || item.product_id.price) *
                      item.quantity
                    ).toLocaleString()}{" "}
                    ฿
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 px-4 flex justify-end text-lg font-semibold text-gray-800">
            <p>
              <span className="mr-2">ราคารวม:</span>
              {calculateTotal.toLocaleString()} ฿
            </p>
          </div>
        </section>

        {/* Payment Method Section */}
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
                onClick={() => {
                  setSelectedPayment(method.id);
                  // Reset credit card selection when changing payment method
                  setSelectedCard(undefined);
                }}
                className={`flex items-center justify-center p-4 rounded-lg border-2 ${
                  selectedPayment === method.id
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
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

        {/* Credit Card Selection Section */}
        {selectedPayment === "CreditCard" && creditCards.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center mb-4">
              <CreditCard className="mr-3 w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                เลือกบัตรเครดิต
              </h2>
            </div>
            <div className="grid gap-4">
              {creditCards.map((card) => (
                <div
                  key={card.card_id}
                  className={`
                    border-2 rounded-lg p-4 cursor-pointer transition-all duration-300
                    flex items-center justify-between ${
                      selectedCard?.card_id === card.card_id
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                    }
                  `}
                  onClick={() => setSelectedCard(card)}
                >
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold text-gray-800">
                        {card.name}
                      </span>
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded">
                        {card.brand}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 flex items-center space-x-2">
                      <span>**** **** **** {card.last_digits}</span>
                      <span className="text-xs text-gray-500">
                        Exp: {card.expiration_month}/{card.expiration_year}
                      </span>
                    </div>
                  </div>
                  <div>
                    {selectedCard?.card_id === card.card_id ? (
                      <CheckCircle2 className="w-6 h-6 text-blue-500" />
                    ) : (
                      <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Total and Checkout Section */}
        <section className="bg-gray-100 p-4 rounded-lg">
          <div className="flex justify-between mb-4">
            <span className="text-gray-700">ยอดรวม</span>
            <span className="font-semibold text-gray-900">
              {calculateTotal.toLocaleString()} ฿
            </span>
          </div>
          <button
            onClick={checkoutItem}
            disabled={!selectedPayment || isLoading}
            className="
              w-full py-3 rounded-lg 
              flex items-center justify-center
              bg-blue-600 text-white font-semibold
              hover:bg-blue-700 transition-colors
              disabled:bg-gray-400 disabled:cursor-not-allowed
            "
          >
            {isLoading ? "กำลังดำเนินการ..." : "ชำระเงิน"}
            {!isLoading && <ChevronRight className="ml-2" />}
          </button>
        </section>
      </div>
    </div>
  );
}
