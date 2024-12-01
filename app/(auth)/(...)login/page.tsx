"use client";
import React, { useState } from "react";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import Modal from "../components/Modal";
import { login } from "./components/action";
import { BiCheckCircle } from "react-icons/bi";

export default function Page() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errMessage, setErrMessage] = useState({
    email: "",
    password: "",
    result: "",
  });

  const handleSubmit = async () => {
    if (!email) {
      setErrMessage((prev) => ({ ...prev, email: "Email is required" }));
    }

    if (!password) {
      setErrMessage((prev) => ({ ...prev, password: "Password is required" }));
    }

    if (!email || !password) {
      return;
    }

    setErrMessage({ email: "", password: "", result: "" });

    try {
      const response = await login({ email, password });
      if (response.statusCode === 200) {
        window.location.href = "/";
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setErrMessage((prev) => ({
        ...prev,
        result:
          error.message || "An unexpected error occurred. Please try again.",
      }));
    }
  };

  return (
    <Modal>
      <div className="flex flex-col w-full space-y-8">
        <h2 className="text-center uppercase">login</h2>
        <section className="flex flex-col gap-4">
          <section>
            <label htmlFor="email">Email:</label>
            <div className="relative w-full h-10 ">
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="border-1 rounded-md w-full h-full px-2 border-2 border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            {errMessage && errMessage.email && (
              <p className="text-red-500">{errMessage.email}</p>
            )}
          </section>
          <section>
            <label htmlFor="password">Password:</label>
            <div className="relative w-full h-10 ">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="border-1 rounded-md w-full h-full px-2 pr-10 border-2 border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="flex gap-1 items-center absolute top-1/2 -translate-y-1/2 right-3">
                | {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            {errMessage && errMessage.password && (
              <p className="text-red-500">{errMessage.password}</p>
            )}
          </section>
        </section>
        {errMessage && errMessage.result && (
          <p className="text-red-500 bg-red-300 p-2 px-4 rounded-lg flex gap-4 items-center">
            <BiCheckCircle />
            {errMessage.result}
          </p>
        )}
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 text-white uppercase font-semibold shadow-md rounded-md h-10 ">
          Login
        </button>
      </div>
    </Modal>
  );
}
