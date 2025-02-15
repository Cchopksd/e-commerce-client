"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { logout } from "./action";

const menuItems = [
  { name: "Profile", path: "/profile" },
  { name: "Orders", path: "/profile/order" },
  { name: "Favorite", path: "/profile/favorite" },
];

export default function UserMenu({ userInfo }: { userInfo: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSignOut = async () => {
    await logout();
    window.location.href = "/";
    setIsOpen(false);
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-10 w-10 rounded-full overflow-hidden border-2 hover:border-gray-300 transition-all duration-200"
      >
        <Image
          src={userInfo?.profile_image || "/default-avatar.png"}
          alt="Profile"
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {item.name}
            </a>
          ))}
          <button
            onClick={handleSignOut}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
