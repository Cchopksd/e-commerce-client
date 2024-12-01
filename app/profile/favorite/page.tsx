import React from "react";
import { getUserFavorite } from "./components/action";
import { getToken } from "@/app/utils/token";
import { decryptToken } from "@/app/utils/token";
import Content from "./components/content";

export default async function page() {
  const token = await getToken();
  const userInfo = await decryptToken(token);
  if (!token || !userInfo) {
    return <div>No user info</div>;
  }
  const favorite = await getUserFavorite({
    userId: userInfo.sub,
    token,
  });
  return (
    <div>
      <Content favorites={favorite} />
    </div>
  );
}
