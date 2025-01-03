"use server";

import { decryptToken, getToken } from "@/app/utils/token";

interface Address {
  name: string;
  province: string;
  district: string;
  subdistrict: string;
  post_id: number;
  detail: string;
  default: boolean;
}

export const createNewAddress = async ({ address }: { address: Address }) => {
  const token = await getToken();
  const user_id = token ? (await decryptToken(token))?.sub : "";
  try {
    const response = await fetch(`${process.env.HOST_NAME}/address`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...address, user_id }),
    }).then((res) => res.json());

    console.group(response);

    if (response.statusCode !== 201) {
      console.error("Error creating new address:", response.message);
    }

    return response;
  } catch (error: any) {
    console.error("Error creating new address:", error);
  }
};
