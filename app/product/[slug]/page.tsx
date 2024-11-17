import React from "react";
import { fetchProductByID } from "./components/action";
import ProductContent from "./components/ProductContent";
import { getToken } from "@/app/utils/token";

export default async function page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const token = await getToken();

  const product_slug = slug.split("-").pop();
  const product = await fetchProductByID(product_slug);
  return (
    <main className="w-full">
      <section className="w-full max-w-[1440px] m-auto">
        <ProductContent product={product} token={token}/>
      </section>
    </main>
  );
}
