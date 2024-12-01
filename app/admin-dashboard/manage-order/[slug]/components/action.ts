"use server";
import { getToken } from "@/app/utils/token";

export const getOrderById = async (orderId: string) => {
  const token = await getToken();
  try {
    const response = await fetch(
      `${process.env.HOST_NAME}/order/order-by-id/${orderId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.detail;
  } catch (error) {
    console.error("Failed to fetch order:", error);
    throw error;
  }
};

interface UpdateOrderStatusProps {
  orderId: string;
  status: string;
  shipping_provider: string | null;
  tracking_id: string | null;
}

export const updateOrderStatus = async ({
  orderId,
  status,
  shipping_provider,
  tracking_id,
}: UpdateOrderStatusProps) => {
  const token = await getToken();

  const query: any = {
    status,
  };
  if (shipping_provider !== "" && tracking_id !== "") {
    query.shipping_provider = shipping_provider;
    query.tracking_id = tracking_id;
  }

  try {
    const response = await fetch(
      `${process.env.HOST_NAME}/order/admin/update-status/${orderId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(query),
      },
    );

    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.detail;
  } catch (error) {
    console.error("Failed to update order status:", error);
    throw error;
  }
};
