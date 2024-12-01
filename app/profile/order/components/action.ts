"use server";

export async function getUserOrders({
  userId,
  orderStatus,
  page,
  token,
}: {
  userId: string;
  orderStatus: string;
  page: number;
  token: string;
}) {
  try {
    const response = await fetch(`${process.env.HOST_NAME}/order/order-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: userId,
        order_status: orderStatus,
        page,
      }),
    });
    const result = await response.json(); 
    return result.detail;
  } catch (error) {
    console.log(error);
  }
}
