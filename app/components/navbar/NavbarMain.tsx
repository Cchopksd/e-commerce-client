import React from "react";
import Navbar from "./Navbar";
import { decryptToken, getToken } from "@/app/utils/token";

export default async function NavbarMain() {
  const userToken = await getToken();

  const userInfo = userToken ? await decryptToken(userToken) : null;

  return (
    <div>
      <Navbar userInfo={userInfo} />
    </div>
  );
}
