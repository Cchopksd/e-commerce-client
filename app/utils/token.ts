"use server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export const decryptToken = async (token: string) => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    if (token) {
      const { payload } = await jwtVerify(token, secret);
      return payload;
    }
  } catch (error) {
    console.error("Token decryption error:", error);
    return "";
  }
};

export const getToken = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("user-token")?.value;
    if (!token) {
      return null;
    }
    return token;
  } catch (error) {
    console.log("Token decryption error:", error);
    return null;
  }
};
