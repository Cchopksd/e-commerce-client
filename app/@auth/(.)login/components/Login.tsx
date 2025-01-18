"use client";
import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { BiCheckCircle } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { login, loginWithGoogle } from "./action";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState({
    email: "",
    password: "",
    result: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!email) {
      setErrMessage((prev) => ({ ...prev, email: "Email is required" }));
    }
    if (!password) {
      setErrMessage((prev) => ({ ...prev, password: "Password is required" }));
    }
    if (!email || !password) return;

    setErrMessage({ email: "", password: "", result: "" });
    try {
      const response = await login({ email, password });
      if (response.statusCode === 400) {
        setErrMessage((prev) => ({
          ...prev,
          result: "Invalid email or password",
        }));
      }
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
    } // Regular login logic here
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 uppercase">
        Login
      </h2>

      <form className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Enter your email"
            />
            {errMessage.email && (
              <p className="mt-1 text-sm text-red-500">{errMessage.email}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 pr-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
              {showPassword ? (
                <FaRegEye className="text-xl" />
              ) : (
                <FaRegEyeSlash className="text-xl" />
              )}
            </button>
            {errMessage.password && (
              <p className="mt-1 text-sm text-red-500">{errMessage.password}</p>
            )}
          </div>
        </div>

        {errMessage.result && (
          <div className="p-3 bg-red-100 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
            <BiCheckCircle className="text-xl flex-shrink-0" />
            <span>{errMessage.result}</span>
          </div>
        )}

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full h-12 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors uppercase">
          Login
        </button>
      </form>
      <div className="relative flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-600">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <button
        onClick={handleGoogleLogin}
        className="w-full h-12 px-6 flex items-center justify-center gap-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
        <FcGoogle className="text-xl" />
        <span className="text-gray-700">Continue with Google</span>
      </button>
    </div>
  );
};

export default Login;
