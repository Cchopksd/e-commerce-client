"use server";
import { getToken } from "@/app/utils/token";

export const getProductById = async (id: string) => {
  const token = await getToken();
  try {
    const response = await fetch(
      `${process.env.HOST_NAME}/product/by-id/${id}`,
      {
        method: "POST",
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
    return result.detail.product;
  } catch (error) {
    console.error("Failed to fetch order:", error);
    throw error;
  }
};

export const updateProduct = async (id: string, formData: FormData) => {
  const token = await getToken();
  try {
    const response = await fetch(
      `${process.env.HOST_NAME}/product/update/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    // return result.detail;
  } catch (error) {
    console.error("Failed to fetch order:", error);
    throw error;
  }
};
