"use client";
import React from "react";
import { Package, MapPin, CreditCard, Clock } from "lucide-react";
import Image from "next/image";

interface ShippingAddress {
  name: string;
  province: string;
  district: string;
  subdistrict: string;
  post_id: number;
  detail: string;
}

interface ProductImage {
  image_url: string;
}

interface ProductDetails {
  name: string;
  images: ProductImage[];
  price: number;
  discount: number;
  category?: string;
}

interface Product {
  product_id: ProductDetails;
  quantity: number;
  price_at_purchase: number;
}

interface Payment {
  amount: number;
  status: string;
  payment_method: string;
  expires_at?: string;
  paid_at?: string;
}

interface OrderDetail {
  status:
    | "unpaid"
    | "paid"
    | "in-process"
    | "cancelled"
    | "delivered"
    | "refund"
    | "refunded"
    | "failed"
    | "successfully";
  shipping_address: ShippingAddress;
  payment_id: Payment;
}

interface Order {
  order_detail: OrderDetail;
  products: Product[];
}

interface OrderDetailsProps {
  order: Order;
}

interface Order {
  order_detail: OrderDetail;
  products: Product[];
}

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "unpaid":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "paid":
        return "text-green-600 bg-green-50 border-green-200";
      case "in-process":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "cancelled":
        return "text-red-600 bg-red-50 border-red-200";
      case "delivered":
        return "text-green-600 bg-green-50 border-green-200";
      case "refund":
      case "refunded":
        return "text-purple-600 bg-purple-50 border-purple-200";
      case "failed":
        return "text-red-600 bg-red-50 border-red-200";
      case "successfully":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case "unpaid":
        return "รอการชำระเงิน";
      case "paid":
        return "ชำระเงินแล้ว";
      case "in-process":
        return "กำลังดำเนินการ";
      case "cancelled":
        return "ยกเลิกแล้ว";
      case "delivered":
        return "จัดส่งแล้ว";
      case "refund":
        return "รอการคืนเงิน";
      case "refunded":
        return "คืนเงินแล้ว";
      case "failed":
        return "ไม่สำเร็จ";
      case "successfully":
        return "สำเร็จ";
      default:
        return "ไม่ระบุสถานะ";
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {/* Order Status */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4">
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full border ${getStatusColor(
              order.order_detail.status,
            )}`}>
            <Clock className="w-4 h-4 mr-2" />
            <span className="font-medium">
              {getStatusText(order.order_detail.status)}
            </span>
          </div>
          {order.order_detail.payment_id.expires_at && (
            <p className="mt-2 text-sm text-gray-500">
              หมดเขตชำระเงิน:{" "}
              {formatDate(order.order_detail.payment_id.expires_at)}
            </p>
          )}
        </div>
      </div>

      {/* Shipping Address Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-600" />
            ที่อยู่จัดส่ง
          </h2>
        </div>
        <div className="p-4 space-y-2">
          <p className="font-medium">
            {order.order_detail.shipping_address.name}
          </p>
          <p className="text-gray-600">
            {order.order_detail.shipping_address.detail}
          </p>
          <p className="text-gray-600">
            {order.order_detail.shipping_address.subdistrict}{" "}
            {order.order_detail.shipping_address.district}
          </p>
          <p className="text-gray-600">
            {order.order_detail.shipping_address.province}{" "}
            {order.order_detail.shipping_address.post_id}
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Package className="w-5 h-5 text-gray-600" />
            รายการสินค้า
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {order.products.map((product, index) => (
            <div key={index} className="p-4 flex items-center gap-4">
              <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden relative">
                <Image
                  src={product.product_id.images[0].image_url}
                  alt={product.product_id.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {product.product_id.name}
                    </h3>
                    {product.product_id.category && (
                      <span className="text-sm text-gray-500 mt-1 block">
                        หมวดหมู่: {product.product_id.category}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="mt-1 flex items-center gap-2 justify-end">
                      <span className="text-sm line-through text-gray-500">
                        ฿{product.product_id.price}
                      </span>
                      <span className="font-medium text-green-600">
                        ฿{product.price_at_purchase}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 mt-1 block">
                      จำนวน: {product.quantity}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-gray-600" />
            ข้อมูลการชำระเงิน
          </h2>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">วิธีการชำระเงิน</span>
            <span className="font-medium">
              {order.order_detail.payment_id.payment_method}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">สถานะ</span>
            <span
              className={`font-medium ${getStatusColor(
                order.order_detail.payment_id.status,
              )}`}>
              {order.order_detail.payment_id.status === "pending"
                ? "รอการชำระเงิน"
                : "ชำระเงินแล้ว"}
            </span>
          </div>
          <div className="pt-4 mt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900">ยอดรวมทั้งหมด</span>
              <span className="font-medium text-lg text-gray-900">
                ฿{order.order_detail.payment_id.amount / 100}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
