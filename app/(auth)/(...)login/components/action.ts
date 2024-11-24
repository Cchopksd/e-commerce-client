"use server";
import { decryptToken } from "@/app/utils/token";
import { cookies } from "next/headers";

interface Form {
  email: string;
  password: string;
}

interface LoginResult {
  access_token: string;
}

export async function login({ email, password }: Form) {
  const HOST = process.env.HOST_NAME;
  try {
    const response = await fetch(`${HOST}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      const errorMessage = errorResponse?.message || "Unknown error";
      throw new Error(errorMessage);
    }

    const result: LoginResult = await response.json();

    const payload = await decryptToken(result.access_token);

    setAuthCookie(response);
    return { result, payload };
  } catch (error: any) {
    console.error("Error during login:", error);
    throw new Error(`Login failed: ${error.message || error}`);
  }
}

const setAuthCookie = (response: Response) => {
  const setCookieHeader = response.headers.get("set-Cookie");
  if (setCookieHeader) {
    const token = setCookieHeader.split(";")[0].split("=")[1];
    cookies().set("user-token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });
  }
};
