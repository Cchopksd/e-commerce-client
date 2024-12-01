import { decryptToken, getToken } from "@/app/utils/token";
import React from "react";
import { getUserOrders } from "./components/action";
import Container from "./components/container";
import { OrderStatusBar } from "./components/orderStatus";
import { OrderStatus } from "./components/Order.interface";

export default async function page({
  searchParams,
}: {
  searchParams: { status: string };
}) {
  const token = await getToken();
  const userInfo = await decryptToken(token);
  if (!token || !userInfo) {
    return <div>No user info</div>;
  }

  const orderStatus = searchParams.status || OrderStatus.All;

  const orders = await getUserOrders({
    userId: userInfo.sub,
    orderStatus: orderStatus,
    page: 1,
    token,
  });

  const orderList = orders.orders;
  const totalOrders = orders.total_items;
  const totalPage = orders.total_page;
  const currentPage = orders.page_now;

  return (
    <div className="w-full h-full space-y-4">
      <OrderStatusBar />
      <div className="flex flex-col gap-4">
        <Container
          userId={userInfo.sub}
          token={token}
          orders={orderList}
          totalOrders={totalOrders}
          totalPage={totalPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
