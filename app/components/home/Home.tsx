import React from "react";
import Image from "next/image";
import Banner from "../Banner";
import TrendingProductComponent from "./TrendingProducts";

import ProductImage from "@/public/icons/cat/products.png";
import CouponImage from "@/public/icons/cat/ticket.png";
import SaleImage from "@/public/icons/cat/hot-sale.png";
import BannerImage from "@/public/images/banner/product1.png";
import ProductWithCategory from "../ProductWithCategory";

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
      <section className="w-full max-w-[1440px] m-auto relative py-10 ">
        <p className="">Popular Products</p>
        <h2 className="">Trending Now</h2>
        <div className="flex gap-4 py-10  w-full">
          {/* Pass the trendingProduct directly to TrendingProductComponent */}
          <TrendingProductComponent trendingProduct={trendingProduct} />
        </div>
      </section>

      <section className="relative w-full max-w-[1440px] py-10 p-4 aspect-[19/9] m-auto">
        <Image
          src={BannerImage}
          alt="product image"
          className="relative max-h-[600px] w-full object-cover shadow-lg rounded-2xl "
        />
        <div className="bg-[#013d28] top-0 translate-y-1/2 right-20 p-14 m-10 absolute w-1/3 h-auto space-y-6">
          <h2 className="text-white">
            Get 5% Cash back on <br />฿ 200
          </h2>
          <p className="text-white">
            Shopping is a bit of a relaxing hobby for me, which is sometimes
            troubling for the bank balance.
          </p>
        </div>
      </section>

      <section className="w-full max-w-[1440px] py-10 px-4 m-auto">
        <h2>Todays Best Deals for you!</h2>
        <ProductWithCategory trendingProduct={trendingProduct} />
      </section>
    </>
  );
}
