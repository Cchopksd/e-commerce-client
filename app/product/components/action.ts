"use server";

import { decryptToken, getToken } from "@/app/utils/token";

export default async function fetchAllProduct({
  search,
  page,
}: {
  search: string | any;
  page: number;
}) {
  const hostname = process.env.HOST_NAME;
  const token = await getToken();
  const userInfo = await decryptToken(token);

  try {
    const resource = await fetch(
      `${hostname}/product?search=${search}&page=${page}&user_id=${userInfo?.sub}`,
      {
        method: "GET",
        cache: "no-store",
      },
    );
    const result = await resource.json();
    if (!resource.ok) {
      console.log("Something went wrong");
    }
    return result;
  } catch (error) {
    console.error(error);
  }
}
