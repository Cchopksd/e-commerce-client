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

interface LoginResponse {
  result: LoginResult;
  payload: any;
}

export async function login({ email, password }: Form): Promise<LoginResponse> {
  const HOST = process.env.HOST_NAME;
  try {
    const response = await fetch(`${HOST}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
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

    // Store the access token in cookies
    const cookiesInstance = await cookies(); // Ensure cookies() is available
    cookiesInstance.set("user-token", result.access_token);

    return { result, payload }; // Return both result and payload
  } catch (error:any) {
    console.error("Error during login:", error);
    throw new Error(`Login failed: ${error.message || error}`); // Wrapping the error with more context
  }
}
