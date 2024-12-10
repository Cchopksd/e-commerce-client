"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  name: string;
  path: string;
  sub?: MenuItem[];
  icon?: React.ReactNode;
}

const Sidebar = ({ userInfo }: any) => {
  const pathname = usePathname();

  const menu: MenuItem[] = [
    {
      name: "Account",
      path: "/profile/account",
      sub: [
        {
          name: "Reset Password",
          path: "/profile/account/reset-password",
        },
      ],
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

  const isActivePath = (path: string) => pathname === path;

  const MenuLink: React.FC<{ item: MenuItem; isSubMenu?: boolean }> = ({
    item,
    isSubMenu = false,
  }) => {
    const baseClasses =
      "block py-2 transition-all duration-200 text-base uppercase";
    const activeClasses = "text-black border-b";
    const inactiveClasses = "text-gray-500 hover:text-black";
    const subMenuClasses = isSubMenu ? "pl-4 text-sm" : "";

    return (
      <Link
        href={item.path}
        className={`${baseClasses} ${
          isActivePath(item.path) ? activeClasses : inactiveClasses
        } ${subMenuClasses}`}>
        {item.name}
      </Link>
    );
  };

  return (
    <aside className="w-full max-w-72">
      <nav className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* User Profile Section */}
        <div className="px-4 py-6 text-left">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-20 h-20 relative">
              <Image
                src={userInfo.profile_image}
                alt={`${userInfo.username}'s profile`}
                fill
                className="rounded-full object-cover bg-white shadow-md p-1"
              />
            </div>
            <h4 className="text-lg font-semibold">{userInfo.username}</h4>
          </div>

          <hr className="my-4" />

          {/* Navigation Menu */}
          <div className="space-y-2">
            {menu.map((item, index) => (
              <div key={index}>
                <MenuLink item={item} />
                {item.sub && (
                  <div>
                    {item.sub.map((subItem, subIndex) => (
                      <MenuLink key={subIndex} item={subItem} isSubMenu />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
