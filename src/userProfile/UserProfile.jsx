import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileSection from "./ProfileSection";
import AdoptionHistory from "./AdoptionHistory";
import ContactHistory from "./ContactHistory";
import DonationHistory from "./DonationHistory";
import { motion, AnimatePresence } from "framer-motion";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "history", label: "Adoption History" },
    { id: "contacthistory", label: "Contact History" },
    { id: "donation", label: "Donation History" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
          User Profile
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl shadow-md transition-transform transform hover:scale-105"
        >
          Logout
        </button>
      </div>

      {/* Tabs Card */}
      <div className="bg-white shadow-lg rounded-2xl p-4 md:p-6">
        <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                  : "border border-indigo-500 text-indigo-600 hover:bg-indigo-50"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === "profile" && user && (
              <ProfileSection user={user} setUser={setUser} />
            )}
            {activeTab === "history" && user && (
              <AdoptionHistory userId={user._id} />
            )}
            {activeTab === "contacthistory" && user && (
              <ContactHistory userId={user._id} />
            )}
            {activeTab === "donation" && user && (
              <DonationHistory userId={user._id} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserProfile;
