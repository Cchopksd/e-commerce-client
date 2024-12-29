"use server";
import React from "react";
import { getPaymentDetail } from "./components/action";
import PaymentContent from "./components/PaymentContent";
import { decryptToken, getToken } from "@/app/utils/token";

export default async function page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const paymentDetail = await getPaymentDetail(slug);
  const token = await getToken();
  const userDetail = await decryptToken(token);
  return (
    <>
      <PaymentContent paymentDetail={paymentDetail} userDetail={userDetail} />
    </>
  );
}
