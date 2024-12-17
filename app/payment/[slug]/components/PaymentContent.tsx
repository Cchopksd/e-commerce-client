"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { intervalToDuration, format } from "date-fns";
import { th } from "date-fns/locale";

interface TransactionDetails {
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

export default function PaymentContent({
  paymentDetail,
}: {
  paymentDetail: Payment;
}) {
  const expirationDate = paymentDetail?.transaction_details?.expires_at;
  const imageSrc = paymentDetail?.transaction_details?.image;

  const formattedExpirationDate = expirationDate
    ? format(new Date(expirationDate), "dd MMM yyyy, HH : mm", { locale: th })
    : "N/A";

  const calculateTimeLeft = () => {
    if (!expirationDate) return "00:00:00";

    const now = new Date();
    const expirationTime = new Date(expirationDate);

    if (now >= expirationTime) {
      return "expired";
    }

    const durationLeft = intervalToDuration({
      start: now,
      end: expirationTime,
    });

    const hours = String(durationLeft.hours || 0).padStart(2, "0");
    const minutes = String(durationLeft.minutes || 0).padStart(2, "0");
    const seconds = String(durationLeft.seconds || 0).padStart(2, "0");

    return `${hours} : ${minutes} : ${seconds}`;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expirationDate]);

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md lg:max-w-2xl rounded-xl shadow-lg overflow-hidden">
        {/* Payment Amount Section */}
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

        {/* Expiration Section */}
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

        {/* QR Code Section */}
        {imageSrc && timeLeft !== "expired" && (
          <div className="p-4 flex justify-center">
            <div className="w-full max-w-64 lg:max-w-80 h-full bg-white p-4 rounded-lg shadow-md">
              <Image
                src={imageSrc}
                alt="Payment QR Code"
                width={0}
                height={0}
                className="object-contain w-full h-full"
                priority
              />
            </div>
          </div>
        )}

        {/* Payment Instructions Section */}
        <div className="bg-gray-50 p-4">
          <h4 className="text-lg font-semibold mb-4 text-center">
            กรุณาทำตามขั้นตอนที่แนะนำ
          </h4>
          <ol className="list-decimal list-inside space-y-3 text-sm text-gray-700">
            <li>คลิกปุ่ม &quot;บันทึก QR&quot; หรือแคปหน้าจอ</li>
            <li>เปิดแอปพลิเคชันธนาคารบนอุปกรณ์ของท่าน</li>
            <li>
              เลือกไปที่ปุ่ม &quot;สแกน&quot; หรือ &quot;QR Code&quot; และเลือก
              &quot;รูปภาพ&quot;
            </li>
            <li>
              เลือกรูปภาพที่ท่านแคปไว้และทำการชำระเงิน
              โดยตรวจสอบชื่อบัญชีผู้รับคือ &quot;
              &quot;
            </li>
            <li>
              หลังจากชำระเงินเสร็จสิ้น กรุณากลับไปตรวจสอบสถานะการชำระเงินในแอป
               หากสถานะยังไม่มีการอัปเดต กรุณาติดต่อฝ่ายลูกค้าสัมพันธ์
               ที่เบอร์ 
            </li>
            <li>
              <strong>หมายเหตุ:</strong> QR สามารถสแกนได้เพียง 1
              ครั้งต่อการชำระเงิน หากต้องการสแกนใหม่ โปรดรีเฟรช QR ก่อน
            </li>
          </ol>

          <div className="mt-4 bg-yellow-50 p-3 rounded-md text-xs text-gray-600 text-center">
            <p>** หมายเหตุเพิ่มเติม: **</p>
            <p>
              ช่องทางการชำระเงินพร้อมเพย์สามารถใช้ได้กับแอปพลิเคชันธนาคารเท่านั้น
            </p>
            <p>ไม่สามารถชำระผ่านสาขาธนาคารหรือตู้เอทีเอ็มได้</p>
          </div>
        </div>
      </div>
    </div>
  );
}
