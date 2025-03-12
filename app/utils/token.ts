"use server";
import { jwtVerify, JWTPayload } from "jose";
import { cookies } from "next/headers";

export interface DecodedToken extends JWTPayload {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  sub: string;
  profile_picture: string;
  role: string;
  iat: number;
  exp: number;
}

export const decryptToken = async (token: string) => {
  if (!token) return "";

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const isExpired = payload.exp && Date.now() >= payload.exp * 1000;
    if (isExpired) {
      console.warn("Token has expired.");
      return undefined;
    }

    return payload as DecodedToken;
  } catch {
    return "";
  }
};

export const getToken = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("user-token")?.value;
    if (!token) {
      return "";
    }
    return token;
  } catch (error) {
    console.error("Token decryption error:", error);
    return "";
  }
};

export const getTokenInfo = async () => {
  try {
    const token = await getToken();
    if (!token) {
      return null;
    }
    return await decryptToken(token);
  } catch (error) {
    console.error("Token decryption error:", error);
    return null;
  }
};

export const logout = async () => {
  try {
    const token = cookies().delete("user-token");
    if (!token) {
      return null;
    }
    return true;
  } catch (error) {
    console.error("Token decryption error:", error);
    return null;
  }
};
