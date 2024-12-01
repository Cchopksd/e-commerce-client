import React from "react";
import { getProductById } from "./components/action";
import Content from "./components/Content";

export default async function page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const product = await getProductById(slug);
  return (
    <div>
      <Content productData={product} />
    </div>
  );
}
