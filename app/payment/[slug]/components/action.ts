"use server";
import { getToken } from "@/app/utils/token";

export async function getPaymentDetail(payment_id: string) {
  const token = await getToken();
  try {
    const response = await fetch(
      `${process.env.HOST_NAME}/payment/get-payment-by-id/${payment_id}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      console.error("Response Error:", {
        status: response.status,
        statusText: response.statusText,
      });
      return null;
    }
    const result = await response.json();
    return result.detail;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw new Error(`Error fetching user info: ${error}`);
  }
}
