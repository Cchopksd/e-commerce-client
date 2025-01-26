import React from "react";
import { getOrderById } from "./components/action";
import Toolbar from "./components/Toolbar";
import OrderContent from "./components/Content";

export default async function ManageOrderPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const orderData = await getOrderById(slug);
  const { order_detail } = orderData;

  return (
    <div className="p-6 space-y-6">
      <Toolbar orderStatus={order_detail.status} orderId={order_detail._id} />
      <OrderContent orderData={orderData} />
    </div>
  );
}
