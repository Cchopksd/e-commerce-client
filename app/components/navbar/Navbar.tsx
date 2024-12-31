"use client";
import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";
import UserMenu from "../UserMenu";
import Link from "next/link";
import { BiCart, BiSearch } from "react-icons/bi";
import { searchSuggestions } from "../action";

export default function Navbar({ userInfo }: { userInfo: any }) {
  const pathname = usePathname();
  const [keywords, setKeywords] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [suggestions, setSuggest] = useState<any[]>([]);
  const lastInputRef = useRef("");

  const handleSearch = (keywordsText: string) => {
    window.location.href = `/product?search=${keywordsText}&page=1&limit=10`;
    setIsSearchVisible(false);
    setIsMenuOpen(false);
  };

  const toggleSearch = () => setIsSearchVisible(!isSearchVisible);

  const handleSearchSuggestions = (keywords: string) => {
    lastInputRef.current = keywords; // Update the latest input

    // Debounce the API call
    setTimeout(async () => {
      if (keywords === lastInputRef.current) {

        const result = await searchSuggestions(keywords);
        if (result) {
          setSuggest(result);
        }
      }
    }, 300);
  };

  // Prevent Navbar Render on Admin Pages
  if (pathname?.startsWith("/admin-dashboard")) return null;

  return (
    <div className="h-20">
      <nav className="w-full fixed top-0 z-50 bg-white shadow-sm">
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between">
            {/* Logo */}
            <div className="flex justify-center">
              <a
                href="/"
                className="text-xl md:text-2xl font-bold tracking-wider">
                KIRAMIZ
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-1 items-center justify-end gap-6">
              <div className="relative w-[300px]">
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => {
                    setKeywords(e.target.value);
                    handleSearchSuggestions(e.target.value);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch(keywords)}
                  placeholder="Search products..."
                  className="w-full py-2 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500 transition placeholder:text-gray-400"
                />
                {suggestions.length > 0 && (
                  <div
                    className={`absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto`}>
                    <ul className="py-1">
                      {suggestions.map((suggestion: any, index) => (
                        <li
                          key={index}
                          onClick={() => handleSearch(suggestion.name)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700">
                          {suggestion.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <button
                  onClick={() => handleSearch(keywords)}
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-400 hover:text-gray-600"
                  aria-label="Search">
                  <BiSearch size={20} />
                </button>
              </div>

              <a href="/cart" className="hover:text-gray-600 transition-colors">
                <BiCart size={24} />
              </a>
              {userInfo ? (
                <UserMenu userInfo={userInfo} />
              ) : (
                <Link
                  href="/login"
                  className="block px-4 py-2 text-center rounded-full bg-black text-white hover:bg-gray-800 transition-colors">
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Icons */}
            <div className="lg:hidden flex items-center gap-4">
              <button
                onClick={toggleSearch}
                className="hover:text-gray-600 transition-colors"
                aria-label="Toggle search">
                <BiSearch size={24} />
              </button>
              <a href="/cart" className="hover:text-gray-600 transition-colors">
                <BiCart size={24} />
              </a>
              {userInfo ? (
                <UserMenu userInfo={userInfo} />
              ) : (
                <Link
                  href="/login"
                  className="block px-4 py-2 text-center rounded-full bg-black text-white hover:bg-gray-800 transition-colors">
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Search */}
          <div className={`lg:hidden ${isSearchVisible ? "block" : "hidden"}`}>
            <div className="py-4 px-4 border-t">
              <div className="relative">
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => {
                    setKeywords(e.target.value);
                    handleSearchSuggestions(e.target.value);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch(keywords)}
                  placeholder="Search products..."
                  className="w-full py-2 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500 transition placeholder:text-gray-400"
                />
                {suggestions.length > 0 && (
                  <div
                    className={`absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto`}>
                    <ul className="py-1">
                      {suggestions.map((suggestion: any, index) => (
                        <li
                          key={index}
                          onClick={() => handleSearch(suggestion.name)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700">
                          {suggestion.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <button
                  onClick={() => {
                    handleSearch(keywords);
                  }}
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-400 hover:text-gray-600"
                  aria-label="Search">
                  <BiSearch size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
