'use server'
import React from "react";
import { getPaymentDetail } from "./components/action";
import PaymentContent from "./components/PaymentContent";

export default async function page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const paymentDetail = await getPaymentDetail(slug);

  return (
    <>
      <PaymentContent paymentDetail={paymentDetail} />
    </>
  );
}
