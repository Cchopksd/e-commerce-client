import React from "react";
import Sidebar from "./components/Sidebar";
import { decryptToken, getToken } from "../utils/token";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userToken = await getToken();
  const userInfo = await decryptToken(userToken);

  return (
    <div className="bg-gray-100">
      <div className="flex w-full h-full max-w-[1440px] mx-auto py-20 px-4 gap-10">
        {userInfo && <Sidebar userInfo={userInfo} />}
        {children}
      </div>
    </div>
  );
}
