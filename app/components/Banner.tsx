import Image from "next/image";
import React from "react";

import Banner1 from "@/public/images/banner/banner.png";

export default function Banner() {
  return (
    <div className="relative w-full aspect-[19.5/9] max-h-[500px]">
      <Image
        src={Banner1}
        alt="Summer Collection Banner"
        fill
        priority
        className="rounded-2xl object-cover shadow-lg"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent rounded-2xl" />

      {/* Content Container */}

      {/* <button
        className="absolute bottom-20 right-32 group bg-white py-3 px-6 md:px-8 rounded-xl
                       font-semibold uppercase tracking-wider text-sm
                       transform transition-all duration-300
                       hover:bg-black hover:text-white
                       active:scale-95 
                       shadow-lg hover:shadow-xl">
        Shop Now
        <span className="inline-block ml-2 transform transition-transform group-hover:translate-x-1">
          →
        </span>
      </button> */}
    </div>
  );
}
