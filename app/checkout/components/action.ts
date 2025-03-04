"use server";
import { decryptToken, getToken } from "@/app/utils/token";

const hostname = process.env.HOST_NAME;

export const payWithPromptPay = async ({
  type,
  address,
  currency,
}: {
  type: "promptpay";
  currency: string;
  address: string;
}): Promise<any> => {
  const token = await getToken();
  if (!token || !hostname) {
    console.error("Missing token or hostname");
    return null;
  }

  const userInfo = await decryptToken(token);

  if (!userInfo) {
    console.error("Failed to decode token or invalid token structure");
    return null;
  }

  const { sub, email } = userInfo;

  try {
    const resource = await fetch(`${hostname}/payment/prompt-pay`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: sub,
        type,
        currency,
        email,
        address,
      }),
    });

    if (!resource.ok) {
      console.error("Something went wrong during the request");
      return null;
    }

    const result = await resource.json();
    return result.detail;
  } catch (error) {
    console.error("Error during payment processing:", error);
    return null;
  }
};

export const payWithCard = async ({
  customer_id,
  card_id,
  address_id,
  currency = "THB",
}: {
  customer_id: string;
  card_id: string;
  address_id: string;
  currency: string;
}): Promise<any> => {
  const token = await getToken();
  if (!token || !hostname) {
    console.error("Missing token or hostname");
    return null;
  }

  const userInfo = await decryptToken(token);

  if (!userInfo) {
    console.error("Failed to decode token or invalid token structure");
    return null;
  }

  const { sub, email } = userInfo;

  try {
    const resource = await fetch(`${hostname}/payment/credit-card`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: sub,
        customer_id,
        card_id,
        currency,
        email,
        address_id,
      }),
    });

    const result = await resource.json();
    return result.detail;
  } catch (error) {
    console.error("Error during payment processing:", error);
    return null;
  }
};

export const fetchCartByID = async () => {
  const token = await getToken();

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
      return [];
    }

    const result = await resource.json();

    if (result.statusCode === 401) {
      console.warn("Unauthorized access, returning empty cart");
      return [];
    }

    return result;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
};

export const fetchCreditCard = async () => {
  try {
    const token = await getToken();
    if (!token) {
      console.error("Token not found");
      return;
    }
    const userInfo = await decryptToken(token);
    if (!userInfo) {
      console.error("Failed to decode token or invalid token structure");
      return;
    }
    const resource = await fetch(
      `${hostname}/payment/get-retrieve-customer?user_id=${userInfo.sub}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!resource.ok) {
      console.error("Something went wrong during the request");
      return;
    }

    const result = await resource.json();
    return result.detail.card;
  } catch (error) {
    console.error("Error fetching credit card:", error);
    return;
  }
};
