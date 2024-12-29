"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { OrderStatus } from "./Order.interface";

export const OrderStatusBar = () => {
  const searchParams = useSearchParams();
  const orderStatus = searchParams.get("status") || OrderStatus.All;

  const [activeStatus, setActiveStatus] = useState(orderStatus);

  const statusFlow = [
    { status: OrderStatus.All, text: "ทั้งหมด" },
    { status: OrderStatus.Unpaid, text: "ยังไม่ชำระเงิน" },
    { status: OrderStatus.InProcess, text: "กำลังดำเนินการ" },
    { status: OrderStatus.Delivered, text: "ที่ต้องได้รับ" },
    { status: OrderStatus.Successfully, text: "สำเร็จ" },
    { status: OrderStatus.Cancelled, text: "ยกเลิก" },
    { status: OrderStatus.Refunded, text: "คืนเงิน" },
  ];

  const fetchOrder = async (status: OrderStatus) => {
    window.location.href = `/profile/order?status=${status}`;

    setActiveStatus(status);
  };

  return (
    <div className="w-full h-16 bg-white shadow-md rounded-sm">
      <div className="flex justify-between items-center gap-2 p-4 w-full h-full">
        {statusFlow.map((status) => (
          <div key={status.status}>
            <button
              onClick={() => fetchOrder(status.status)}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                status.status === activeStatus
                  ? "text-[#257180] "
                  : "text-gray-600"
              } hover:bg-gray-200`}>
              <span className="capitalize">{status.text}</span>
              <hr
                className={`mt-1 rounded-md transition-colors duration-200 ${
                  status.status === activeStatus
                    ? "bg-[#257180] h-1"
                    : "bg-transparent h-0 border-none"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
