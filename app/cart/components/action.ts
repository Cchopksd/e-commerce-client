"use server";
import { decryptToken, getToken } from "@/app/utils/token";

export const fetchCartByID = async () => {
  const token = await getToken();
  const hostname = process.env.HOST_NAME;

  const userInfo = await decryptToken(token || "");
  const user_id = userInfo?.sub;

  if (!user_id) {
    console.error("User ID not found in the token");
  }

  try {
    const resource = await fetch(`${hostname}/cart/user_id/${user_id}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!resource.ok) {
      const errorText = await resource.text();
      console.error(`Error fetching cart: ${resource.status} ${errorText}`);
      return null;
    }

    const result = await resource.json();

    if (result.statusCode === 401) {
      console.warn("Unauthorized access, returning empty cart");
      return null;
    }

    return result;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return null;
  }
};

export const addToCart = async (product_id: string, quantity: number) => {
  const token = await getToken();
  const hostname = process.env.HOST_NAME;

  if (!token || !hostname) {
    console.error("Missing token or hostname");
    return [];
  }

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

export const reduceFromCart = async (product_id: string, quantity: number) => {
  const token = await getToken();
  const hostname = process.env.HOST_NAME;

  if (!token || !hostname) {
    console.error("Missing token or hostname");
    return [];
  }
  const userInfo = await decryptToken(token);
  const user_id = userInfo?.sub;
  try {
    const resource = await fetch(`${hostname}/cart/remove-item`, {
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

export const getCouple = async (couple_name: string) => {
  const token = await getToken();
  try {
    const hostname = process.env.HOST_NAME;
    const resource = await fetch(`${hostname}/couple?name=${couple_name}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.json();
    });
    return resource;
  } catch (error) {
    console.error("Error get couple:", error);
  }
};
