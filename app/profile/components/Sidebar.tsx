"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface MenuItem {
  name: string;
  path: string;
  sub?: MenuItem[];
  icon?: React.ReactNode;
}

export default function Sidebar({ userInfo }: any) {
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
  const isParentActive = (path: string) => pathname.startsWith(path);

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
      <a
        href={item.path}
        className={`${baseClasses} ${
          isActivePath(item.path) ? activeClasses : inactiveClasses
        } ${subMenuClasses}`}>
        {item.name}
      </a>
    );
  };

  return (
    <aside className="w-full md:max-w-72 transition-all duration-300 ease-in-out">
      <nav className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* User Profile Section */}
        <div className="px-3 md:px-4 py-4 md:py-6 text-left">
          <div className="flex flex-col items-center space-y-2 md:space-y-3">
            <div className="w-16 h-16 md:w-20 md:h-20 relative">
              <Image
                src={userInfo.profile_image}
                alt={`${userInfo.username}'s profile`}
                fill
                className="rounded-full object-cover bg-white shadow-md p-1"
                sizes="(max-width: 768px) 4rem, 5rem"
              />
            </div>
            <h4 className="text-base md:text-lg font-semibold">
              {userInfo.username}
            </h4>
          </div>

          <hr className="my-3 md:my-4" />

          {/* Navigation Menu */}
          <div className="space-y-1 md:space-y-2">
            {menu.map((item, index) => (
              <div key={index}>
                <MenuLink item={item} />
                {item.sub && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={
                      isParentActive(item.path)
                        ? { height: "auto", opacity: 1 }
                        : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden">
                    {item.sub.map((subItem, subIndex) => (
                      <MenuLink key={subIndex} item={subItem} isSubMenu />
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}
