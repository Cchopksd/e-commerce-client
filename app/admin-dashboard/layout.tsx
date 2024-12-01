import { ReactNode } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { decryptToken, getToken } from "../utils/token";

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminDashboardLayout({
  children,
}: AdminLayoutProps) {
  const token = await getToken();
  const adminInfo = await decryptToken(token);
  if (!adminInfo) {
    return <div>Unauthorized</div>;
  }
  return (
    <div className="h-full bg-gray-50 relative flex">
      <Sidebar />
      <div className="flex-grow flex-1 top-0 left-0 w-full h-full relative">
        <Navbar adminInfo={adminInfo} />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
