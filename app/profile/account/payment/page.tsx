import React, { Suspense } from "react";
import Payment from "./components/Payment";
import Loading from "./components/Loading";
import AddNewButton from "./components/AddNewButton";

export default async function page() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white shadow-lg rounded-xl">
      <section>
        <div className="flex justify-between py-4">
          <div>
            <h3>Credit Card / Debit Card</h3>
            <p className="text-gray-500">
              Manage your credit card and debit card information.
            </p>
          </div>
          <AddNewButton  />
        </div>
        <hr />
        <Suspense fallback={<Loading />}>
          <div className="pt-8">
            <Payment />
          </div>
        </Suspense>
      </section>
    </div>
  );
}
