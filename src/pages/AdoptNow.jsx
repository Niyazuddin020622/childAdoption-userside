import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const AdoptNow = ({ user }) => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [child, setChild] = useState(location.state?.child || null);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUser = user || storedUser;

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: loggedInUser?.fullName || "",
    email: loggedInUser?.email || "",
    phone: "",
    address: "",
    occupation: "",
    adoptionReason: "",
    agreeTerms: false,
    userId: loggedInUser?._id || null,
    childId: id || null,
  });
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    if (!child) {
      fetch(`${API_URL}/api/children/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setChild(data);
          setFormData((prev) => ({ ...prev, childId: data._id }));
        })
        .catch((err) => console.error("Error fetching child details:", err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreeTerms) {
      alert("You must agree to the terms before submitting.");
      return;
    }

    const formSubmission = {
      ...formData,
      user: loggedInUser?._id,
      child: child?._id,
    };

    try {
      const response = await fetch(`${API_URL}/api/adoptionform`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formSubmission),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setTimeout(() => navigate("/available-children"), 3000);
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to submit application.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  if (!loggedInUser) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-3">🔒 Not Logged In</h2>
          <p className="text-gray-600 mb-6">
            Please log in to continue with the adoption process.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!child) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-700">
        <h2 className="text-xl">Loading child details...</h2>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Adopt {child.name}
        </h2>
        <div className="flex flex-col items-center">
          <img
            src={child.photo}
            alt={child.name}
            className="w-40 h-40 object-cover rounded-full border-4 border-blue-200 shadow-md mb-4"
          />
          <p className="text-gray-600 mb-6">
            <strong>Location:</strong> {child.location}
          </p>
        </div>

        {!formSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
            />

            {/* Phone */}
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />

            {/* Address */}
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />

            {/* Occupation */}
            <input
              type="text"
              name="occupation"
              placeholder="Occupation"
              value={formData.occupation}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />

            {/* Adoption Reason */}
            <textarea
              name="adoptionReason"
              placeholder="Why do you want to adopt?"
              value={formData.adoptionReason}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />

            {/* Terms */}
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <span>I agree to the adoption policies.</span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Submit Application
            </button>
          </form>
        ) : (
          <div className="text-center text-green-600 font-semibold text-lg">
            ✅ Adoption application submitted successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default AdoptNow;
