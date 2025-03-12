import React from "react";
import Banner from "./components/Banner";
import Trending from "./components/treading/Treading";
import CategorySection from "./components/category/Category";
import RecommendCategory from "./components/recommendCategory/Content";

export default function page() {
  return (
    <main className='flex flex-col w-full items-center gap-4 py-10'>
      <section className='w-[90%] max-w-[1440px] flex justify-center items-center mx-auto'>
        <Banner />
      </section>
      <section className='w-[90%] max-w-[1440px] flex justify-center items-center'>
        <CategorySection />
      </section>
      <div className='w-[90%] max-w-[1440px] flex justify-center items-center mx-auto'>
        <Trending />
      </div>
      <section>
        <h2>ข้อเสนอพิเศษ</h2>
        
      </section>
    </main>
  );
}
