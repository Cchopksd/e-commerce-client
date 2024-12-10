"use server";

import Modal from "../components/Modal";
import Login from "./components/Login";

export default async function Page() {
  return (
    <Modal>
      <Login />
    </Modal>
  );
}
