import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSendOTP = async () => {
    setLoading(true);
    setMessage({ text: "", type: "" });
    try {
      const res = await axios.post(`${API_URL}/api/send-otp`, { email });
      setMessage({ text: res.data.message, type: "success" });
      setStep(2);
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Failed to send OTP",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    setMessage({ text: "", type: "" });
    try {
      const res = await axios.post(`${API_URL}/api/verify-otp`, { email, otp });
      setMessage({ text: res.data.message, type: "success" });
      setStep(3);
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Failed to verify OTP",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    setMessage({ text: "", type: "" });
    try {
      const res = await axios.post(`${API_URL}/api/reset-password`, {
        email,
        newPassword,
      });
      setMessage({ text: res.data.message, type: "success" });
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Password reset failed",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-2 gap-6 w-full max-w-4xl bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
      >
        {/* Left Side */}
        <div className="flex flex-col justify-center items-center p-6 bg-blue-50">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Child Adoption</h2>
          <img
            alt="Child Adoption"
            src="https://precisionadvisory.com.au/wp-content/uploads/2015/12/happy-family-with-grandparents-children-1200x800.jpg"
            className="rounded-xl shadow-md w-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="flex flex-col justify-center p-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Forgot Password
          </h2>

          {message.text && (
            <div
              className={`p-3 mb-4 rounded-lg text-sm font-medium ${
                message.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}

          {step === 1 && (
            <>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                onClick={handleSendOTP}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none mb-4"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button
                onClick={handleVerifyOTP}
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-60"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:outline-none mb-4"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button
                onClick={handleResetPassword}
                disabled={loading}
                className="w-full bg-yellow-500 text-white py-3 rounded-xl font-semibold hover:bg-yellow-600 transition disabled:opacity-60"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </>
          )}

          {/* Back to Login */}
          <p className="text-center mt-6 text-gray-600 text-sm">
            Remembered your password?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 font-semibold hover:underline"
            >
              Back to Login
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
