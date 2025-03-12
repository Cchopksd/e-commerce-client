"use server";

import { getTokenInfo } from "@/app/utils/token";

export async function fetchRecommendCategory({
  category,
}: {
  category: string;
}) {
  try {
    const getUserInfo = await getTokenInfo();

    const response = await fetch(
      `${
        process.env.HOST_NAME
      }/product?page=1&limit=4&category=${category}&user_id=${
        getUserInfo?.sub || ""
      }`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(
        "An error occurred during the fetchRecommendCategory process:",
        response.statusText
      );
      return;
    }
    const result = await response.json();
    return result.items;
  } catch (err) {
    console.error(
      "An error occurred during the fetchRecommendCategory process:",
      err
    );
    return;
  }
}
