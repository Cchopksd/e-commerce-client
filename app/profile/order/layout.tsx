import React, { Suspense } from "react";
import { OrderStatusBar } from "./components/orderStatus";
import Loading from "./components/Loading";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full space-y-4">
      <OrderStatusBar />
      <section className="w-full">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </section>
    </div>
  );
}
