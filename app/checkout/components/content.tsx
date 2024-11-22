"use client";
import React, { useState } from "react";
import {
  CreditCard,
  Wallet,
  Building,
  Plus,
  MapPin,
  User,
  Phone,
  Mail,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";

import thaiQR from "/public/icons/payment/thaiQR.png";
import { CartWithAddress } from "@/app/cart/components/interface";
import { payWithPromptPay } from "./action";

const PaymentMethods = ({ product }: { product: CartWithAddress }) => {
  const address = product.address;
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedCard, setSelectedCard] = useState("");
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [paymentResult, setPaymentResult] = useState<any>();

  const checkoutItem = async () => {
    if (selectedPayment === "PromptPay") {
      try {
        const result = await payWithPromptPay({
          type: "promptpay",
          currency: "THB",
          address: address._id,
        });

        if (result) {
          setPaymentResult(result);
          console.log("Payment successful:", result);
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

  const paymentMethods = [
    {
      id: "credit-card",
      name: "บัตรเครดิต / เดบิต",
      icon: <CreditCard className="w-5 h-5" />,
      description: "Visa, Mastercard, JCB",
    },
    {
      id: "mobile-banking",
      name: "โมบายแบงก์กิ้ง",
      icon: <Building className="w-5 h-5" />,
      description: "SCB, Kbank, Bangkok Bank",
    },
    {
      id: "PromptPay",
      name: "PromptPay",
      icon: <Image src={thaiQR} alt="PromptPay Image" width={20} height={20} />,
      description: "",
    },
  ];

  const savedCards = [
    { id: "card1", name: "Visa ****4242", expiry: "12/25" },
    { id: "card2", name: "Mastercard ****5555", expiry: "08/26" },
  ];

  const renderStepIndicator = () => (
    <div className="max-w-4xl mx-auto mb-8 px-4">
      <div className="flex items-center justify-between">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`
              flex items-center justify-center w-10 h-10 rounded-full 
              ${
                currentStep === step
                  ? "bg-blue-600 text-white"
                  : currentStep > step
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }
              transition-colors duration-200
            `}>
              {currentStep > step ? (
                <CheckCircle2 className="w-6 h-6" />
              ) : (
                <span className="font-semibold">{step}</span>
              )}
            </div>
            {step < 3 && (
              <div
                className={`
                w-24 h-1 mx-2
                ${currentStep > step ? "bg-green-500" : "bg-gray-200"}
                transition-colors duration-200
              `}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>ข้อมูลการจัดส่ง</span>
        <span>วิธีการชำระเงิน</span>
        <span>ยืนยันการสั่งซื้อ</span>
      </div>
    </div>
  );

  const DeliveryForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2 sm:col-span-1">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <User className="w-4 h-4 mr-2" />
            ชื่อ
          </label>
          <p>{address.user_id.first_name}</p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <User className="w-4 h-4 mr-2" />
            นามสกุล
          </label>
          <p>{address.user_id.last_name}</p>
        </div>
      </div>

      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
          <MapPin className="w-4 h-4 mr-2" />
          ที่อยู่
        </label>
        <div className="pl-6">
          <p className="text-gray-700 leading-relaxed break-words">
            {address.detail}
          </p>
          <p className="text-gray-700 leading-relaxed">
            {address.subdistrict && (
              <span className="after:content-[',_']">
                {address.subdistrict}
              </span>
            )}
            {address.district && (
              <span className="after:content-[',_']">{address.district}</span>
            )}
            <span>{address.province}</span>
            {address.post_id && (
              <span className="ml-1 text-gray-500">{address.post_id}</span>
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2 sm:col-span-1">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <Phone className="w-4 h-4 mr-2" />
            เบอร์โทรศัพท์
          </label>
          {address.user_id.phone}
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <Mail className="w-4 h-4 mr-2" />
            อีเมล
          </label>
          {address.user_id.email}
        </div>
      </div>
    </div>
  );

  const PaymentMethodsForm = () => (
    <div className="space-y-6">
      <div className="grid gap-4">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className={`
              relative flex items-center p-4 rounded-xl border-2 cursor-pointer
              transition-all duration-200 hover:shadow-md
              ${
                selectedPayment === method.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }
            `}>
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={selectedPayment === method.id}
              onChange={(e) => setSelectedPayment(e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <div className="ml-4 flex items-center flex-1">
              <span className="p-2 rounded-lg bg-white shadow-sm mr-4">
                {method.icon}
              </span>
              <div>
                <p className="font-medium text-gray-900">{method.name}</p>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
              <ChevronRight
                className={`
                w-5 h-5 ml-auto transition-transform duration-200
                ${
                  selectedPayment === method.id
                    ? "rotate-90 text-blue-500"
                    : "text-gray-400"
                }
              `}
              />
            </div>
          </label>
        ))}
      </div>

      {selectedPayment === "credit-card" && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-medium text-gray-900">
              บัตรที่บันทึกไว้
            </h4>
            <button
              onClick={() => setShowNewCardForm(!showNewCardForm)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition duration-200">
              <Plus className="w-4 h-4 mr-2" />
              เพิ่มบัตรใหม่
            </button>
          </div>

          <div className="grid gap-4">
            {savedCards.map((card) => (
              <label
                key={card.id}
                className={`
                  relative flex items-center p-4 rounded-xl border-2 cursor-pointer
                  transition-all duration-200 hover:shadow-md
                  ${
                    selectedCard === card.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }
                `}>
                <input
                  type="radio"
                  name="card"
                  value={card.id}
                  checked={selectedCard === card.id}
                  onChange={(e) => setSelectedCard(e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div className="ml-4 flex items-center justify-between flex-1">
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="font-medium text-gray-900">
                      {card.name}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    หมดอายุ {card.expiry}
                  </span>
                </div>
              </label>
            ))}
          </div>

          {showNewCardForm && (
            <div className="p-6 rounded-xl bg-gray-50 border border-gray-200 space-y-6">
              <h4 className="text-lg font-medium text-gray-900">
                เพิ่มบัตรใหม่
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    หมายเลขบัตร
                  </label>
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      วันหมดอายุ
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="password"
                      placeholder="123"
                      maxLength={3}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ชื่อบนบัตร
                  </label>
                  <input
                    type="text"
                    placeholder="JOHN DOE"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ธนาคารผู้ออกบัตร
                  </label>
                  <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">เลือกธนาคาร</option>
                    <option value="scb">ธนาคารไทยพาณิชย์</option>
                    <option value="kbank">ธนาคารกสิกรไทย</option>
                    <option value="bbl">ธนาคารกรุงเทพ</option>
                    <option value="ktb">ธนาคารกรุงไทย</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const OrderSummary = () => (
    <div className="rounded-xl bg-gray-50 border border-gray-200 p-6">
      <h4 className="text-lg font-medium text-gray-900 mb-4">
        สรุปรายการสั่งซื้อ
      </h4>
      <div className="space-y-3">
        <div className="flex justify-between text-gray-600">
          <span>ยอดรวมสินค้า</span>
          <span>฿1,500.00</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>ค่าจัดส่ง</span>
          <span>฿50.00</span>
        </div>
        <div className="h-px bg-gray-200 my-2" />
        <div className="flex justify-between text-lg font-medium text-gray-900">
          <span>ยอดรวมทั้งหมด</span>
          <span>฿1,550.00</span>
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                ข้อมูลการจัดส่ง
              </h3>
              <DeliveryForm />
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-2.5 text-gray-600 hover:text-gray-800 transition duration-200"
                disabled>
                ย้อนกลับ
              </button>
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
                ถัดไป
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                วิธีการชำระเงิน
              </h3>
              <PaymentMethodsForm />
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-2.5 text-gray-600 hover:text-gray-800 transition duration-200">
                ย้อนกลับ
              </button>
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
                ถัดไป
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <>
            {!paymentResult ? (
              <div className="space-y-8">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      ตรวจสอบข้อมูล
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          ข้อมูลการจัดส่ง
                        </h4>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                          <p className="text-sm text-gray-600">
                            ชื่อ-นามสกุล: John Doe
                          </p>
                          <p className="text-sm text-gray-600">
                            ที่อยู่: 123 ถนนสุขุมวิท
                          </p>
                          <p className="text-sm text-gray-600">
                            เบอร์โทร: 081-234-5678
                          </p>
                          <p className="text-sm text-gray-600">
                            อีเมล: john@example.com
                          </p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                          วิธีการชำระเงิน
                        </h4>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center">
                            <CreditCard className="w-5 h-5 text-gray-400 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                Visa ****4242
                              </p>
                              <p className="text-sm text-gray-600">
                                หมดอายุ 12/25
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <OrderSummary />
                </div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6 py-2.5 text-gray-600 hover:text-gray-800 transition duration-200">
                    ย้อนกลับ
                  </button>
                  <button
                    onClick={checkoutItem}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium">
                    ยืนยันการสั่งซื้อ
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="w-full h-full max-w-20">
                  {" "}
                  <Image
                    src={paymentResult.image}
                    alt="promptPay"
                    width={100}
                    height={100}
                    className="w-20 h-20"
                  />
                </div>
              </>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {renderStepIndicator()}
        {renderStepContent()}
      </div>
    </div>
  );
};

export default PaymentMethods;
