import Image from "next/image";
import React from "react";

import Banner1 from "@/public/images/banner/1927.jpg";

export default function Banner() {
  return (
    <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
      <Image
        src={Banner1}
        alt="Summer Collection Banner"
        fill
        priority
        className="rounded-2xl object-cover"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent rounded-2xl" />

      {/* Content Container */}
      <div className="absolute hidden top-1/4 translate-y-3/4 right-1/4 translate-x-2/4 lg:flex flex-col justify-center items-start ">
        {/* Optional: Banner Text */}
        <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
          Summer Collection
        </h2>
        <p className="text-white/90 text-sm md:text-base mb-6 max-w-md">
          Discover our latest summer styles and trends
        </p>

        {/* Shop Now Button */}
        <button
          className="group relative bg-white py-3 px-6 md:px-8 rounded-xl
                       font-semibold uppercase tracking-wider text-sm
                       transform transition-all duration-300
                       hover:bg-black hover:text-white
                       active:scale-95 
                       shadow-lg hover:shadow-xl">
          Shop Now
          {/* Arrow Icon */}
          <span className="inline-block ml-2 transform transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    </div>
  );
}
