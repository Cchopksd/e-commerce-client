"use client";
import React, { useState } from "react";
import { Tag, ShoppingBag, Sparkles, Sofa, Cpu } from "lucide-react";
import ProductCard from "../product/components/ProductCard";
import { Product } from "../cart/components/interface";

const ProductGrid = ({ trendingProduct }: { trendingProduct: Product[] }) => {
  const [selected, setSelected] = useState("Gadgets");

  const optionCategory = [
    { name: "Gadgets", icon: <Tag className="w-4 h-4" /> },
    { name: "Fashion", icon: <ShoppingBag className="w-4 h-4" /> },
    { name: "Beauty", icon: <Sparkles className="w-4 h-4" /> },
    { name: "Furniture", icon: <Sofa className="w-4 h-4" /> },
    { name: "Technology", icon: <Cpu className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Today&aposs Best Deals For You!
        </h2>

        <div className="flex flex-wrap gap-3">
          {optionCategory.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelected(item.name)}
              className={`
                flex items-center gap-2 px-6 py-2.5 rounded-full
                transition-all duration-200 ease-in-out
                hover:shadow-md
                ${
                  selected === item.name
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-orange-500"
                }
              `}>
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingProduct.map((product) => (
          <div key={product._id}>
            <>{product.favorite}</>
            <ProductCard product={product} isFavorite={product.favorite} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
