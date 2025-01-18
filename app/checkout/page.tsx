import React from "react";
import ContentCheckout from "./components/content";
import { fetchCartByID } from "../cart/components/action";
import IsCartEmpty from "./components/IsCartEmpty";

export default async function pageCheckout() {
  const product = await fetchCartByID();

  return (
    <>
      {product.cart.length === 0 ? (
        <IsCartEmpty />
      ) : (
        <ContentCheckout product={product} />
      )}
    </>
  );
}
