"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Form {
  email: string;
  password: string;
}

export async function login({ email, password }: Form) {
  const HOST = process.env.HOST_NAME;
  try {
    const response = await fetch(`${HOST}/auth/login`, {
      method: "POST",
      cache: "no-store",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      const errorMessage = errorResponse?.message || "Unknown error";
      console.error("Login failed:", errorMessage);

      if (errorMessage === "Invalid credentials") {
        throw new Error("The email or password you entered is incorrect.");
      } else {
        throw new Error(errorMessage);
      }
    }

    const result = await response.json();
    cookies().set("user-token", result.access_token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    return result;
  } catch (error: any) {
    console.error("Error during login:", error);
    throw error;
  }
}

export async function loginWithGoogle() {
  const HOST = process.env.HOST_NAME;
  try {
    const response = await fetch(`${HOST}/auth/google`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Google login URL: ${response.status}`);
    }

    const { url } = await response.json();

    // Redirect on the client side
    if (typeof window !== "undefined") {
      window.location.href = url;
    } else {
      // Handle server-side redirection
      return redirect(url);
    }
  } catch (error: any) {
    console.error("Error during login:", error);
    throw error;
  }
}
