"use server";
import { decryptToken } from "@/app/utils/decrypt";
import { cookies } from "next/headers";

interface Form {
  email: string;
  password: string;
}

interface LoginResult {
  access_token: string;
  // Add other fields that your login response includes
}

interface LoginResponse {
  result: LoginResult;
  payload: any; // Replace `any` with a specific type if known
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
      const errorMessage = await response.text();
      throw new Error(`Login failed: ${errorMessage}`);
    }

    const result: LoginResult = await response.json();
    const payload = await decryptToken(result.access_token);

    // Store the access token in cookies
    (await cookies()).set("user-token", result.access_token);

    return { result, payload }; // Return both result and payload
  } catch (error) {
    console.error("Error during login:", error);
    throw error; // Consider wrapping the error for more context if needed
  }
}
