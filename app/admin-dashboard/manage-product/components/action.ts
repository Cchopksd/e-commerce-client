"use server";
import { getToken } from "@/app/utils/token";

export const getAllProduct = async () => {
  const token = await getToken();
  try {
    const response = await fetch(
      `${process.env.HOST_NAME}/product?search=&page=1&limit=10`,
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
    return result;
  } catch (error) {
    console.error("Failed to fetch order:", error);
    throw error;
  }
};
