"use server";
import { decryptToken, getToken } from "@/app/utils/token";

export interface PreparePromptPayData {
  type: "promptpay";
  currency: string;
  address: string;
}
const hostname = process.env.HOST_NAME;

export const payWithPromptPay = async ({
  type,
  address,
  currency,
}: PreparePromptPayData): Promise<any> => {
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
