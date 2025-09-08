// src/pages/Logine.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail as MailIcon, Lock as LockIcon } from "lucide-react"; // ⬅️ ajout des icônes

// Config API
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:8000";
const API_URL = BACKEND_URL;

export default function Logine() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (loginError) setLoginError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setLoginError("");

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);

      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed. Please check your credentials.";
      setLoginError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow rounded-2xl p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">Sign in to Expensio</h1>
        <p className="text-sm text-gray-500 mb-6">
          Track your expenses and take control of your finances
        </p>

        {loginError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3 mb-3">
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700">Email Address</label>
            {/* Champ avec icône Mail */}
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 mt-1 focus-within:ring-2 focus-within:ring-indigo-500">
              <MailIcon size={18} className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent outline-none"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-700">Password</label>
            {/* Champ avec icône Lock */}
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 mt-1 focus-within:ring-2 focus-within:ring-indigo-500">
              <LockIcon size={18} className="text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="flex-1 bg-transparent outline-none"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">Remember me</span>
            </label>

            <Link
              to="/forgot-password"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium py-2 transition"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
