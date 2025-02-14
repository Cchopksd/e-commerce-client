"use client";

import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import { intervalToDuration, format } from "date-fns";
import { th } from "date-fns/locale";
import io from "socket.io-client";

interface TransactionDetails {
  charge_id: string;
  image: string;
  status: string;
  return_uri: string;
  expires_at: string;
}

interface Payment {
  payment_id: string;
  amount: number;
  currency: string;
  status: string;
  payment_method: string;
  created_at: string;
  transaction_details: TransactionDetails;
}

interface PaymentContentProps {
  paymentDetail: Payment;
  userDetail: any;
}

export default function PaymentContent({
  paymentDetail,
  userDetail,
}: PaymentContentProps) {
  const status = paymentDetail.status;
  const [timeLeft, setTimeLeft] = useState<string>("loading...");
  const [error, setError] = useState<string | null>(null);
  const expirationDate = paymentDetail?.transaction_details?.expires_at;
  const imageSrc = paymentDetail?.transaction_details?.image;
  const user_id = userDetail.sub;
  const charge_id = paymentDetail?.transaction_details?.charge_id;

  const formattedExpirationDate = expirationDate
    ? format(new Date(expirationDate), "dd MMM yyyy, HH:mm", { locale: th })
    : "N/A";

  const calculateTimeLeft = useCallback(() => {
    if (!expirationDate || isNaN(new Date(expirationDate).getTime())) {
      return "00:00:00";
    }

    const now = new Date();
    const expirationTime = new Date(expirationDate);

    if (now >= expirationTime) {
      return "expired";
    }

    const duration = intervalToDuration({
      start: now,
      end: expirationTime,
    });

    return `${String(duration.hours || 0).padStart(2, "0")} : ${String(
      duration.minutes || 0
    ).padStart(2, "0")} : ${String(duration.seconds || 0).padStart(2, "0")}`;
  }, [expirationDate]);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft === "expired") {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_HOST_NAME, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      console.log("Connected to WebSocket server:", socket.id);
      socket.emit("register", { user_id, charge_id });
    });

    socket.on(
      "payment-status",
      (data: { status: string; charge_id: string }) => {
        if (data.charge_id === charge_id) {
          console.log("Payment status updated:", data.status);

          if (data.status === "paid") {
            window.location.href = "/profile/order?status=in-process";
          }
        }
      }
    );

    socket.on("connect_error", (err) => {
      console.error("WebSocket connection error:", err);
      setError("Connection error. Please refresh the page.");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    return () => {
      socket.disconnect();
    };
  }, [charge_id, user_id]);

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md lg:max-w-2xl rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-50 p-4 border-b">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">ยอดชำระเงินทั้งหมด</span>
            <span className="text-xl font-bold text-blue-800">
              {(paymentDetail.amount / 100).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              ฿
            </span>
          </div>
        </div>

        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">สถานะการชำระเงิน</span>
            <span
              className={`font-semibold ${
                status === "paid"
                  ? "text-green-600"
                  : status === "pending"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {status === "paid"
                ? "ชำระเงินแล้ว"
                : status === "pending"
                ? "รอการชำระเงิน"
                : "ยกเลิก"}
            </span>
          </div>
        </div>

        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">กรุณาชำระภายใน</span>
            <div className="text-right">
              {timeLeft === "expired" ? (
                <p className="text-red-500 font-semibold">
                  การชำระเงินหมดอายุแล้ว
                </p>
              ) : (
                <div>
                  <p className="text-lg font-bold text-blue-600">
                    คงเหลือ: {timeLeft}
                  </p>
                  <p className="text-sm text-gray-500">
                    วันหมดอายุ: {formattedExpirationDate}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {imageSrc && timeLeft !== "expired" && status !== "paid" && (
          <div className="p-4 flex flex-col items-center">
            <div className="w-full max-w-64 lg:max-w-80 h-full bg-white p-4 rounded-lg shadow-md">
              <Image
                src={imageSrc}
                alt="Payment QR Code"
                width={0}
                height={0}
                className="object-contain w-full h-full"
                priority
                unoptimized
              />
            </div>
          </div>
        )}

        <div className="bg-gray-50 p-4">
          <h4 className="text-lg font-semibold mb-4 text-center">
            ขั้นตอนการชำระเงิน
          </h4>
          <ol className="list-decimal list-inside space-y-3 text-sm text-gray-700">
            <li>บันทึก QR Code หรือถ่ายภาพหน้าจอ</li>
            <li>เปิดแอปพลิเคชันธนาคารของท่าน</li>
            <li>เลือกสแกน QR Code จากรูปภาพที่บันทึกไว้</li>
            <li>ตรวจสอบยอดเงินและทำการชำระเงิน</li>
            <li>รอระบบอัพเดทสถานะการชำระเงิน (ไม่เกิน 1-2 นาที)</li>
          </ol>

          <div className="mt-4 bg-yellow-50 p-3 rounded-md text-xs text-gray-600">
            <p className="text-center font-semibold mb-2">หมายเหตุ:</p>
            <ul className="space-y-1">
              <li>• QR Code สามารถใช้ได้เพียงครั้งเดียวเท่านั้น</li>
              <li>• รองรับการชำระผ่านแอปพลิเคชันธนาคารเท่านั้น</li>
              <li>• ไม่สามารถชำระผ่านสาขาธนาคารหรือตู้ ATM</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
