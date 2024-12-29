"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import {
  updateDelivering,
  updateOrderStatusValue,
} from "@/libs/features/admin/manageOrderSlice";
import { updateOrderStatus } from "./action";
import { OrderStatus } from "@/app/profile/order/components/Order.interface";
import { ShippingProvider } from "../enum/shippingProvider";

export default function Shipping({
  isUpdatingDelivering,
  setIsUpdatingDelivering,
  orderId,
}: {
  isUpdatingDelivering: boolean;
  setIsUpdatingDelivering: (value: boolean) => void;
  orderId: string;
}) {
  const dispatch = useAppDispatch();

  const { trackingNumberValue, shippingCompanyValue } = useAppSelector(
    (state) => state.manageOrder,
  );

  const [trackingNumber, setTrackingNumber] = useState(
    trackingNumberValue || "",
  );
  const [shippingCompany, setShippingCompany] = useState(
    shippingCompanyValue || "",
  );

  const [message, setMessage] = useState("");

  const handleUpdateDelivering = async () => {
    if (trackingNumber === "" || shippingCompany === "") {
      return setMessage("กรุณาระบุเลขพัสดุและบริษัทขนส่ง");
    }
    dispatch(updateDelivering({ trackingNumber, shippingCompany }));
    const result = await updateOrderStatus({
      orderId,
      status: OrderStatus.Delivered,
      shipping_provider: shippingCompany,
      tracking_id: trackingNumber,
    });
    if (result) {
      dispatch(updateOrderStatusValue(result.status));
    }
    setIsUpdatingDelivering(false);
  };

  return (
    <div className="w-full">
      {isUpdatingDelivering && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                อัพเดทสถานะการจัดส่ง
              </h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-sm font-medium text-gray-700">
                  เลขพัสดุ
                </label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="ระบุเลขพัสดุ"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-sm font-medium text-gray-700">
                  ขนส่ง
                </label>
                <select
                  value={shippingCompany}
                  onChange={(e) => setShippingCompany(e.target.value)}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="" disabled>
                    เลือกบริษัทขนส่ง
                  </option>
                  <option value={ShippingProvider.Flash}>Flash Express</option>
                  <option value={ShippingProvider.Kerry}>Kerry Express</option>
                  <option value={ShippingProvider.ThaiPost}>ไปรษณีย์ไทย</option>
                  <option value={ShippingProvider.JTExpress}>JT Express</option>
                </select>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t flex gap-4 w-full">
              {message && <p className="text-red-500">{message}</p>}
              <div className="flex justify-end gap-2 w-full">
                <button
                  onClick={() => setIsUpdatingDelivering(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  ยกเลิก
                </button>
                <button
                  onClick={handleUpdateDelivering}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  เริ่มการขนส่ง
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
