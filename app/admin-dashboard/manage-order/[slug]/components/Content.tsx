"use client";
import React from "react";
import Image from "next/image";
import { useAppSelector } from "@/libs/hooks";

const getStatusDisplay = (status: string) => {
  const statusConfig: Record<string, { text: string; className: string }> = {
    paid: { text: "ชำระเงินแล้ว", className: "bg-green-100 text-green-800" },
    unpaid: {
      text: "ยังไม่ชำระเงิน",
      className: "bg-yellow-100 text-yellow-800",
    },
    preparing: {
      text: "กำลังจัดเตรียม",
      className: "bg-blue-100 text-blue-800",
    },
    cancelled: { text: "ยกเลิก", className: "bg-red-100 text-red-800" },
    delivering: {
      text: "กำลังจัดส่ง",
      className: "bg-indigo-100 text-indigo-800",
    },
    delivered: { text: "จัดส่งแล้ว", className: "bg-green-100 text-green-800" },
    refunded: {
      text: "คืนเงินแล้ว",
      className: "bg-orange-100 text-orange-800",
    },
    failed: { text: "ล้มเหลว", className: "bg-red-100 text-red-800" },
    successfully: { text: "สำเร็จ", className: "bg-green-100 text-green-800" },
    pending: {
      text: "รอดำเนินการ",
      className: "bg-yellow-100 text-yellow-800",
    },
  };

  return (
    statusConfig[status] || {
      text: status,
      className: "bg-gray-100 text-gray-800",
    }
  );
};

