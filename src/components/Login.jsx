import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const API_URL = import.meta.env.VITE_API_URL;
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/login`, formData);

      if (response.data && response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setMessage("✅ Login Successful! Redirecting...");
        setTimeout(() => navigate("/"), 2000);
      } else {
        throw new Error("Invalid API response");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Side - Image */}
        <div className="hidden md:flex flex-col justify-center items-center bg-blue-50 p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Welcome to Child Adoption
          </h2>
          <img
            src="https://precisionadvisory.com.au/wp-content/uploads/2015/12/happy-family-with-grandparents-children-1200x800.jpg"
            alt="Child Adoption"
            className="rounded-xl shadow-lg object-cover"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="flex flex-col justify-center p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Login to Adopt
          </h2>

          {message && (
            <p
              className={`mb-4 text-center text-sm p-2 rounded-lg ${
                message.includes("✅")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-semibold hover:underline"
              >
                Register here
              </Link>
            </p>
            <p className="mt-2">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
