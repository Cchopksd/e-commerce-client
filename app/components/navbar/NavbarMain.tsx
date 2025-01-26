import React from "react";
import Navbar from "./Navbar";
import { decryptToken, getToken } from "@/app/utils/token";
import { fetchCartNumber } from "../action";

export default async function NavbarMain() {
  const userToken = await getToken();

  const userInfo = userToken ? await decryptToken(userToken) : null;

  let getCartItem;

  if (userToken) {
    getCartItem = await fetchCartNumber();
  }

  return (
    <div>
      <Navbar userInfo={userInfo} getCartItem={getCartItem} />
    </div>
  );
}
