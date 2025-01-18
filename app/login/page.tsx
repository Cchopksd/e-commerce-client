"use server";
import Login from "../@auth/(.)login/components/Login";

export default async function Page() {
  return (
    <div className="h-full py-10">
      <Login />
    </div>
  );
}
