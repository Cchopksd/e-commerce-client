"use client";
import React, { useState } from "react";
import {
  Package,
  MapPin,
  CreditCard,
  Clock,
  Truck,
  CheckCircle,
  Star,
} from "lucide-react";
import Image from "next/image";
import ReviewModal from "./Review"; // Import the new ReviewModal component

interface ShippingAddress {
  name: string;
  province: string;
  district: string;
  subdistrict: string;
  post_id: number;
  detail: string;
}

interface ProductDetails {
  _id: string;
  name: string;
  images: string;
  price: number;
  discount: number;
  category?: string;
}

interface Product {
  product: ProductDetails;
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
  user_id: string;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, user_id }) => {
  console.log(order)
  // State to control the review modal
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  interface SelectedProduct {
    product_id: string;
    user_id: string;
    image: string;
    name: string;
  }

  const [selectedProduct, setSelectedProduct] = useState<
    SelectedProduct | undefined
  >();

  // Function to open the review modal with the selected product
  const handleOpenReviewModal = ({
    product_id,
    user_id,
    image,
    name,
  }: {
    product_id: string;
    user_id: string;
    image: string;
    name: string;
  }) => {
    setSelectedProduct({ product_id, user_id, image, name });
    setIsReviewModalOpen(true);
  };

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "unpaid":
        return <Clock className='w-5 h-5' />;
      case "paid":
        return <CheckCircle className='w-5 h-5' />;
      case "in-process":
        return <Package className='w-5 h-5' />;
      case "delivered":
        return <Truck className='w-5 h-5' />;
      default:
        return <Clock className='w-5 h-5' />;
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

  // Calculate subtotal, discount, and total
  const calculateOrderSummary = () => {
    const subtotal = order.products.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const actualTotal = order.products.reduce(
      (sum, item) => sum + item.price_at_purchase * item.quantity,
      0
    );

    const discount = subtotal - actualTotal;

    return {
      subtotal,
      discount,
      total: order.order_detail.payment_id.amount / 100,
    };
  };

  const { subtotal, discount, total } = calculateOrderSummary();

  // Check if order is eligible for reviews
  const canReview =
    order.order_detail.status === "delivered" ||
    order.order_detail.status === "successfully";

  return (
    <div className='max-w-3xl mx-auto py-6 px-4 sm:px-6 space-y-6'>
      {/* Order Status Header */}
      <div className='bg-white rounded-xl shadow overflow-hidden'>
        <div className='bg-gradient-to-r from-blue-50 to-blue-100 p-6'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
            <div>
              <h1 className='text-2xl font-bold text-gray-800'>
                รายละเอียดคำสั่งซื้อ
              </h1>
              <p className='text-gray-600 mt-1'>
                สถานะคำสั่งซื้อ:
                <span
                  className={`ml-2 font-medium ${
                    order.order_detail.status === "cancelled" ||
                    order.order_detail.status === "failed"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}>
                  {getStatusText(order.order_detail.status)}
                </span>
              </p>
            </div>
            <div
              className={`flex items-center p-3 rounded-lg ${getStatusColor(
                order.order_detail.status
              )}`}>
              {getStatusIcon(order.order_detail.status)}
              <span className='font-medium ml-2'>
                {getStatusText(order.order_detail.status)}
              </span>
            </div>
          </div>
        </div>

        {/* Order Progress Tracking */}
        {order.order_detail.status !== "cancelled" &&
          order.order_detail.status !== "failed" && (
            <div className='px-6 py-4 border-b border-gray-200'>
              <div className='flex justify-between items-center relative'>
                <div className='flex flex-col items-center'>
                  <div
                    className={`rounded-full w-8 h-8 flex items-center justify-center ${
                      order.order_detail.status !== "unpaid"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200"
                    }`}>
                    <CheckCircle className='w-5 h-5' />
                  </div>
                  <span className='text-xs mt-1 text-center'>ชำระเงิน</span>
                </div>
                <div className='flex-1 h-1 mx-2 bg-gray-200'>
                  <div
                    className='h-full bg-green-500'
                    style={{
                      width:
                        order.order_detail.status === "unpaid"
                          ? "0%"
                          : order.order_detail.status === "paid"
                          ? "33%"
                          : order.order_detail.status === "in-process"
                          ? "100%"
                          : "100%",
                    }}
                  />
                </div>
                <div className='flex flex-col items-center'>
                  <div
                    className={`rounded-full w-8 h-8 flex items-center justify-center ${
                      order.order_detail.status === "in-process" ||
                      order.order_detail.status === "delivered" ||
                      order.order_detail.status === "successfully"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200"
                    }`}>
                    <Package className='w-5 h-5' />
                  </div>
                  <span className='text-xs mt-1 text-center'>จัดส่ง</span>
                </div>
                <div className='flex-1 h-1 mx-2 bg-gray-200'>
                  <div
                    className='h-full bg-green-500'
                    style={{
                      width:
                        order.order_detail.status === "unpaid" ||
                        order.order_detail.status === "paid"
                          ? "0%"
                          : order.order_detail.status === "in-process"
                          ? "50%"
                          : "100%",
                    }}
                  />
                </div>
                <div className='flex flex-col items-center'>
                  <div
                    className={`rounded-full w-8 h-8 flex items-center justify-center ${
                      order.order_detail.status === "delivered" ||
                      order.order_detail.status === "successfully"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200"
                    }`}>
                    <Truck className='w-5 h-5' />
                  </div>
                  <span className='text-xs mt-1 text-center'>ได้รับสินค้า</span>
                </div>
              </div>
            </div>
          )}

        {/* Expiry Information */}
        {order.order_detail.status === "unpaid" &&
          order.order_detail.payment_id.expires_at && (
            <div className='bg-yellow-50 p-4 flex items-center'>
              <Clock className='w-5 h-5 text-yellow-700 mr-2' />
              <p className='text-sm text-yellow-700'>
                <span className='font-medium'>หมดเขตชำระเงิน:</span>{" "}
                {formatDate(order.order_detail.payment_id.expires_at)}
              </p>
            </div>
          )}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Products Section - Wider Column */}
        <div className='md:col-span-2 space-y-6'>
          {/* Products Section */}
          <div className='bg-white rounded-xl shadow overflow-hidden'>
            <div className='p-4 border-b border-gray-200 bg-gray-50'>
              <h2 className='text-lg font-semibold flex items-center gap-2'>
                <Package className='w-5 h-5 text-blue-600' />
                รายการสินค้า
              </h2>
            </div>
            <div className='divide-y divide-gray-100'>
              {order.products.map((product, index) => (
                <div
                  key={index}
                  className='p-4 hover:bg-gray-50 transition duration-150'>
                  <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4'>
                    <div className='w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden relative'>
                      <Image
                        src={product.product.images[0]}
                        alt={product.product.name}
                        fill
                        className='object-cover'
                      />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <h3 className='font-medium text-gray-900'>
                        {product.product.name}
                      </h3>
                      {product.product.category && (
                        <span className='text-sm text-gray-500 mt-1 block'>
                          หมวดหมู่: {product.product.category}
                        </span>
                      )}
                      <div className='mt-2 flex flex-wrap items-center gap-x-4 gap-y-1'>
                        <div className='flex items-center'>
                          <span className='text-sm text-gray-500 mr-1'>
                            ราคา:
                          </span>
                          <span className='text-sm line-through text-gray-500 mr-2'>
                            ฿{product.product.price.toLocaleString()}
                          </span>
                          <span className='font-medium text-green-600'>
                            ฿{product.price_at_purchase.toLocaleString()}
                          </span>
                        </div>
                        <div className='flex items-center'>
                          <span className='text-sm text-gray-500 mr-1'>
                            จำนวน:
                          </span>
                          <span className='font-medium'>
                            {product.quantity.toLocaleString()}
                          </span>
                        </div>
                        <div className='flex items-center'>
                          <span className='text-sm text-gray-500 mr-1'>
                            รวม:
                          </span>
                          <span className='font-medium'>
                            ฿
                            {(
                              product.price_at_purchase * product.quantity
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Review Button */}
                      {canReview && (
                        <button
                          onClick={() =>
                            handleOpenReviewModal({
                              product_id: product.product._id,
                              user_id: user_id,
                              image: product.product.images[0],
                              name: product.product.name,
                            })
                          }
                          className='mt-3 flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition duration-150'>
                          <Star className='w-4 h-4 mr-1' />
                          รีวิวสินค้า
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address Section */}
          <div className='bg-white rounded-xl shadow overflow-hidden'>
            <div className='p-4 border-b border-gray-200 bg-gray-50'>
              <h2 className='text-lg font-semibold flex items-center gap-2'>
                <MapPin className='w-5 h-5 text-blue-600' />
                ที่อยู่จัดส่ง
              </h2>
            </div>
            <div className='p-4'>
              <div className='flex flex-col md:flex-row md:items-start gap-4'>
                <div className='bg-blue-50 p-3 rounded-lg md:pt-1'>
                  <MapPin className='w-8 h-8 text-blue-500' />
                </div>
                <div className='space-y-1'>
                  <p className='font-medium text-gray-900'>
                    {order.order_detail.shipping_address.name}
                  </p>
                  <p className='text-gray-600'>
                    {order.order_detail.shipping_address.detail}
                  </p>
                  <p className='text-gray-600'>
                    {order.order_detail.shipping_address.subdistrict}{" "}
                    {order.order_detail.shipping_address.district}
                  </p>
                  <p className='text-gray-600'>
                    {order.order_detail.shipping_address.province}{" "}
                    {order.order_detail.shipping_address.post_id}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Section - Side Column */}
        <div className='md:col-span-1'>
          <div className='bg-white rounded-xl shadow overflow-hidden sticky top-24'>
            <div className='p-4 border-b border-gray-200 bg-gray-50'>
              <h2 className='text-lg font-semibold flex items-center gap-2'>
                <CreditCard className='w-5 h-5 text-blue-600' />
                ข้อมูลการชำระเงิน
              </h2>
            </div>
            <div className='p-4 space-y-3'>
              <div className='flex justify-between items-center'>
                <span className='text-gray-600'>วิธีการชำระเงิน</span>
                <span className='font-medium'>
                  {order.order_detail.payment_id.payment_method}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-gray-600'>สถานะ</span>
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium ${
                    order.order_detail.payment_id.status === "paid"
                      ? "bg-green-100 text-green-700"
                      : order.order_detail.payment_id.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}>
                  {order.order_detail.payment_id.status === "pending"
                    ? "รอการชำระเงิน"
                    : "ชำระเงินแล้ว"}
                </span>
              </div>

              {order.order_detail.payment_id.paid_at && (
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600'>วันที่ชำระเงิน</span>
                  <span className='font-medium'>
                    {formatDate(order.order_detail.payment_id.paid_at)}
                  </span>
                </div>
              )}

              <div className='pt-3 mt-3 border-t border-gray-200 space-y-2'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-600'>ราคาสินค้ารวม</span>
                  <span className='font-medium'>
                    ฿{subtotal.toLocaleString()}
                  </span>
                </div>

                {discount > 0 && (
                  <div className='flex justify-between items-center'>
                    <span className='text-gray-600'>ส่วนลด</span>
                    <span className='font-medium text-green-600'>
                      -฿{discount.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className='flex justify-between items-center'>
                  <span className='text-gray-600'>ค่าจัดส่ง</span>
                  <span className='font-medium'>
                    {total - (subtotal - discount) > 0
                      ? `฿${(total - (subtotal - discount)).toLocaleString()}`
                      : "ฟรี"}
                  </span>
                </div>
              </div>

              <div className='pt-3 mt-3 border-t border-gray-200'>
                <div className='flex justify-between items-center'>
                  <span className='font-semibold text-gray-900'>
                    ยอดรวมทั้งหมด
                  </span>
                  <span className='font-semibold text-lg text-blue-600'>
                    ฿{total.toLocaleString()}
                  </span>
                </div>
              </div>

              {order.order_detail.status === "unpaid" && (
                <div className='pt-4'>
                  <button className='w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-150'>
                    ชำระเงิน
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {selectedProduct && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default OrderDetails;
