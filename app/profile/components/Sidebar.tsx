"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Sidebar({ userInfo }: { userInfo: any }) {
  const pathname = usePathname();
  console.log(pathname);
  const profileImage = userInfo?.profile_image;
  const username = userInfo?.username;

  const menu = [
    {
      name: "Account",
      path: "/profile/account",
    },
    {
      name: "Address",
      path: "/profile/address",
    },
    {
      name: "Order",
      path: "/profile/order",
    },
    {
      name: "Favorite",
      path: "/profile/favorite",
    },
  ];

  return (
    <aside className="w-full max-w-72 h-full">
      <nav className="w-full h-full min-h-[500px] bg-white rounded-lg shadow-lg">
        <div className="px-4 py-6">
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20">
              <Image
                src={profileImage}
                alt="profile"
                width={100}
                height={100}
                className="rounded-full bg-white shadow-md p-1"
              />
            </div>
            <h4 className="text-lg font-semibold">{username}</h4>
          </div>
          <hr className="my-4" />
          <div className="flex flex-col gap-4">
            {menu.map((item, index) => (
              <Link
                href={item.path}
                key={index}
                className={`hover:text-black transition-all duration-200 text-base uppercase ${
                  pathname === item.path
                    ? "text-black border-b "
                    : "text-gray-500"
                }`}>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}
