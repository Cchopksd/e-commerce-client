import React from "react";
import { fetchProductByID } from "./components/action";
import ProductContent from "./components/ProductContent";
import { decryptToken, getToken } from "@/app/utils/token";
import Review, { Review as ReviewType } from "./components/Review";
import { Product } from "@/app/cart/components/interface";
import { LuPackageX } from "react-icons/lu";

interface ProductResult {
  product: Product;
  reviews: ReviewType[];
  favorite: boolean;
}

export default async function page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const token = await getToken();
  const userInfo = await decryptToken(token);
  const product_slug = slug.split("-").pop();

  const productResult: ProductResult = await fetchProductByID({
    product_id: product_slug || "",
    user_id: (userInfo?.sub as string) || "",
  });

  return (
    <main className="w-full flex flex-col gap-10">
      {productResult.product ? (
        <>
          <section className="w-full max-w-[1440px] m-auto">
            <ProductContent
              product={productResult.product}
              token={token}
              favorite={productResult.favorite}
            />
          </section>
          <hr className="w-full max-w-[1440px] m-auto px-4" />
          <section className="w-full max-w-[1440px] m-auto">
            <Review reviews={productResult.reviews} />
          </section>
        </>
      ) : (
        <div className="w-full min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4 py-16 bg-gray-50">
          <div className="text-center max-w-md">
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full">
                <LuPackageX className="w-16 h-16 text-gray-400 dark:text-gray-600" />
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Product Not Found
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              We&apos;re sorry, but the product you&apos;re looking for seems to
              be unavailable or might have been removed.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
