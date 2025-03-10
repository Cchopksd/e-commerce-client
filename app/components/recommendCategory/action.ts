"use server";

export async function fetchRecommendCategory({
  category,
}: {
  category: string;
}) {
  try {
    const response = await fetch(
      `${process.env.HOST_NAME}/product?page=1&limit=4&category=${category}`
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
