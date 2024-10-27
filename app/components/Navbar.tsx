"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { IoSearchOutline } from "react-icons/io5";
import { TiShoppingCart } from "react-icons/ti";
import { IoMenuOutline } from "react-icons/io5";
import Image from "next/image";

interface NavOption {
  name: string;
  path: string;
}

const navOptions: NavOption[] = [
  { name: "Home", path: "/" },
  { name: "Product", path: "/product?search=&page=1&limit=10" },
  { name: "About Us", path: "/about-us" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const [userImage, setUserImage] = useState<string | null>(null);

  useEffect(() => {
    const userInfoString = localStorage.getItem("user-payload");
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

    setUserImage(userInfo?.profile_image || null);
  }, []);

  const [keywords, setKeywords] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/product?search=${keywords}&page=1&limit=10`);
    }
  };

  return (
    <div className="h-20">
      <nav className="w-full fixed top-0 z-50 bg-white backdrop-blur-sm shadow-sm">
        <div className="flex w-full max-w-[1440px] mx-auto justify-between items-center py-4 px-4 md:px-10">
          {/* Left Section - Navigation Links */}
          <section className="hidden md:flex">
            <ul className="flex gap-6 md:gap-10">
              {navOptions.map((item: NavOption, index: number) => (
                <li key={index}>
                  <Link
                    href={item.path}
                    className="text-gray-600 hover:text-black transition-colors duration-200 text-lg font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Center Section - Logo */}
          <section className="flex justify-center lg:flex-1">
            <Link
              href="/"
              className="text-xl font-bold tracking-wider hover:opacity-80 transition-opacity text-center">
              LOGO
            </Link>
          </section>

          {/* Right Section - Search, Cart, Login */}
          <section className="flex items-center gap-4 md:gap-10">
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <input
                type="text"
                value={keywords}
                onChange={(e: any) => {
                  setKeywords(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                className="w-40 md:w-48 border-b-2 border-gray-200 rounded-none 
                         pl-2 pr-8 py-1 text-sm
                         focus:outline-none focus:border-black
                         transition-all duration-200
                         bg-transparent"
                placeholder="Search..."
              />
              <a
                href={`/product?search=${keywords}&page=1&limit=10`}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors">
                <IoSearchOutline className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile Search Icon */}
            <button className="md:hidden text-gray-600 hover:text-black transition-colors">
              <IoSearchOutline className="w-6 h-6" />
            </button>

            {/* Shopping Cart */}
            <Link
              href="/cart"
              className="relative flex items-center hover:opacity-80 transition-opacity">
              <TiShoppingCart className="w-6 h-6 text-gray-600" />
              {/* Cart Badge */}
              <span
                className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center 
                            bg-black text-white text-xs font-medium rounded-full">
                6
              </span>
            </Link>

            {/* Login Button */}
            {userImage ? (
              <div className="w-full h-full">
                <Image
                  src={userImage}
                  alt="avatar"
                  className="w-full h-full rounded-full  shadow-md p-1"
                  width={18}
                  height={18}
                />
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden md:block text-lg font-medium text-gray-600 hover:text-black transition-colors">
                Login
              </Link>
            )}
            {/* Mobile Menu Button */}

            <button className="md:hidden text-gray-600 hover:text-black transition-colors">
              <IoMenuOutline />
            </button>
          </section>
        </div>
      </nav>
    </div>
  );
}
