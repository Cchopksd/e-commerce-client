"use server";

export async function getUserInfo(token: string, user_id: string) {
  try {
    const response = await fetch(`${process.env.HOST_NAME}/user/${user_id}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.error("Response Error:", {
        status: response.status,
        statusText: response.statusText,
      });
      return null;
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw new Error(`Error fetching user info: ${error}`);
  }
}
