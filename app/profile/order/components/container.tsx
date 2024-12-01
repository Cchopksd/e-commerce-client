"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { useAppSelector } from "@/libs/hooks";

import { Order, OrderStatus } from "./Order.interface";
import {
  ShoppingCart,
  CreditCard,
  Truck,
  CheckCircle,
  XCircle,
  RefreshCw,
  X,
} from "lucide-react";
import Image from "next/image";
import { RootState } from "@/libs/store";
import { getUserOrders } from "./action";
import { useSearchParams } from "next/navigation";

const getStatusConfig = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.Unpaid:
      return {
        icon: <CreditCard className="text-yellow-600" />,
        color: "bg-yellow-600",
        actionText: "ยังไม่ชำระเงิน",
      };
    case OrderStatus.Paid:
      return {
        icon: <ShoppingCart className="text-blue-600" />,
        color: "bg-green-500",
        actionText: "กำลังดำเนินการ",
      };
    case OrderStatus.Preparing:
      return {
        icon: <ShoppingCart className="text-blue-600" />,
        color: "bg-blue-600",
        actionText: "กำลังดำเนินการ",
      };
    case OrderStatus.Delivering:
      return {
        icon: <Truck className="text-green-600" />,
        color: "bg-green-600",
        actionText: "ที่ต้องได้รับ",
      };
    case OrderStatus.Delivered:
      return {
        icon: <CheckCircle className="text-green-700" />,
        color: "bg-green-700",
        actionText: "สำเร็จ",
      };
    case OrderStatus.Cancelled:
      return {
        icon: <XCircle className="text-red-600" />,
        color: "bg-red-600",
        actionText: "ยกเลิก",
      };
    case OrderStatus.Refunded:
      return {
        icon: <RefreshCw className="text-purple-600" />,
        color: "bg-purple-600",
        actionText: "คืนเงิน",
      };
    default:
      return {
        icon: <X className="text-gray-600" />,
        color: "bg-gray-600",
        actionText: "ไม่ระบุสถานะ",
      };
  }
};

export default function OrderContainer({
  orders,
  totalOrders,
  totalPage,
  currentPage,
  userId,
  token,
}: {
  orders: Order[];
  totalOrders: number;
  totalPage: number;
  currentPage: number;
  userId: string;
  token: string;
}) {
  const { ordersLists } = useAppSelector((state: RootState) => state.orders);
  const searchParams = useSearchParams();
  const orderStatus = searchParams.get("status") || OrderStatus.All;

  const [orderList, setOrderList] = useState<Order[]>(orders || ordersLists);
  const [page, setPage] = useState(currentPage);
  const [loading, setLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadMoreOrders = async () => {
    if (loading || page >= totalPage) return;
    if (orderList.length === 0) return;
    try {
      setLoading(true);
      const response = await getUserOrders({
        userId: userId,
        orderStatus: orderStatus,
        page: page + 1,
        token,
      });

      setOrderList((prev) => [...prev, ...response.orders]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to load more orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMoreOrders();
        }
      },
      { threshold: 0.1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [page, loading, orderStatus]);

  const orderConfigs = useMemo(() => {
    return orderList.map((order) => ({
      statusConfig: getStatusConfig(order.status),
      totalAmount: order.items.reduce(
        (sum, item) => sum + item.price_at_purchase * item.quantity,
        0,
      ),
    }));
  }, [orderList]);

  return (
    <section className="w-full h-full flex flex-col gap-4">
      {orderList.length > 0 ? (
        orderList.map((order, index) => {
          const { statusConfig, totalAmount } = orderConfigs[index];

          return (
            <div key={order._id}>
              <div className="w-full bg-white shadow-sm hover:shadow-md transition-shadow duration-200 rounded-xl p-6 flex flex-col gap-6">
                <div className="flex justify-between items-center border-b pb-4">
                  <div className="flex items-center gap-2">
                    {statusConfig.icon}
                    <span className="font-medium text-gray-700">
                      Order ID: {order._id}
                    </span>
                  </div>
                  <span
                    className={`px-4 py-1.5 rounded-full text-white text-sm font-medium ${statusConfig.color}`}>
                    {statusConfig.actionText}
                  </span>
                </div>

                <div className="flex flex-col gap-6">
                  {order.items.map((item) => (
                    <div
                      key={item.product_id._id}
                      className="group flex flex-col gap-2">
                      <div className="flex justify-between items-center hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <div className="flex gap-6 items-center">
                          <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                            <Image
                              src={item.product_id.images[0].image_url}
                              alt={item.product_id.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                          </div>
                          <div>
                            <p className="text-lg font-medium text-gray-800">
                              {item.product_id.name}
                            </p>
                            <p className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                              จำนวน: {item.quantity} ชิ้น
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-400 line-through">
                            ฿{item.product_id.price.toLocaleString()}
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            ฿{item.price_at_purchase.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <hr className="border border-gray-200" />
                    </div>
                  ))}
                </div>

                <div className=" pt-4 mt-2">
                  <div className="flex justify-end gap-4 items-center">
                    <p className="text-lg font-medium text-gray-700">
                      ยอดรวมทั้งหมด
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      ฿{totalAmount.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex justify-end gap-4 mt-6">
                    {order.items.length > 0 && (
                      <a
                        href={`/product/${order.items[0].product_id._id}`}
                        className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        ซื้ออีกครั้ง
                      </a>
                    )}
                    <a
                      href={`/profile/order/${order._id}`}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                      ดูรายละเอียด
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="w-full text-center py-8">
          <p className="text-gray-500 text-lg">ไม่พบรายการคำสั่งซื้อ</p>
        </div>
      )}

      {/* Loading indicator and observer target */}
      <div ref={observerTarget} className="w-full py-4 text-center">
        {loading ? (
          <p className="text-gray-500">กำลังโหลด...</p>
        ) : page < totalPage ? (
          <p className="text-gray-500">เลื่อนลงเพื่อดูเพิ่มเติม</p>
        ) : (
          orderList.length !== 0 && (
            <p className="text-gray-500">ไม่มีรายการเพิ่มเติม</p>
          )
        )}
      </div>
    </section>
  );
}