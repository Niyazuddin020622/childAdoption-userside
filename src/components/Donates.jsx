// Donates.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
// import Logo from "../assets/favicon.png";

const Donates = () => {
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [donationType, setDonationType] = useState("education");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    // Autofill from logged-in user
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setDonorName(user.fullName || "");
      setEmail(user.email || "");
    }
  }, []);

  const handleDonate = (e) => {
    e.preventDefault();

    if (!donorName || !email || !phone || !amount) {
      alert("Please fill all fields");
      return;
    }

    if (typeof window.Razorpay === "undefined") {
      alert("Razorpay SDK not loaded yet. Please wait a moment.");
      return;
    }

    const options = {
      key: "rzp_test_vynt15lhzKMrgS", // Razorpay key here
      amount: amount * 100,
      currency: "INR",
      name: "Child Adoption Support",
      description: `Donation for ${donationType}`,
    //   image: Logo,
      handler: function (response) {
        handlePaymentDone(response.razorpay_payment_id);
      },
      prefill: {
        name: donorName,
        email: email,
        contact: phone,
      },
      theme: {
        color: "#16a34a", // Tailwind green-600
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePaymentDone = async (paymentId) => {
    const donationData = {
      donorName,
      email,
      phone,
      amount,
      donationType,
      razorpayPaymentId: paymentId,
      paymentStatus: "Completed",
      paymentMethod: "Razorpay",
    };
const API_URL = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${API_URL}/api/donate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Thank you! Your donation has been received successfully.");
        setPhone("");
        setAmount("");
        setDonationType("education");
      } else {
        console.error("Donation failed:", data);
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-green-100 flex items-center justify-center px-6 py-12">
      <div className="grid lg:grid-cols-2 gap-10 max-w-6xl w-full">
        {/* Left Section: Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-xl rounded-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            🌟 Support Child Adoption
          </h2>
          <p className="text-gray-600 mb-6">
            Your contribution helps children receive support, care, and legal
            assistance.
          </p>
          <ul className="space-y-3 text-gray-700 font-medium mb-6">
            <li className="flex items-center gap-2">
              ✅ Adoption services & legal aid
            </li>
            <li className="flex items-center gap-2">
              ✅ Medical care & mental health support
            </li>
            <li className="flex items-center gap-2">
              ✅ Educational resources & opportunities
            </li>
          </ul>
          <img
            src="https://img.freepik.com/free-photo/children-group_23-2148107402.jpg"
            alt="Children in need"
            className="rounded-xl shadow-md w-full object-cover"
          />
        </motion.div>

        {/* Right Section: Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-xl rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-center text-green-700 mb-6">
            Make a Donation
          </h3>
          <form onSubmit={handleDonate} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                readOnly
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">
                Donation Amount (₹)
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Donation Type</label>
              <select
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
                value={donationType}
                onChange={(e) => setDonationType(e.target.value)}
                required
              >
                <option value="education">📘 Education</option>
                <option value="health">🩺 Health</option>
                <option value="food">🍎 Food</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              💚 Donate with Razorpay
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Donates;
