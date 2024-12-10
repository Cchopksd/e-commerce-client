"use server";

export async function getUserAddress(token: string, user_id: string) {
  try {
    const response = await fetch(
      `${process.env.HOST_NAME}/address/get-address-by-user/${user_id}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      console.error("Response Error:", {
        status: response.status,
        statusText: response.statusText,
      });
      return null;
    }
    const result = await response.json();
    return result.detail;
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
}
