import React from "react";
import Image from "next/image";
import Banner from "../Banner";
// import TrendingProductComponent from "./TrendingProducts";

import ProductImage from "@/public/icons/cat/products.png";
import CouponImage from "@/public/icons/cat/ticket.png";
import SaleImage from "@/public/icons/cat/hot-sale.png";
import BannerImage from "@/public/images/banner/product1.png";
import ProductWithCategory from "../ProductWithCategory";
import { ArrowRight } from "lucide-react";

import dynamic from "next/dynamic";

const TrendingProductComponent = dynamic(() => import("./TrendingProducts"), {
  ssr: false,
});

export default function Home({ trendingProduct }: { trendingProduct: any[] }) {
  const buttons = [
    {
      image: ProductImage,
      alt: "Product image",
      text: "All Products",
      description: "Browse our complete collection", // optional
    },
    {
      image: CouponImage,
      alt: "Coupon image",
      text: "Coupons",
      description: "Save big with special offers", // optional
    },
    {
      image: SaleImage,
      alt: "Sale image",
      text: "Hot Sale",
      description: "Don't miss out on deals", // optional
    },
  ];

  return (
    <>
      <section className="w-full max-w-[1440px] mx-auto p-4 md:py-8">
        <Banner />
      </section>

      <section className="w-full max-w-[1440px] mx-auto px-4 py-6 md:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {buttons.map((button, index) => (
            <button
              key={index}
              className="group relative w-full h-20 md:h-24 bg-white hover:bg-orange-50 
                     rounded-2xl overflow-hidden transition-all duration-300
                     border border-orange-100 hover:border-orange-200
                     shadow-sm hover:shadow-md">
              {/* Decorative Background Pattern */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent" />
                <div className="h-full w-full bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:250px_250px]" />
              </div>

              {/* Content Container */}
              <div className="relative h-full flex items-center justify-center gap-4 px-6">
                {/* Image Container */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 md:w-20 h-16 md:h-20 relative">
                    <Image
                      src={button.image}
                      alt={button.alt}
                      fill
                      className="object-contain transform group-hover:scale-110 group-hover:-rotate-6 
                             transition-transform duration-300 ease-out"
                    />
                  </div>
                </div>

                {/* Text Container */}
                <div className="flex-grow text-left">
                  <span
                    className="text-lg md:text-xl font-semibold text-gray-800 group-hover:text-orange-600
                              transition-colors duration-200">
                    {button.text}
                  </span>

                  {/* Optional Description */}
                  <p className="text-sm text-gray-500 mt-1 hidden md:block">
                    {button.description ||
                      `Explore our ${button.text.toLowerCase()}`}
                  </p>
                </div>

                {/* Arrow Icon */}
                <div
                  className="ml-2 opacity-0 group-hover:opacity-100 transform translate-x-2 
                          group-hover:translate-x-0 transition-all duration-300">
                  <svg
                    className="w-6 h-6 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1440px] m-auto relative py-10 px-4">
        <p className="">Popular Products</p>
        <h2 className="">Trending Now</h2>
        <div className="flex gap-4 py-10  w-full">
          {/* Pass the trendingProduct directly to TrendingProductComponent */}
          <TrendingProductComponent trendingProduct={trendingProduct} />
        </div>
      </section>

      <section className="relative w-full max-w-[1440px] mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="relative aspect-[16/9] md:aspect-[19/9] w-full">
          <Image
            src={BannerImage}
            alt="Elegant shopping display"
            className="w-full h-full object-cover rounded-lg md:rounded-2xl shadow-xl"
          />

          {/* Overlay Card */}
          <div
            className="absolute top-1/2 right-0 transform translate-y-[-50%] p-6 md:p-8 lg:p-12 bg-[#013d28] 
                        w-[90%] md:w-[450px] m-4 md:m-8 lg:m-12 rounded-lg shadow-2xl
                        backdrop-blur-sm bg-opacity-95">
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Get 5% Cash Back
                <br />
                on ฿200
              </h2>
              <p className="text-gray-100 text-sm md:text-base lg:text-lg">
                Shopping is a bit of a relaxing hobby for me, which is sometimes
                troubling for the bank balance.
              </p>
              <button
                className="inline-flex items-center gap-2 bg-white text-[#013d28] px-6 py-3 rounded-full
                              font-semibold transition-all hover:bg-gray-100 hover:scale-105">
                Shop Now <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1440px] py-10 px-4 m-auto">
        <ProductWithCategory trendingProduct={trendingProduct} />
      </section>
    </>
  );
}
