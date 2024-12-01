"use client";
import React from "react";
import { RiMenu2Line } from "react-icons/ri";
import { useAppDispatch } from "@/libs/hooks";
import { toggleSidebar } from "@/libs/features/admin/sidebarSlice";
import Image from "next/image";

interface Admin {
  sub: string;
  profile_image?: string;
  email: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
}

export default function Navbar({ adminInfo }: { adminInfo: Admin }) {
  const dispatch = useAppDispatch();

  return (
    <nav className="bg-white shadow-sm px-6 h-16 flex items-center justify-between sticky w-full z-20">
      <div className="flex items-center">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-2 hover:bg-gray-100 rounded-lg lg:hidden">
          <RiMenu2Line className="text-xl text-gray-600" />
        </button>

        <div className="hidden lg:block ml-4">
          <h1 className="text-xl font-semibold text-gray-800">
            Admin Dashboard
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{adminInfo.username}</span>
        <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-gray-100">
          <Image
            src={adminInfo.profile_image || ""}
            alt="Profile"
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
}
