"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { OrderStatus } from "./Order.interface";

export const OrderStatusBar = () => {
  const searchParams = useSearchParams();
  const orderStatus = searchParams.get("status") || OrderStatus.All;

  const [activeStatus, setActiveStatus] = useState(orderStatus);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen) {
        const dropdown = document.getElementById("status-dropdown");
        if (dropdown && !dropdown.contains(event.target as Node)) {
          setIsDropdownOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

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
    setIsDropdownOpen(false);
  };

  const activeStatusText = statusFlow.find(
    (status) => status.status === activeStatus,
  )?.text;

  return (
    <div className="w-full bg-white shadow-md rounded-sm">
      {/* Mobile Dropdown */}
      <div className="md:hidden relative" id="status-dropdown">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full p-4 flex items-center justify-between text-left">
          <span className={`text-[#257180] font-medium`}>
            {activeStatusText}
          </span>
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-sm z-50 max-h-64 overflow-y-auto">
            {statusFlow.map((status) => (
              <button
                key={status.status}
                onClick={() => fetchOrder(status.status)}
                className={`w-full px-4 py-3 text-left transition-colors ${
                  status.status === activeStatus
                    ? "bg-gray-100 text-[#257180]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}>
                {status.text}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:block h-16">
        <div className="flex justify-between items-center gap-2 p-4 h-full">
          {statusFlow.map((status) => (
            <div key={status.status}>
              <button
                onClick={() => fetchOrder(status.status)}
                className={`px-4 py-2 rounded-md transition-colors duration-200 whitespace-nowrap ${
                  status.status === activeStatus
                    ? "text-[#257180]"
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
    </div>
  );
};
