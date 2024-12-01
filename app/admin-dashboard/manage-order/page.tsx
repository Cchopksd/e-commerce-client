import React from "react";
import Content from "./components/Content";
import { fetchAllOrders } from "./components/action";
import Pagination from "./components/Pagination";
import Search from "./components/Search";

export default async function ManageOrderPage() {
  const order = await fetchAllOrders("all", 1);

  const totalPages = order.total_page;
  const currentPage = order.page_now;

  return (
    <>
      <Search />
      <Content orders={order.orders} />
      <div className="flex justify-end w-full py-10">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          maxVisible={5}
        />
      </div>
    </>
  );
}
