"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState, useCallback } from "react";
import UserMenu from "../UserMenu";
import Link from "next/link";
import { BiCart, BiSearch } from "react-icons/bi";
import { searchSuggestions } from "../action";

export default function Navbar({ userInfo }: { userInfo: any | null }) {
  const pathname = usePathname();
  const [keywords, setKeywords] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [focusSearchSuggestions, setFocusSearchSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const lastInputRef = useRef("");
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    const history = localStorage.getItem("searchHistory");
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  const filterSearchHistory = (history: string[], query: string) => {
    if (!query) return history;
    return history.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase()),
    );
  };

  const handleSearch = (keywordsText: string) => {
    let updatedHistory: string[] = [];

    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      updatedHistory = JSON.parse(savedHistory);
      if (!updatedHistory.includes(keywordsText)) {
        updatedHistory.push(keywordsText);
      }
    } else {
      updatedHistory = [keywordsText];
    }

    // Limit the history to the last 5 items
    updatedHistory = updatedHistory.slice(-10);

    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    window.location.href = `/product?search=${keywordsText}&page=1&limit=10`;
  };

  const handleDeleteHistory = (index: number) => {
    const updatedHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
  };

  const handleSearchSuggestions = useCallback((keywordsText: string) => {
    lastInputRef.current = keywordsText;

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(async () => {
      console.log(keywordsText);
      if (keywordsText === lastInputRef.current && keywordsText) {
        const result = await searchSuggestions(keywordsText);
        if (result) {
          setSuggestions(result);
        }
      } else {
        setSuggestions([]);
      }
    }, 300);
  }, []);

  if (pathname?.startsWith("/admin-dashboard")) return null;

  return (
    <div className="h-20">
      <nav className="w-full fixed top-0 z-50 bg-white shadow-sm">
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between">
            {/* Logo */}
            <div className="flex justify-center">
              <Link
                href="/"
                className="text-xl md:text-2xl font-bold tracking-wider"
                aria-label="Homepage">
                KIRAMIZ
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-1 items-center justify-end gap-6">
              <div className="relative w-[300px]">
                <input
                  type="text"
                  onClick={() => setFocusSearchSuggestions(true)}
                  onBlur={() => {
                    setTimeout(() => setFocusSearchSuggestions(false), 150);
                  }}
                  value={keywords}
                  onChange={(e) => {
                    setKeywords(e.target.value);
                    handleSearchSuggestions(e.target.value);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch(keywords)}
                  placeholder="Search products..."
                  className="w-full py-2 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500 transition placeholder:text-gray-400"
                />

                <button
                  onClick={() => handleSearch(keywords)}
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-400 hover:text-gray-600"
                  aria-label="Search">
                  <BiSearch size={20} />
                </button>
                {focusSearchSuggestions &&
                  (searchHistory.length > 0 || suggestions.length > 0) && (
                    <div
                      ref={suggestionsRef}
                      className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      <ul className="py-1">
                        {suggestions.length > 0 ? (
                          suggestions.map((suggestion, index) => (
                            <li
                              key={index}
                              onClick={() => handleSearch(suggestion.name)}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700">
                              {suggestion.name}
                            </li>
                          ))
                        ) : searchHistory.length > 0 &&
                          filterSearchHistory(searchHistory, keywords).length >
                            0 ? (
                          filterSearchHistory(searchHistory, keywords).map(
                            (historyItem, index) => (
                              <SearchHistoryItem
                                key={`${historyItem}-${index}`}
                                text={historyItem}
                                index={index}
                                onSelect={handleSearch}
                                onDelete={handleDeleteHistory}
                              />
                            ),
                          )
                        ) : (
                          <li
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleSearch(keywords);
                            }}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 flex justify-between items-center group">
                            <a
                              href={`/product?search=${keywords}&page=1&limit=10`}
                              className="truncate flex-1">
                              ค้นหาด้วย &apos;{keywords}&apos;
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
              </div>

              <a
                href="/cart"
                className="hover:text-gray-600 transition-colors">
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
              <a
                href="/cart"
                className="hover:text-gray-600 transition-colors">
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
          {isSearchVisible && (
            <div className="lg:hidden">
              <div className="py-4 px-4 border-t">
                <div className="relative">
                  <input
                    type="text"
                    value={keywords}
                    onFocus={() => setFocusSearchSuggestions(true)}
                    onChange={(e) => {
                      setKeywords(e.target.value);
                      handleSearchSuggestions(e.target.value);
                    }}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleSearch(keywords)
                    }
                    placeholder="Search products..."
                    className="w-full py-2 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500 transition placeholder:text-gray-400"
                  />
                  {focusSearchSuggestions && (
                    <div
                      ref={suggestionsRef}
                      className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      <ul className="py-1">
                        {suggestions.length > 0 ? (
                          suggestions.map((suggestion, index) => (
                            <li
                              key={index}
                              onClick={() => handleSearch(suggestion.name)}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700">
                              {suggestion.name}
                            </li>
                          ))
                        ) : searchHistory.length > 0 &&
                          filterSearchHistory(searchHistory, keywords).length >
                            0 ? (
                          filterSearchHistory(searchHistory, keywords).map(
                            (historyItem, index) => (
                              <SearchHistoryItem
                                key={`${historyItem}-${index}`}
                                text={historyItem}
                                index={index}
                                onSelect={handleSearch}
                                onDelete={handleDeleteHistory}
                              />
                            ),
                          )
                        ) : (
                          <li
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleSearch(keywords);
                            }}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 flex justify-between items-center group">
                            <a
                              href={`/product?search=${keywords}&page=1&limit=10`}
                              className="truncate flex-1">
                              ค้นหาด้วย &apos;{keywords}&apos;
                            </a>
                          </li>
                        )}
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
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

type SearchHistoryItem = {
  text: string;
  index: number;
  onSelect: (text: string) => void;
  onDelete: (index: number) => void;
};

const SearchHistoryItem = ({
  text,
  index,
  onSelect,
  onDelete,
}: SearchHistoryItem) => {
  return (
    <li
      key={`search-history-${text}-${index}`}
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 flex justify-between items-center group"
      role="option"
      aria-selected={false}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSelect(text);
        if (e.key === "Delete") onDelete(index);
      }}>
      <a
        href={`/product?search=${text}&page=1&limit=10`}
        className="truncate flex-1"
        title={text}>
        {text}
      </a>
      {/* <button
      className="p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-200 transition-opacity"
      onClick={(e) => {
        e.stopPropagation();
        onDelete(index);
      }}
      aria-label={`ลบ ${text} จากประวัติการค้นหา`}>
      <X className="h-4 w-4" />
    </button> */}
    </li>
  );
};
