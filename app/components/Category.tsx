import React from "react";
import Image from "next/image";
import Link from "next/link";

const TopCategories = () => {
  const categories = [
    {
      id: 1,
      name: "Gadgets",
      itemCount: "856 Products",
      image:
        "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=300",
      href: "/category/gadgets",
      featured: true,
    },
    {
      id: 2,
      name: "Fashion",
      itemCount: "1288 Products",
      image:
        "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=300",
      href: "/category/fashion",
    },
    {
      id: 3,
      name: "Beauty",
      itemCount: "745 Products",
      image:
        "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=300",
      href: "/category/beauty",
    },
    {
      id: 4,
      name: "Furniture",
      itemCount: "589 Products",
      image:
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300",
      href: "/category/furniture",
    },
    {
      id: 5,
      name: "Technology",
      itemCount: "912 Products",
      image:
        "https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&w=300",
      href: "/category/technology",
    },
    {
      id: 6,
      name: "Home & Living",
      itemCount: "678 Products",
      image:
        "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=300",
      href: "/category/home-living",
    },
    {
      id: 7,
      name: "Sports",
      itemCount: "494 Products",
      image:
        "https://images.pexels.com/photos/2247179/pexels-photo-2247179.jpeg?auto=compress&cs=tinysrgb&w=300",
      href: "/category/sports",
    },
    {
      id: 8,
      name: "Books & Stationery",
      itemCount: "386 Products",
      image:
        "https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=300",
      href: "/category/books-stationery",
    },
  ];

  return (
    <section className="w-full bg-white ">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex items-baseline justify-between mb-8 md:mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              Shop our top categories
            </h2>
            <p className="mt-2 text-gray-600 text-base md:text-lg">
              Browse through our most popular collections
            </p>
          </div>
          <Link
            href="/categories"
            className="hidden md:flex items-center text-orange-600 hover:text-orange-700 
                     font-medium transition-colors duration-200">
            View All
            <svg
              className="w-5 h-5 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className={`group relative overflow-hidden rounded-2xl bg-gray-100 
                       ${
                         category.featured ? "md:col-span-2 md:row-span-2" : ""
                       }`}>
              {/* Background Image */}
              <div className="aspect-square w-full overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-300 
                           group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Category Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-200">{category.itemCount}</p>

                {/* Hover Effect Button */}
                <div
                  className="mt-3 transform translate-y-8 opacity-0 
                             group-hover:translate-y-0 group-hover:opacity-100 
                             transition-all duration-300">
                  <span className="inline-flex items-center text-sm font-medium text-white">
                    Shop Now
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/categories"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 
                     font-medium transition-colors duration-200">
            View All Categories
            <svg
              className="w-5 h-5 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
