import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Modal from "../modal/Modal";
import { login, loginWithGoogle } from "./action";

export default function Login() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState({
    email: "",
    password: "",
    response: "",
  });

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrMessage({ email: "", password: "", response: "" });

    if (!email) {
      setErrMessage((prev) => ({ ...prev, email: "Email is required" }));
    }
    if (!password) {
      setErrMessage((prev) => ({ ...prev, password: "Password is required" }));
    }

    if (!email || !password) return;

    try {
      const response = await login({ email, password });
      if (response.statusCode === 200) {
        console.info("Login success");
        toggleModal();
        window.location.reload();
      } else {
        setErrMessage((prev) => ({ ...prev, response: response.message }));
      }
    } catch (error) {
      setErrMessage((prev) => ({
        ...prev,
        response: "An error occurred during login.",
      }));
      console.error("Error during login:", error);
    }
  };

  const googleSubmit = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="block px-4 py-2 text-center rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
      >
        Sign In
      </button>

      <Modal width="32rem" height="auto" isOpen={isOpen} onClose={toggleModal}>
        <div className="p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-600 mt-2">
              {isLogin ? "Sign in to continue" : "Register to get started"}
            </p>
          </div>

          <button
            onClick={googleSubmit}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 px-4 hover:bg-gray-50 transition-colors mb-6"
          >
            <FcGoogle className="w-5 h-5" />
            <span className="text-gray-700">
              {isLogin ? "Sign in with Google" : "Sign up with Google"}
            </span>
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrMessage((prev) => ({ ...prev, email: "" }));
                }}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errMessage.email && "border-red-600"
                }`}
                placeholder="Enter your email"
              />
              {errMessage.email && (
                <p className="text-red-600 text-sm">{errMessage.email}</p>
              )}
            </div>

            <div>
              <div className="flex justify-between">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrMessage((prev) => ({ ...prev, password: "" }));
                }}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errMessage.password && "border-red-600"
                }`}
                placeholder="Enter your password"
              />
              {errMessage.password && (
                <p className="text-red-600 text-sm">{errMessage.password}</p>
              )}
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {errMessage.response && (
              <p className="text-red-600 text-sm">{errMessage.response}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-lg py-2.5 hover:bg-blue-700 transition-colors"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={toggleForm}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </Modal>
    </>
  );
}
