"use server";

export const refreshAccessToken = async () => {
  const HOST = process.env.HOST_NAME || "http://localhost:3000";

  try {
    const response = await fetch(`${HOST}/auth/refresh-token`, {
      method: "POST",
      cache: "no-store",
      credentials: "include",
    });

    console.log("Response Headers:", {
      "Set-Cookie": response.headers.get("set-cookie"),
      "Content-Type": response.headers.get("content-type"),
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.warn("Refresh token expired or invalid");
        return null; // Handle token expiration gracefully
      }

      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to refresh token");
    }

    const result = await response.json();

    console.log("Token refresh success:", result);

    return result;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};

export default async function fetchTrendingProduct() {
  const hostname = process.env.HOST_NAME;
  try {
    const resource = await fetch(`${hostname}/product/trending-product`, {
      method: "GET",
      cache: "no-store",
    });
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
}
