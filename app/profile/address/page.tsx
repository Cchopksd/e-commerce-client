import { decryptToken, getToken } from "@/app/utils/token";
import React from "react";
import { getUserAddress } from "./components/action";
import Address from "./components/Address";

export default async function page() {
  const token = await getToken();
  const userInfo = await decryptToken(token || "");
  if (!token || !userInfo) {
    return <div>No user info</div>;
  }

  const addressData = await getUserAddress(token, userInfo.sub);

  return <Address addressData={addressData} />;
}
