"use server";

import { decryptToken, getToken } from "@/app/utils/token";

export async function getUserOrders({
  orderStatus,
  page,
}: {
  orderStatus: string;
  page: number;
}) {
  const token = await getToken();
  const userInfo: any = await decryptToken(token);

  try {
    const response = await fetch(`${process.env.HOST_NAME}/order/order-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: userInfo?.sub,
        order_status: orderStatus,
        page,
      }),
    });
    const result = await response.json();
    return result;
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
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export const addToCart = async (product_id: string, quantity: number) => {
  const token = await getToken();
  const userInfo = await decryptToken(token);

  const hostname = process.env.HOST_NAME;

  if (!token || !hostname) {
    console.error("Missing token or hostname");
    return [];
  }
  const user_id = userInfo?.sub;
  try {
    const resource = await fetch(`${hostname}/cart/add-item`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id,
        product_id,
        quantity,
      }),
    });
    const result = await resource.json();
    if (!resource.ok) {
      console.log("Something went wrong");
    }
    return result;
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};
