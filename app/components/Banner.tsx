import Image from "next/image";
import React from "react";

import Banner1 from "@/public/images/banner/banner.png";

export default function Banner() {
  return (
    <div className="relative w-full h-[400px] md:h-[500px]">
      <Image
        src={Banner1}
        alt="Summer Collection Banner"
        fill
        priority
        className="rounded-2xl object-cover shadow-lg"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent rounded-2xl" />
      <section className="absolute inset-0 flex flex-col justify-center left-16 text-white space-y-4">
        <div className="flex items-center gap-2 bg-[#E6E6E0]/50 px-2 py-1 rounded-full w-max">
          <div className="bg-[#A6A6A0]/60 rounded-full px-2 py-1">
            SaleUp to 30%
          </div>
          OFF if you order today
        </div>
        <div>
          <h2 className="text-white">Save today on your new Television.</h2>
          <p>
            Reserve your new Apple iMac 27” today and enjoy exclusive savings.{" "}
            <br />
            Pre-order now to secure your discount.
          </p>
        </div>

        <div>
          <button className="bg-white text-black px-4 py-2 rounded-full ">
            Shop Now
          </button>
        </div>
      </section>
    </div>
  );
}
