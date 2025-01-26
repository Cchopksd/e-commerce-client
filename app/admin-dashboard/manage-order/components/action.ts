"use server";
import { decryptToken, getToken } from "@/app/utils/token";

export const fetchAllOrders = async (order_status: string, page: number) => {
  const token = await getToken();
  const hostname = process.env.HOST_NAME;

  const userInfo = await decryptToken(token);
  const user_id = userInfo?.sub;

  if (!user_id) {
    console.error("User ID not found in the token");
    return [];
  }

  if (userInfo && userInfo?.role !== "admin") {
    console.error("Unauthorized access");
    return [];
  }

  try {
    const resource = await fetch(
      `${hostname}/order/all-order?order_status=${order_status}&page=${page}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!resource.ok) {
      const errorText = await resource.text();
      console.error(`Error fetching cart: ${resource.status} ${errorText}`);
      return [];
    }

    const result = await resource.json();

    if (result.statusCode === 401) {
      console.warn("Unauthorized access, returning empty cart");
      return [];
    }

    return result.detail;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
};
