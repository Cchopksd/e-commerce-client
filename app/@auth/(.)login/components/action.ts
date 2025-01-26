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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());

    cookies().set("user-token", response.access_token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

export async function loginWithGoogle() {
  const HOST = process.env.HOST_NAME;
  try {
    const response = await fetch(`${HOST}/auth/google`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Google login URL: ${response.status}`);
    }

    const { url } = await response.json();

    // Redirect on the client side
    if (typeof window !== "undefined") {
      window.location.href = url;
    } else {
      return redirect(url);
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}
