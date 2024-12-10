"use server";

import { getToken } from "@/app/utils/token";

interface User {
  username: string;
  first_name: string;
  last_name: string;
  phone: string;
  age: number;
}

export async function getUserInfo(token: string, user_id: string) {
  try {
    const response = await fetch(`${process.env.HOST_NAME}/user/${user_id}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.error("Response Error:", {
        status: response.status,
        statusText: response.statusText,
      });
      return null;
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw new Error(`Error fetching user info: ${error}`);
  }
}

export async function updateUserInfo(user_id: string, formData: FormData) {
  const token = await getToken();
  try {
    const response = await fetch(
      `${process.env.HOST_NAME}/user/update-by-id/${user_id}`,
      {
        method: "PATCH",
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.statusCode === 400) {
      return result.message;
    }

    return result;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw new Error(`Error fetching user info: ${error}`);
  }
}
