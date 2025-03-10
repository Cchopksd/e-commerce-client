"use server";

import { getToken, decryptToken } from "@/app/utils/token";
import { CardDetails } from "../types/card";
import { getUserAddress } from "@/app/profile/address/components/action";
import { Address } from "@/interface/Address";

export const getCard = async () => {
  try {
    const token = await getToken();
    const decryptedToken = await decryptToken(token);
    if (!decryptedToken || typeof decryptedToken !== "object") {
      console.error("Invalid token");
      return "Invalid token";
    }
    const { sub } = decryptedToken;

    const response = await fetch(
      `${process.env.HOST_NAME}/payment/get-retrieve-customer?user_id=${sub}`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => res.json());

    if (response.statusCode === 200) {
      return response.detail;
    }

    console.error(response.message);
    return response.message;
  } catch (error) {
    console.error(error);
  }
};

export const createUserWithCard = async (card: CardDetails) => {
  try {
    const token = await getToken();
    const decryptedToken = await decryptToken(token);

    if (!decryptedToken || typeof decryptedToken !== "object") {
      console.error("Invalid token");
      return "Invalid token";
    }
    const { sub, email } = decryptedToken;

    const addressData = await getUserAddress(token, sub);

    const defaultAddress = addressData.find(
      (address: Address) => address.default
    );

    const response = await fetch(
      `${process.env.HOST_NAME}/payment/add-credit-card`,
      {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...card,
          user_id: sub,
          email: email,
          country: "th",
          city: defaultAddress.province,
          postal_code: defaultAddress.post_id,
          street1: defaultAddress.detail,
        }),
      }
    ).then((res) => res.json());

    if (response.statusCode === 201) {
      return response.data.detail;
    }

    console.error(response.message);
    return response.message;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUserCard = async ({
  card_id,
  cust_id,
}: {
  card_id: string;
  cust_id: string;
}) => {
  try {
    const token = await getToken();
    const decryptedToken = await decryptToken(token);

    if (!decryptedToken || typeof decryptedToken !== "object") {
      console.error("Invalid token");
      return "Invalid token";
    }

    const { sub } = decryptedToken;

    const response = await fetch(
      `${process.env.HOST_NAME}/payment/remove-credit-card?user_id=${sub}&card_id=${card_id}&cust_id=${cust_id}`,
      {
        method: "DELETE",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => res.json());

    if (response.statusCode === 200) {
      return response.message;
    }

    console.error(response.message);
    return response.message;
  } catch (error) {
    console.error(error);
  }
};
