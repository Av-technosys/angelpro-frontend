import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../utils/localStorageManager";

function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const result = await axiosClient.post("/auth/login", {
        phone,
        password,
      });
      setItem(KEY_ACCESS_TOKEN, result.result.accessToken);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || e.message));
    }
  }

  return (
    <div className="fixed inset-0 w-full z-50 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="flex w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 flex-col gap-5 text-gray-800">
        <div className="bg-white w-full rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
            LOGIN
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Phone No"
                type="number"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <p className="text-sm text-gray-600 text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 underline">
                Sign Up
              </Link>
            </p>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
