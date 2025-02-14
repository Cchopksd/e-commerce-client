import React from "react";
import Banner from "./components/Banner";
import Trending from "./components/treading/Treading";
import CategorySection from "./components/category/Category";

export default function page() {
  return (
    <main className="flex flex-col w-full items-center">
      <section className="w-[90%] max-w-[1440px] py-10 flex justify-center items-center mx-auto">
        <Banner />
      </section>
      <section className="w-[90%] max-w-[1440px] py-10 flex justify-center items-center">
        <CategorySection />
      </section>
      <Trending />
      
    </main>
  );
}
