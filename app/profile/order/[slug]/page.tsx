import React from "react";
import OrderDetails from "./components/Container";
import { fetchOrderByID } from "./components/action";

export default async function page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const order = await fetchOrderByID({ order_id: slug });
  return (
    <>
      <OrderDetails order={order} />
    </>
  );
}
