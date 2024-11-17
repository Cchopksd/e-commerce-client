import React from "react";
import Image from "next/image";
import Banner from "../Banner";
import TrendingProductComponent from "./TrendingProducts";

import ProductImage from "@/public/icons/cat/products.png";
import CouponImage from "@/public/icons/cat/ticket.png";
import SaleImage from "@/public/icons/cat/hot-sale.png";
import BannerImage from "@/public/images/banner/product1.png";
import ProductWithCategory from "../ProductWithCategory";
import { ArrowRight } from "lucide-react";

export default function Home({ trendingProduct }: { trendingProduct: any[] }) {
  const buttons = [
    {
      image: ProductImage,
      alt: "Product image",
      text: "All Products",
    },
    {
      image: CouponImage,
      alt: "Coupon image",
      text: "Coupons",
    },
    {
      image: SaleImage,
      alt: "Sale image",
      text: "Hot Sale",
    },
  ];

  return (
    <>
      <section className="w-full mx-auto p-4 md:py-8">
        <Banner />
      </section>

      <section className="w-full max-w-[1440px] flex gap-10 px-8 py-8 p-4">
        {buttons.map((button, index) => (
          <button
            key={index}
            className="relative w-full h-12 bg-gray-50 hover:bg-[#ffdfc6] text-black font-medium px-6 rounded-[40px] shadow-lg border-2
          border-[#e2711d] transition-all duration-200">
            <div className="absolute w-14 h-14 top-1/2 -translate-y-1/2 -left-5">
              <Image
                src={button.image}
                alt={button.alt}
                fill
                className="-rotate-12 object-contain"
              />
            </div>
            <span className="font-semibold">{button.text}</span>
          </button>
        ))}

        {/* <button className="">
          <Image src={couponImage} alt={"coupon image"} width={0} height={0} />
        </button>
        <button className="">
          <Image src={saleImage} alt={"sale image"} width={0} height={0} />
        </button> */}
      </section>
      <section className="w-full max-w-[1440px] py-10 p-4">
        <h2>Shop our top categories</h2>
        <div></div>
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