export default function OrderContent({ orderData }: { orderData: any }) {
  const { order_detail, payment_detail, products } = orderData;

  const orderStatusValue = useAppSelector(
    (state) => state.manageOrder.orderStatusValue,
  );

  const [effectiveOrderStatus, setEffectiveOrderStatus] = React.useState(
    order_detail.status || orderStatusValue,
  );

  const formatPrice = (price: number) => {
    return price.toLocaleString("th-TH", {
      style: "currency",
      currency: "THB",
    });
  };

  const formatPriceOmise = (price: number) => {
    const priceInBaht = price / 100;
    return priceInBaht.toLocaleString("th-TH", {
      style: "currency",
      currency: "THB",
    });
  };

  React.useEffect(() => {
    setEffectiveOrderStatus(orderStatusValue || order_detail.status);
  }, [orderStatusValue, order_detail.status]);

  return (
    <>
      {" "}
      {/* ส่วนรายละเอียดออเดอร์ */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">รายละเอียดออเดอร์</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-gray-600">
                รหัสออเดอร์:{" "}
                <span className="text-gray-900">{order_detail._id}</span>
              </p>
              <p className="text-gray-600">
                วันที่สั่งซื้อ:{" "}
                <span className="text-gray-900">
                  {new Date(order_detail.createdAt).toLocaleDateString(
                    "th-TH",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    },
                  )}
                </span>
              </p>
              <p className="text-gray-600">
                สถานะ:
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-sm ${
                    getStatusDisplay(effectiveOrderStatus).className
                  }`}>
                  {getStatusDisplay(effectiveOrderStatus).text}
                </span>
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">
                ชื่อผู้สั่ง:{" "}
                <span className="text-gray-900">
                  {order_detail.user_id.first_name}{" "}
                  {order_detail.user_id.last_name}
                </span>
              </p>
              <p className="text-gray-600">
                อีเมล:{" "}
                <span className="text-gray-900">
                  {order_detail.user_id.email}
                </span>
              </p>
              <p className="text-gray-600">
                เบอร์โทร:{" "}
                <span className="text-gray-900">
                  {order_detail.user_id.phone}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ส่วนที่อยู่จัดส่ง */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">ที่อยู่จัดส่ง</h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              ชื่อสถานที่:{" "}
              <span className="text-gray-900">
                {order_detail.shipping_address.name}
              </span>
            </p>
            <p className="text-gray-600">
              ที่อยู่:{" "}
              <span className="text-gray-900">
                {order_detail.shipping_address.detail}
              </span>
            </p>
            <p className="text-gray-600">
              แขวง/ตำบล:{" "}
              <span className="text-gray-900">
                {order_detail.shipping_address.subdistrict}
              </span>
            </p>
            <p className="text-gray-600">
              เขต/อำเภอ:{" "}
              <span className="text-gray-900">
                {order_detail.shipping_address.district}
              </span>
            </p>
            <p className="text-gray-600">
              จังหวัด:{" "}
              <span className="text-gray-900">
                {order_detail.shipping_address.province}
              </span>
            </p>
            <p className="text-gray-600">
              รหัสไปรษณีย์:{" "}
              <span className="text-gray-900">
                {order_detail.shipping_address.post_id}
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* ส่วนรายการสินค้า */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">รายการสินค้า</h2>
          <div className="space-y-4">
            {products.map((item: any) => (
              <div
                key={item._id}
                className="flex justify-between items-center py-2 border-b last:border-b-0">
                <div className="space-y-1">
                  <div className="flex gap-4">
                    <Image
                      src={item.product_id.images[0].image_url}
                      alt={item.product_id.name}
                      width={50}
                      height={50}
                    />
                    <p className="font-medium items-start text-gray-900">
                      {item.product_id.name}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    หมวดหมู่: {item.product_id.category}
                  </p>
                  <p className="text-sm text-gray-500">
                    จำนวน: {item.quantity} ชิ้น
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {formatPrice(item.price_at_purchase * item.quantity)}
                  </p>
                  <p className="text-sm text-gray-500">
                    ราคาเต็ม:{" "}
                    <span className="line-through">
                      {formatPrice(item.product_id.price * item.quantity)}
                    </span>
                  </p>
                  {/* <p className="text-sm text-green-600">
                    ส่วนลด:{" "}
                    {formatPrice(item.price_at_purchase * item.quantity)}
                  </p> */}
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-gray-200">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">ราคารวมสินค้า</p>
                  <p className="text-gray-900">
                    {formatPriceOmise(payment_detail.amount)}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">ค่าจัดส่ง</p>
                  <p className="text-gray-900">฿0.00</p>
                </div>
                <div className="flex justify-between items-center font-semibold">
                  <p className="text-gray-900">ยอดรวมทั้งสิ้น</p>
                  <p className="text-gray-900">
                    {formatPriceOmise(payment_detail.amount)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ส่วนข้อมูลการชำระเงิน */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">ข้อมูลการชำระเงิน</h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              รหัสธุรกรรม:{" "}
              <span className="text-gray-900">{payment_detail.id}</span>
            </p>
            <p className="text-gray-600">
              รหัสอ้างอิง 1:{" "}
              <span className="text-gray-900">
                {payment_detail.source?.provider_references
                  ?.reference_number_1 || "-"}
              </span>
            </p>
            <p className="text-gray-600">
              วิธีการชำระเงิน:{" "}
              <span className="text-gray-900 capitalize">
                {order_detail.payment_id.payment_method}
              </span>
            </p>
            <p className="text-gray-600">
              สถานะการชำระเงิน:
              <span
                className={`ml-2 px-2 py-1 rounded-full text-sm ${
                  payment_detail.status === "successful"
                    ? "bg-green-100 text-green-800"
                    : payment_detail.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}>
                {payment_detail.status === "successful"
                  ? "ชำระเงินสำเร็จ"
                  : payment_detail.status === "pending"
                  ? "รอการชำระเงิน"
                  : "ไม่สำเร็จ"}
              </span>
            </p>
            <p className="text-gray-600">
              อีเมลผู้ชำระเงิน:{" "}
              <span className="text-gray-900">
                {payment_detail.source?.email || "-"}
              </span>
            </p>
            <p className="text-gray-600">
              IP Address:{" "}
              <span className="text-gray-900">
                {payment_detail.source?.ip || "-"}
              </span>
            </p>

            {/* ข้อมูลการเงิน */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-medium mb-2">รายละเอียดการเงิน</h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  จำนวนเงินทั้งหมด:{" "}
                  <span className="text-gray-900">
                    {formatPriceOmise(payment_detail.amount)}
                  </span>
                </p>
                <p className="text-gray-600">
                  ค่าธรรมเนียม:{" "}
                  <span className="text-gray-900">
                    {formatPriceOmise(payment_detail.fee)} (
                    {(
                      (payment_detail.fee / payment_detail.amount) *
                      100
                    ).toFixed(2)}
                    %)
                  </span>
                </p>
                <p className="text-gray-600">
                  ภาษีมูลค่าเพิ่ม:{" "}
                  <span className="text-gray-900">
                    {formatPriceOmise(payment_detail.fee_vat)} (
                    {(
                      (payment_detail.fee_vat / payment_detail.amount) *
                      100
                    ).toFixed(2)}
                    %)
                  </span>
                </p>
                <p className="text-gray-600">
                  ค่าธรรมเนียมรวม:{" "}
                  <span className="text-gray-900">
                    {formatPriceOmise(
                      payment_detail.fee + payment_detail.fee_vat,
                    )}{" "}
                    (
                    {(
                      ((payment_detail.fee + payment_detail.fee_vat) /
                        payment_detail.amount) *
                      100
                    ).toFixed(2)}
                    %)
                  </span>
                </p>
                <p className="text-gray-600">
                  ยอดรวมที่ได้รับ:{" "}
                  <span className="text-gray-900 font-medium">
                    {formatPriceOmise(payment_detail.net)} (
                    {(
                      (payment_detail.net / payment_detail.amount) *
                      100
                    ).toFixed(2)}
                    %)
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
