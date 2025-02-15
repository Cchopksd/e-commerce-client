import React from "react";
import Banner from "./components/Banner";
import Trending from "./components/treading/Treading";
import CategorySection from "./components/category/Category";
import RecommendCategory from "./components/recommendCategory/Content";

export default function page() {
  return (
    <main className="flex flex-col w-full items-center gap-4">
      <section className="w-[90%] max-w-[1440px] flex justify-center items-center mx-auto">
        <Banner />
      </section>
      <section className="w-[90%] max-w-[1440px] flex justify-center items-center">
        <CategorySection />
      </section>
      <div className="w-[90%] max-w-[1440px] flex justify-center items-center mx-auto">
        <Trending />
      </div>
      <section className="w-[90%] max-w-[1440px] flex items-center mx-auto flex-nowrap">
        <hr className="h-1 border-none bg-gray-300 w-[5%]" />
        <h2 className="text-2xl font-bold mx-6 whitespace-nowrap">
          หมวดสินค้ายอดนิยม
        </h2>
        <hr className="h-1 flex-1 border-none bg-gray-300" />
      </section>
      <section className="w-[90%] max-w-[1440px] flex flex-col mx-auto">
        <h3 className="text-xl mx-6 font-semibold text-start pb-4">
          ไอที & แก็ทเจ็ด
        </h3>
        <RecommendCategory category="asd" />
      </section>
    </main>
  );
}
