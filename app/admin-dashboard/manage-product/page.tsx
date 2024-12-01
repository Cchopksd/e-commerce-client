import React from "react";
import { getAllProduct } from "./components/action";
import Content from "./components/Content";

export default async function page() {
  const productsData = await getAllProduct();
  const products = productsData.items;
  const totalItems = productsData.total_items;
  const totalPages = productsData.total_page;
  const currentPage = productsData.page_now;

  return (
    <div>
      <Content products={products} />
    </div>
  );
}
