import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.fullName || "",
        email: user.email || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const updatedFormData = {
      ...formData,
      name: user?.fullName || formData.name,
      email: user?.email || formData.email,
    };

    try {
      const response = await fetch("/api/user/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      const data = await response.json();
      if (response.ok) {
        setResponseMessage("✅ Message sent successfully!");
        setFormData({ ...formData, message: "" });
      } else {
        setResponseMessage(data.error || "⚠️ Something went wrong");
      }
    } catch (error) {
      setResponseMessage("❌ Server error, please try again later");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="relative w-full h-80 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-50"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1615723411974-ed6cf1a6180a?q=80&w=2073&auto=format&fit=crop")',
          }}
        ></div>
        <div className="relative text-center text-white">
          <h1 className="text-4xl font-bold">Get in Touch</h1>
          <p className="mt-2 text-lg">We'd love to hear from you!</p>
        </div>
      </header>

     

      {/* Main Section */}
      <div className="max-w-6xl mx-auto py-12 px-6 grid md:grid-cols-2 gap-8">
        {/* Google Map */}
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0191478613876!2d-122.41941548468166!3d37.77492977975914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c8b9aef1f%3A0x4a7a2c06b1e7f4d6!2sSan%20Francisco!5e0!3m2!1sen!2sus!4v1670000000000!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Agency Location"
            className="rounded-xl shadow-lg"
          ></iframe>
        </div>

        {/* Form */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Send Us a Message
          </h3>
          {responseMessage && (
            <p className="mb-4 text-center text-sm font-medium text-green-600 bg-green-100 p-2 rounded-lg">
              {responseMessage}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                disabled
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg bg-gray-100 text-gray-700"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg bg-gray-100 text-gray-700"
              />
            </div>
            <div>
              <label className="block text-gray-700">Message</label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="Write your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-gray-100 py-6 text-center">
        <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
        <div className="flex justify-center space-x-6">
          <a
            href="https://facebook.com/adoptionagency"
            className="text-blue-600 hover:text-blue-800 text-2xl"
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://instagram.com/adoptionagency"
            className="text-pink-500 hover:text-pink-700 text-2xl"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
