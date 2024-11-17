import fetchTrendingProduct from "./components/action";

import Home from "./components/home/Home";

export default async function Page() {
  const trendingProduct = await fetchTrendingProduct();

  return (
    <main className="h-full">
      <Home trendingProduct={trendingProduct} />
    </main>
  );
}
