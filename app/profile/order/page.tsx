import React from "react";

import { getUserOrders } from "./components/action";
import Container from "./components/container";

import { OrderStatus } from "@/interface/Order";
import { OrderStatusBar } from "./components/orderStatus";

export default async function page({
  searchParams,
}: {
  searchParams: { status: string };
}) {
  const orderStatus = searchParams.status || OrderStatus.All;

  const orders = await getUserOrders({
    orderStatus: orderStatus,
    page: 1,
  });

  const orderList = orders.orders;
  const totalOrders = orders.total_items;
  const totalPage = orders.total_page;
  const currentPage = orders.page_now;

  return (
    <div className="w-full h-full space-y-4">
      <OrderStatusBar />
      <section className="w-full">
        <div className="flex flex-col gap-4">
          <Container
            orders={orderList}
            totalOrders={totalOrders}
            totalPage={totalPage}
            currentPage={currentPage}
          />
        </div>
      </section>
    </div>
  );
}
