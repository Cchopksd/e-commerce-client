"use client";
import React from "react";
import { Info, MapPin, PenLine } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Summary({
  address,
  totalPrice,
}: {
  address: any;
  totalPrice: number;
}) {
  const router = useRouter();

  const handleClickCheckout = () => {
    if (address.length == 0) {
      return alert("กรุณาเพิ่มที่อยู่ของคุณ");
    }
    router.push("/checkout");
  };

  const handleAddAddress = () => {};

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-xl mt-6">
      <div className="mb-6">
        <div className="bg-white rounded-lg p-4 md:p-5 mb-6 border border-gray-100">
          {address.length != 0 ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">รายละเอียดการจัดส่ง</h3>
                <button
                  onClick={handleAddAddress}
                  className="px-3 py-1.5 text-sm font-medium text-orange-600 hover:text-orange-700 
                          bg-orange-50 hover:bg-orange-100 rounded-md transition-colors flex items-center gap-2">
                  <span>Change</span>
                  <PenLine size={16} />
                </button>
              </div>

              <div className="bg-orange-50 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-orange-600 shrink-0" />
                    <p className="font-medium text-gray-900">{address.name}</p>
                  </div>

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
                        <span className="after:content-[',_']">
                          {address.district}
                        </span>
                      )}
                      <span>{address.province}</span>
                      {address.post_id && (
                        <span className="ml-1 text-gray-500">
                          {address.post_id}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
                <Info size={16} className="shrink-0 text-orange-600" />
                <p>เราจะจัดส่งคำสั่งซื้อของคุณไปยังที่อยู่นี้</p>
              </div>
            </>
          ) : (
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">
                ไม่มีที่อยู่จัดส่ง
              </h3>
              <button
                onClick={handleAddAddress}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
                เพิ่มที่อยู่จัดส่ง
              </button>
              <p className="text-sm text-gray-600 mt-2">
                กรุณาเพิ่มที่อยู่จัดส่งเพื่อดำเนินการชำระเงิน
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Coupon Section */}
      <div className="mb-6">
        <p className="text-sm font-semibold mb-2">Coupon Code</p>
        <div className="flex gap-2">
          <input
            type="text"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200"
            placeholder="Enter coupon code"
          />
          <button className="px-4 py-2 bg-orange-100 text-orange-800 rounded-md hover:bg-orange-200 transition-colors whitespace-nowrap">
            Apply
          </button>
        </div>
        <hr className="my-6" />
      </div>

      {/* Cart Total */}
      <div className="bg-[#fed28c] p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Cart Total</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-gray-700">Cart Subtotal</p>
            <p className="font-semibold">฿{totalPrice.toLocaleString()}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-700">Discount</p>
            <p className="font-semibold text-red-600">-฿0.00</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-700">Shipping Fee</p>
            <p className="font-semibold">Free</p>
          </div>
          <hr className="my-3 border-orange-300" />
          <div className="flex justify-between items-center">
            <p className="font-semibold">Total</p>
            <p className="font-semibold text-lg">
              ฿{totalPrice.toLocaleString()}
            </p>
          </div>
        </div>
        <motion.button
          onClick={handleClickCheckout}
          initial={{
            background: "#FFFFFF", // สีเริ่มต้น: ส้ม
            color: "#000", // ข้อความสีขาว
          }}
          whileHover={{
            background: "#F97316", // ไล่สีจากส้มไปขาว
            color: "#FFFFFF", // ข้อความสีดำเมื่อ hover
          }}
          transition={{
            duration: 0.5, // ระยะเวลาการเปลี่ยนสีเมื่อ hover
          }}
          whileTap={{
            scale: 0.95, // ลดขนาดเล็กลงเมื่อกดปุ่ม
          }}
          className="w-full mt-6 py-3 rounded-md font-semibold"
          style={{
            border: "none",
            cursor: "pointer",
          }}>
          Proceed to Checkout
        </motion.button>
      </div>
    </div>
  );
}
