"use server";

import { getToken } from "@/app/utils/token";

const hostname = process.env.HOST_NAME;

interface ReviewData {
  product_id: string;
  user_id: string;
  score: number;
  comment: string;
  reviewed: boolean;
}

export const fetchOrderByID = async ({ order_id }: { order_id: string }) => {
  const token = await getToken();
  try {
    const resource = await fetch(`${hostname}/order/order-by-id/${order_id}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await resource.json();

    if (!resource.ok) {
      return `HTTP error! status: ${resource.status}`;
    }

    return result.detail;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const fetchReviewByOrderID = async ({
  order_id,
}: {
  order_id: string;
}) => {
  try {
    const resource = await fetch(
      `${hostname}/review/get-review-by-order/${order_id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const result = await resource.json();

    if (!resource.ok) {
      return `HTTP error! status: ${resource.status}`;
    }

    return result.data;
  } catch (err) {
    console.error("Error fetching review:", err);
    throw err;
  }
};

export const saveReview = async ({
  reviewData,
}: {
  reviewData: ReviewData;
}) => {
  try {
    const token = await getToken();
    console.log(reviewData);
    const resource = await fetch(`${hostname}/review/save-review`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        reviewData,
      }),
    });
    const result = await resource.json();

    if (!resource.ok) {
      return `HTTP error! status: ${resource.status}`;
    }

    return result.data;
  } catch (err) {
    console.error("Error fetching review:", err);
    throw err;
  }
};
