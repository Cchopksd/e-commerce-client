"use server";
import { cookies } from "next/headers";
import { decryptToken, getToken } from "../utils/token";

export const fetchTrendingProduct = async () => {
  const hostname = process.env.HOST_NAME;
  const token = await getToken();
  const userInfo = await decryptToken(token);

  const user_id = userInfo ? userInfo?.sub : "";

  try {
    const resource = await fetch(
      `${hostname}/product/trending-product?user_id=${user_id}`,
      {
        method: "GET",
        cache: "no-store",
      },
    );
    const result = await resource.json();
    if (!resource.ok) {
      console.error("Response Error:", {
        status: resource.status,
        statusText: resource.statusText,
        error: result,
      });
      return null;
    }
    return result;
  } catch (error) {
    console.error("Error fetching trending product:", error);
    return null;
  }
};

export const searchSuggestions = async (
  keywords: string,
): Promise<any[] | null> => {
  const hostname = process.env.HOST_NAME;

  if (!hostname) {
    console.error("HOST_NAME is not defined in the environment variables.");
    return null;
  }

  try {
    const response = await fetch(
      `${hostname}/product/search-product-suggestion`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({ search: keywords }),
      },
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Response Error:", {
        status: response.status,
        statusText: response.statusText,
        error: result,
      });
      return [];
    }
    // Ensure result.data.detail exists before returning it
    if (result?.detail) {
      return result.detail;
    } else {
      console.warn("Unexpected response structure:", result);
      return [];
    }
  } catch (error) {
    console.error("Error fetching search suggestions:", error);
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
    console.log("Token decryption error:", error);
    return null;
  }
};
