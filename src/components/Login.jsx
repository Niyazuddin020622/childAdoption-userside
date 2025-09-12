import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/login`, formData);

      if (response.data && response.data.user) {
        login(response.data.user);

        // ✅ Success Toast (Green)
        toast.success("🎉 Login Successful! Redirecting...", {
          style: { background: "#d1fae5", color: "#065f46" }, // Green look
        });

        setTimeout(() => navigate("/"), 2000);
      } else {
        throw new Error("Invalid API response");
      }
    } catch (error) {
      // ❌ Error Toast (Red)
      toast.error(error.response?.data?.message || "❌ Login failed!", {
        style: { background: "#fee2e2", color: "#991b1b" }, // Red look
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100 p-4">
      {/* Login Card */}
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login to Adopt
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Links */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 font-semibold">
              Register here
            </Link>
          </p>
          <p>
            <Link to="/forgot-password" className="text-sm text-blue-500">
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
