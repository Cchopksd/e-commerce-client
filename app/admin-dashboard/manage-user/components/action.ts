"use server";
import { getToken } from "@/app/utils/token";

export const getAllUser = async () => {
  const token = await getToken();
  try {
    const response = await fetch(`${process.env.HOST_NAME}/user/get-all-user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

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
