import React from "react";
import { fetchRecommendCategory } from "./action";
import gadgetImage from "@/public/images/category/gadget.webp";
import Image from "next/image";
import { Product } from "@/interface/Product";
import ProductCard from "@/app/product/components/ProductCard";

export default async function Content({ category }: { category: string }) {
  const products = await fetchRecommendCategory({ category });
  return (
    <div className=' flex w-full p-4 bg-white gap-4'>
      <div className='w-[30%] h-full'>
        <Image
          src={gadgetImage}
          alt='category'
          className='w-full h-full object-fill'
        />
      </div>
      <div className='max-w-[70%] overflow-x-auto'>
        <div className='flex gap-8'>
          {products.map((items: Product, idx: number) => (
            <ProductCard
              product={items}
              isFavorite={items.favorite}
              key={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
