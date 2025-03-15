"use server";
import { decryptToken, getToken } from "@/app/utils/token";

interface FormData {
  email: string;
  password: string;
  username: string;
  first_name: string;
  last_name: string;
  phone: string;
  age: string | number;
}

export const signUp = async (formData: FormData) => {
  try {
    const hostname = process.env.HOST_NAME;
    const resource = await fetch(`${hostname}/user`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await resource.json();

    if (!resource.ok) {
      console.error(`HTTP error! status: ${resource.status}`);
      return null;
    }
    return result;
  } catch (error) {
    console.error("Error during sign up:", error);
    return null;
  }
};
