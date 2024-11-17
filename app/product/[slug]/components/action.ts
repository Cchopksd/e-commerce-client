"use server";

import { decryptToken } from "@/app/utils/token";

export const fetchProductByID = async (id: string | undefined) => {
  const hostname = process.env.HOST_NAME;
  try {
    const resource = await fetch(`${hostname}/product/get-by-id/${id}`, {
      method: "GET",
      cache: "no-store",
    });
    const result = await resource.json();
    if (!resource.ok) {
      console.log("Something went wrong");
    }
    return result;
  } catch (error) {
    console.error(error);
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
      console.log("Something went wrong");
    }
    return result;
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};
