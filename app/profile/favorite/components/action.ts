"use server";

export async function getUserFavorite({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) {
  try {
    const response = await fetch(
      `${process.env.HOST_NAME}/favorite/by-user/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const result = await response.json();
    return result.favorite;
  } catch (error) {
    console.log(error);
  }
}
