"use client";

import { Order } from "@/app/profile/order/components/Order.interface";
import { formatDate } from "@/app/utils/formatDate";
import { useAppSelector } from "@/libs/hooks";
import React, { useEffect, useState } from "react";

export default function Content({ orders }: { orders: Order[] }) {
  const ordersValue = useAppSelector((state) => state.manageOrder.ordersValue);

  const [ordersList, setOrdersList] = useState<Order[]>(orders);

  useEffect(() => {
    if (ordersValue.length > 0) {
      setOrdersList(ordersValue);
    }
  }, [ordersValue]);

  return (
    <div className="overflow-x-auto h-[610px] bg-white shadow-md">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              วันที่สั่งซื้อ
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              สถานะ
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              จำนวนสินค้า
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ราคารวม
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {ordersList.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {order._id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(new Date(order.createdAt))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.items.length}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ฿{calculateTotal(order.items)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                <a
                  href={`/admin-dashboard/manage-order/${order._id}`}
                  className="py-2 px-4 bg-[#257180] text-white rounded-md shadow-md hover:bg-[#257180]/80 transition-colors duration-200">
                  รายละเอียด
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function calculateTotal(items: any[]) {
  return items
    .reduce((sum, item) => sum + item.price_at_purchase * item.quantity, 0)
    .toLocaleString();
}

function getStatusColor(status: string) {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-800";
    case "unpaid":
      return "bg-red-100 text-red-800";
    case "preparing":
      return "bg-yellow-100 text-yellow-800";
    case "delivering":
      return "bg-blue-100 text-blue-800";
    case "delivered":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
