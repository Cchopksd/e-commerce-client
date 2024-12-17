"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { TiShoppingCart } from "react-icons/ti";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import Image from "next/image";
import UserMenu from "../UserMenu";

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

const userMenu: NavOption[] = [{ name: "Profile", path: "/profile" }];

export default function Navbar({ userInfo }: { userInfo: any }) {
  const router = useRouter();

  const menuRef = useRef<HTMLDivElement>(null);

  const [keywords, setKeywords] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/product?search=${keywords}&page=1&limit=10`);
      setIsSearchOpen(false);
    }
  };

  const handleSearch = () => {
    router.push(`/product?search=${keywords}&page=1&limit=10`);
    setIsSearchOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  const pathname = usePathname();

  if (pathname?.startsWith("/admin-dashboard")) {
    return null;
  }

  return (
    <div className="h-20">
      <nav className="w-full fixed top-0 z-50 bg-white shadow-sm">
        {/* Main Navbar */}
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="h-20 flex items-center">
            {/* Left Section */}
            <div className="flex-1 flex items-center justify-start lg:w-1/3">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-gray-600 hover:text-black transition-colors mr-4">
                {isMobileMenuOpen ? (
                  <IoCloseOutline className="w-7 h-7" />
                ) : (
                  <IoMenuOutline className="w-7 h-7" />
                )}
              </button>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-8">
                {navOptions.map((item: NavOption, index: number) => (
                  <Link
                    key={index}
                    href={item.path}
                    className="text-gray-600 hover:text-black transition-all duration-200 text-base font-medium">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Center Section - Logo */}
            <div className="flex-1 hidden lg:flex justify-center lg:w-1/3">
              <Link
                href="/"
                className="text-2xl font-bold tracking-wider hover:opacity-80 transition-all duration-200">
                LOGO
              </Link>
            </div>

            {/* Right Section */}
            <div className="flex-1 flex items-center justify-end gap-4 md:gap-6 lg:w-1/3">
              {/* Desktop Search */}
              <div className="hidden md:block relative">
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-48 lg:w-56 border rounded-full px-4 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-black/20
                           transition-all duration-200 bg-gray-50"
                  placeholder="Search products..."
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 
                           text-gray-400 hover:text-black transition-colors">
                  <IoSearchOutline className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="md:hidden text-gray-600 hover:text-black transition-colors">
                <IoSearchOutline className="w-6 h-6" />
              </button>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative flex items-center hover:opacity-80 transition-all duration-200">
                <TiShoppingCart className="w-6 h-6 text-gray-600" />
                <span
                  className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center 
                              bg-black text-white text-xs font-medium rounded-full">
                  6
                </span>
              </Link>

              {userInfo ? (
                <>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="relative group">
                    <Image
                      src={userInfo?.profile_image}
                      alt="avatar"
                      className="w-10 h-10 rounded-full shadow-md p-1 cursor-pointer bg-white
                               ring-2 ring-transparent hover:ring-black/20 transition-all duration-200"
                      width={40}
                      height={40}
                    />
                  </button>{" "}
                  {/* User Menu Component */}
                  <UserMenu
                    isOpen={isUserMenuOpen}
                    onClose={() => setIsUserMenuOpen(false)}
                    userMenu={userMenu}
                  />
                </>
              ) : (
                <Link
                  href="/login"
                  className=" transition-colors bg-black text-white px-6 py-2 rounded-full">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div
          ref={menuRef}
          className={`md:hidden border-b transition-all duration-300 overflow-hidden ${
            isSearchOpen ? "max-h-16 py-3" : "max-h-0 py-0"
          }`}>
          <div className="px-4 flex">
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 border rounded-full px-4 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-black/20
                     transition-all duration-200 bg-gray-50"
              placeholder="Search products..."
            />
            <button
              onClick={handleSearch}
              className="ml-2 p-2 text-gray-600 hover:text-black transition-colors">
              <IoSearchOutline className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          ref={menuRef}
          className={`lg:hidden fixed inset-x-0 bg-white transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? "max-h-screen" : "max-h-0"
          }`}>
          <div className="px-4 py-2 space-y-1 border-t">
            {navOptions.map((item: NavOption, index: number) => (
              <Link
                key={index}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 text-gray-600 hover:text-black transition-all duration-200 
                         text-base font-medium border-b border-gray-100">
                {item.name}
              </Link>
            ))}
            {!userInfo && (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 text-gray-600 hover:text-black transition-all duration-200 
                         text-base font-medium">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
