import React from "react";
import Container from "./components/Container";
import { fetchCartByID } from "./components/action";
import IsCartEmpty from "./components/IsCartEmpty";

export default async function CheckoutPage() {
  const product = await fetchCartByID();

  if (!product || !product.cart) {
    return <div>Error loading checkout page. Please try again later.</div>;
  }

  return (
    <>
      {!product || product.cart.length === 0 ? (
        <IsCartEmpty />
      ) : (
        <Container product={product} />
      )}
    </>
  );
}
