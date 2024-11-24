import React from "react";
import { fetchProductByID } from "./components/action";
import ProductContent from "./components/ProductContent";
import { decryptToken, getToken } from "@/app/utils/token";
import Review, { Review as ReviewType } from "./components/Review";
import { Product } from "@/app/cart/components/interface";

interface ProductResult {
  product: Product;
  reviews: ReviewType[];
  favorite: boolean;
}

export default async function page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const token = await getToken();
  const userInfo = await decryptToken(token);

  const product_slug = slug.split("-").pop();

  if (!product_slug) {
    return <div>No product slug</div>;
  }

  const productResult: ProductResult = await fetchProductByID({
    product_id: product_slug,
    user_id: userInfo?.sub || "",
  });

  console.log(productResult);

  return (
    <main className="w-full flex flex-col gap-10">
      <section className="w-full max-w-[1440px] m-auto">
        <ProductContent product={productResult.product} token={token} />
      </section>
      <hr className="w-full max-w-[1440px] m-auto px-4" />
      <section className="w-full max-w-[1440px] m-auto">
        <Review reviews={productResult.reviews} />
      </section>
    </main>
  );
}
