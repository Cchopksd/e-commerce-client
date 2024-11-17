import React from "react";
import { fetchCartByID } from "./components/action";
import Cart from "./components/cart";

export default async function page() {
  const result = await fetchCartByID();

  return (
    <main className="w-full h-full min-h-screen bg-[#eff3f6]">
      <Cart cart={result} />
    </main>
  );
}
