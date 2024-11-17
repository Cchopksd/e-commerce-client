import React from "react";
import ContentCheckout from "./components/content";
import { fetchCartByID } from "../cart/components/action";

export default async function pageCheckout() {
  const product = await fetchCartByID();

  return (
    <div>
      <ContentCheckout product={product} />
    </div>
  );
}
