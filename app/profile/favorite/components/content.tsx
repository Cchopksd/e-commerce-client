"use client";
import React from "react";
import { Favorite } from "../types/Favorite";
import Image from "next/image";

export default function Content({ favorites }: { favorites: Favorite[] }) {

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">รายการโปรด</h2>

      {favorites && favorites.length === 0 ? (
        <div className="text-center text-gray-500">ยังไม่มีรายการโปรด</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites &&
            favorites.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={item.product_id.images[0]?.image_url}
                    fill
                    alt={item.product_id.name}
                    className="w-full h-full object-cover"
                  />
                  {item.product_id.discount < item.product_id.price && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                      -
                      {Math.round(
                        (item.product_id.price - item.product_id.discount) /
                          item.product_id.price,
                      ) * 100}
                      %
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">
                    {item.product_id.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.product_id.detail}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      {item.product_id.discount > 0 ? (
                        <>
                          <span className="text-gray-500 line-through text-sm">
                            ฿ {item.product_id.price.toLocaleString()}
                          </span>
                          <span className="text-primary-600 font-medium">
                            ฿ {item.product_id.discount.toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <span className="text-primary-600 font-medium">
                          ฿{item.product_id.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => {
                        /* เพิ่มฟังก์ชันลบออกจากรายการโปรด */
                      }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
