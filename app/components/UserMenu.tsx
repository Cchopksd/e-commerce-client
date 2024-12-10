"use client";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { logout } from "../utils/token";

interface NavOption {
  name: string;
  path: string;
}

interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
  userMenu: NavOption[];
}

export default function UserMenu({ isOpen, onClose, userMenu }: UserMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleUserLogout = async () => {
    const result = await logout();
    if (result) {
      return (window.location.href = "/");
    }
  };

  return (
    <div
      ref={menuRef}
      className="absolute right-8 top-20 w-48 bg-white rounded-lg shadow-lg z-50">
      <div className="py-2">
        {userMenu.map((item: NavOption, index: number) => (
          <Link
            key={index}
            href={item.path}
            onClick={onClose}
            className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-[#FEF6F1] hover:text-[#257180] 
                     transition-all duration-200 text-sm font-medium">
            {item.name}
          </Link>
        ))}
        <button
          onClick={() => {
            onClose();
            handleUserLogout();
          }}
          className="flex items-center px-4 py-2.5 text-gray-700 hover:bg-[#FEF6F1] hover:text-[#257180] 
                     transition-all duration-200 text-sm font-medium w-full">
          Logout
        </button>
      </div>
    </div>
  );
}
