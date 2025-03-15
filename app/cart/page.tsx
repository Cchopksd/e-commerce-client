import React from "react";
import { fetchCartByID } from "./components/action";
import Cart from "./components/cart";
import CartEmpty from "./components/CartEmpty";

export default async function CartPage() {
  const result = await fetchCartByID();

  if (!result) {
    return <CartEmpty />;
  }

  return (
    <main className="w-full h-full min-h-screen bg-[#eff3f6]">
      <Cart cart={result} />
    </main>
  );
}
