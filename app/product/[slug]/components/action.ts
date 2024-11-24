"use server";

import { decryptToken } from "@/app/utils/token";

export const fetchProductByID = async ({
  product_id,
  user_id,
}: {
  product_id: string;
  user_id: string | null;
}) => {
  const hostname = process.env.HOST_NAME;
  try {
    const resource = await fetch(`${hostname}/product/by-id`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id,
        user_id,
      }),
    });
    const result = await resource.json();
    if (!resource.ok) {
      throw new Error(`HTTP error! status: ${resource.status}`);
    }
    return result;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const addToCart = async (
  token: string | null,
  product_id: string,
  quantity: number,
) => {
  const hostname = process.env.HOST_NAME;
  const userInfo = await decryptToken(token);
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
      throw new Error(`HTTP error! status: ${resource.status}`);
    }
    return result;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};
