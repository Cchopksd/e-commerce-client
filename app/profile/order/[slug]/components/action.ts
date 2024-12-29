"use server";

import { getToken } from "@/app/utils/token";

const hostname = process.env.HOST_NAME;

export const fetchOrderByID = async ({ order_id }: { order_id: string }) => {
  const token = await getToken();
  try {
    const resource = await fetch(`${hostname}/order/order-by-id/${order_id}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await resource.json();

    if (!resource.ok) {
      return `HTTP error! status: ${resource.status}`;
    }

    return result.detail;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
