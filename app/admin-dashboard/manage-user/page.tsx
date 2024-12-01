import React from "react";
import { getAllUser } from "./components/action";
import Content from "./components/Content";

export default async function page() {
  const users = await getAllUser();
  return (
    <div>
      <Content users={users} />
    </div>
  );
}
