import Image from "next/image";

import fetchTrendingProduct from "./components/action";
import ProductCard from "./product/components/ProductCard";
import Banner from "./components/Banner";
import Pagination from "./product/components/Pagination";

export default async function Home() {
  const trendingProduct = await fetchTrendingProduct();

  return (
    <main className="h-full">
      <section className="w-full max-w-[1440px] mx-auto p-4 md:py-8">
        <Banner />
      </section>
      <hr className="w-full max-w-[1440px] m-auto" />
      <section className="w-full max-w-[1440px] m-auto relative py-10">
        <p className="text-center">Popular Products</p>
        <h2 className="text-center text-[48px]">Trending Now</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-10 px-4">
          {trendingProduct.map((product: any) => (
            <div key={product._id} className="flex justify-center">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
