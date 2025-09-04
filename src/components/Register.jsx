import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios"; // ✅ axios import

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    city: "",
    email: "",
    password: "",
    mobile: "",
    reason: "",
    agreeTerms: false,
  });

  const [message, setMessage] = useState(""); // ✅ for success/error messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const API_URL = import.meta.env.VITE_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}api/register`, formData); // ✅ API call
      setMessage(response.data.message || "Registration Successful!");
      console.log("User Registered:", response.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong!");
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      {/* Progress Bar */}
      <div className="flex justify-between mb-6">
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className={`w-8 h-8 flex items-center justify-center rounded-full 
            ${
              step >= num
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            {num}
          </div>
        ))}
      </div>

      {/* ✅ Show Message */}
      {message && (
        <p className="mb-4 text-center text-sm text-green-600 bg-green-100 p-2 rounded">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        {/* Step 1 */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="w-full p-2 border rounded mb-3"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="dob"
              className="w-full p-2 border rounded mb-3"
              value={formData.dob}
              onChange={handleChange}
              required
            />
            <select
              name="gender"
              className="w-full p-2 border rounded mb-3"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="text"
              name="city"
              placeholder="City"
              className="w-full p-2 border rounded mb-3"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </motion.div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4">Contact Details</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 border rounded mb-3"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 border rounded mb-3"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              className="w-full p-2 border rounded mb-3"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </motion.div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4">Adoption Reason</h2>
            <textarea
              name="reason"
              placeholder="Why do you want to adopt?"
              className="w-full p-2 border rounded mb-3"
              value={formData.reason}
              onChange={handleChange}
              required
            />
            <div className="flex items-center mb-3">
              <input type="checkbox" className="mr-2" required />
              <label>I agree to the Terms & Conditions</label>
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          {step > 1 && (
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded"
              onClick={prevStep}
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={nextStep}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Submit
            </button>
          )}
          {/* ✅ Login option below form */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login Now
            </Link>
          </p>
        </div>
        </div>
        
      </form>
    </div>
  );
};

export default Register;
