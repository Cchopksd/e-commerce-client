"use server";

import { decryptToken, getToken } from "@/app/utils/token";
import { RiContactsBookLine } from "react-icons/ri";

const hostname = process.env.HOST_NAME;

export const fetchProductByID = async ({
  product_id,
  user_id,
}: {
  product_id: string;
  user_id: string;
}) => {
  try {
    const resource = await fetch(`${hostname}/product/by-id/${product_id}`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
      }),
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

export const addToCart = async (
  token: string | null,
  product_id: string,
  quantity: number,
) => {
  const hostname = process.env.HOST_NAME;
  const userInfo = await decryptToken(token || "");
  const user_id = userInfo?.sub;
  try {
    const resource = await fetch(`${hostname}/cart/add-item`, {
      method: "POST",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        product_id,
        quantity,
      }),
    });
    const result = await resource.json();
    console.log(result);
    if (!resource.ok) {
      console.error(`HTTP error! status: ${resource.status}`);
    }
    return result;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const favoriteProduct = async ({
  product_id,
  is_favorite,
}: {
  product_id: string;
  is_favorite: boolean;
}) => {
  const token = await getToken();
  const userInfo = await decryptToken(token);

  if (!userInfo || !token) {
    return { message: "Token is not defined" };
  }

  try {
    const resource = await fetch(`${hostname}/favorite`, {
      method: "POST",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userInfo.sub,
        product_id,
        is_favorite,
      }),
    }).then((res) => res.json());
    console.log(resource);
    return resource;
  } catch (error) {
    console.log(error);
    return error;
  }
};
