"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ProductCard from "@/app/product/components/ProductCard";

interface TrendingProductComponentProps {
  trendingProduct: any;
}

const TrendingProductComponent = ({
  trendingProduct,
}: TrendingProductComponentProps) => {
  const [progress, setProgress] = useState(0);

  const handleSlideChange = (swiper: SwiperType) => {
    const currentIndex = swiper.activeIndex;
    const totalSlides = swiper.slides.length - (swiper.loopedSlides ?? 0) * 2;
    const slidesPerView: number = Number(swiper.params.slidesPerView);

    const progressBar =
      (currentIndex + 1) / (totalSlides - (slidesPerView ?? 0) + 1);
    setProgress(progressBar);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="relative">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={2}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          onSlideChange={handleSlideChange}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="py-4">
          {trendingProduct.map((product: any) => (
            <SwiperSlide key={product._id}>
              <div className="flex justify-center">
                <ProductCard product={product} isFavorite={product.favorite} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 mt-4 h-1 rounded-full overflow-hidden">
        <div
          className="bg-gray-500 h-1 transition-all duration-300 ease-in-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
};

export default TrendingProductComponent;
