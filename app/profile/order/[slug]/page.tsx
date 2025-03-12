import React from "react";
import OrderDetails from "./components/Container";
import { fetchOrderByID, fetchReviewByOrderID } from "./components/action";

export default async function page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  let getReview;
  const order = await fetchOrderByID({ order_id: slug });
  if (order.order_detail.status === "successfully") {
    getReview = await fetchReviewByOrderID({ order_id: slug });
  }
  return (
    <>
      <OrderDetails
        order={order}
        user_id={order.order_detail.user_id._id}
      />
    </>
  );
}
