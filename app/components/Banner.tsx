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
    </div>
  );
}
