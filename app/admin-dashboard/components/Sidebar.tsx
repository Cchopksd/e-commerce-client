"use client";
import React from "react";
import {
  RiDashboardLine,
  RiUserLine,
  RiSettings4Line,
  RiProductHuntLine,
  RiShoppingBagLine,
} from "react-icons/ri";

import { setSidebarOpen } from "@/libs/features/admin/sidebarSlice";

import { useAppDispatch, useAppSelector } from "@/libs/hooks";

const MENU_ITEMS = [
  {
    href: "/admin-dashboard",
    icon: RiDashboardLine,
    label: "แดชบอร์ด",
  },
  {
    href: "/admin-dashboard/manage-user",
    icon: RiUserLine,
    label: "จัดการผู้ใช้",
  },
  {
    href: "/admin-dashboard/manage-product",
    icon: RiProductHuntLine,
    label: "จัดการสินค้า",
  },
  {
    href: "/admin-dashboard/manage-order",
    icon: RiShoppingBagLine,
    label: "จัดการคำสั่งซื้อ",
  },
  {
    href: "/admin-dashboard/settings",
    icon: RiSettings4Line,
    label: "ตั้งค่า",
  },
];

export default function Sidebar() {
  const isOpen = useAppSelector((state) => state.admin.isOpen);
  const dispatch = useAppDispatch();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-[1000] lg:hidden"
          onClick={() => dispatch(setSidebarOpen(false))}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky lg:top-0 w-full  z-[1001] max-w-64 h-screen transition-transform duration-300 
          bg-gray-900 text-gray-100 lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        aria-label="Sidebar Navigation">
        <div className="h-full flex flex-col">
          <div className="p-6">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <ul className="space-y-3">
              {MENU_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => dispatch(setSidebarOpen(false))}>
                    <item.icon className="text-xl" />
                    <span className="font-medium">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}
