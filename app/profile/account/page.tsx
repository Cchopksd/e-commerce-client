import { decryptToken, getToken } from "@/app/utils/token";
import React from "react";
import { getUserInfo } from "./components/action";
import Account from "./components/Account";

export default async function page() {
  const token = await getToken();
  const userInfo = await decryptToken(token);
  if (!token || !userInfo) {
    return <div>No user info</div>;
  }

  const userData = await getUserInfo(token, userInfo.sub);

  return <Account userData={userData} />;
}
