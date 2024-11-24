import React from "react";
import Sidebar from "./components/Sidebar";
import { decryptToken, getToken } from "../utils/token";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userToken = await getToken();
  const userInfo = userToken ? await decryptToken(userToken) : null;

  return (
    <div className="bg-[#FEF6F1]">
      <div className="flex w-full h-full max-w-[1440px] mx-auto py-20 px-4 gap-10">
        <Sidebar userInfo={userInfo} />
        <main className="w-full min-h-screen bg-white shadow-md rounded-lg p-4">
          {children}
        </main>
      </div>
    </div>
  );
}