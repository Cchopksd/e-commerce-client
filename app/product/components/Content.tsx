"use client";
import React from "react";
import { motion } from "framer-motion";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

export default function Content({
  resourceProduct,
  search,
}: {
  resourceProduct: any;
  search: any;
}) {
  const totalProduct = resourceProduct.total_items;
  const totalPages = resourceProduct.total_page;
  const currentPage = resourceProduct.page_now;
  const product = resourceProduct?.items;

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  return (
    <>
      {/* Header Section */}
      <motion.div
        className="py-12 md:py-16"
        initial="initial"
        animate="animate"
        variants={fadeInUp}>
        <div className="flex items-center space-x-2 text-gray-500 mb-4">
          <span className="hover:text-gray-700 cursor-pointer">Home</span>
          <span>/</span>
          <span className="text-gray-900">Products</span>
        </div>
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight"
          variants={fadeInUp}>
          Our Products
        </motion.h1>
      </motion.div>
      {/* Results Count */}
      <motion.div
        className="pb-8"
        variants={fadeInUp}
        initial="initial"
        animate="animate">
        <p className="text-gray-600">Showing all {totalProduct} results</p>
      </motion.div>
      {/* Product Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10"
        variants={stagger}
        initial="initial"
        animate="animate">
        {product &&
          product.map((product: any) => (
            <motion.div
              key={product._id}
              className="group"
              variants={{
                initial: { opacity: 0, scale: 0.9 },
                animate: { opacity: 1, scale: 1 },
              }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}>
              <ProductCard product={product} />
            </motion.div>
          ))}
      </motion.div>
      {/* Pagination */}
      <motion.div
        className="mt-12 mb-16 flex justify-center"
        variants={fadeInUp}
        initial="initial"
        animate="animate">
        <Pagination
          search={`/product?search=${search}`}
          totalPages={totalPages}
          currentPage={currentPage}
          maxVisible={5}
        />
      </motion.div>
    </>
  );
}
