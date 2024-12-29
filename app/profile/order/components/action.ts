"use server";

import { getToken } from "@/app/utils/token";

export async function getUserOrders({
  userId,
  orderStatus,
  page,
  token,
}: {
  userId: string;
  orderStatus: string;
  page: number;
  token: string;
}) {
  try {
    const response = await fetch(`${process.env.HOST_NAME}/order/order-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: userId,
        order_status: orderStatus,
        page,
      }),
    });
    const result = await response.json();
    return result.detail;
  } catch (error) {
    console.log(error);
  }
}

export async function updateOrderReceived(order_id: string) {
  const token = await getToken();

  try {
    const response = await fetch(
      `${process.env.HOST_NAME}/order/confirm-order-received`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          order_id: order_id,
        }),
      },
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}
