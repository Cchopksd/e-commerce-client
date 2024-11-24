"use server";


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
