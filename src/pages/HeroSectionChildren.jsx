import React, { useState } from "react";
import { motion } from "framer-motion";

function HeroSectionChildren({ setFilteredChildren }) {
  const [gender, setGender] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [location, setLocation] = useState("");
const API_URL = import.meta.env.VITE_API_URL;
  const handleSearch = async () => {
    try {
      let query = `${API_URL}/api/children?`;
      const params = [];

      if (gender) params.push(`gender=${encodeURIComponent(gender)}`);
      if (ageGroup) params.push(`ageGroup=${encodeURIComponent(ageGroup)}`);
      if (location) params.push(`location=${encodeURIComponent(location)}`);

      if (params.length > 0) query += params.join("&");

      const response = await fetch(query);
      const data = await response.json();

      setFilteredChildren(data);
    } catch (error) {
      console.error("Error fetching filtered children:", error);
    }
  };

  return (
    <section
      className="relative bg-cover bg-center h-[550px] flex items-center justify-center"
      style={{
        backgroundImage:
          'url("https://img.freepik.com/free-photo/dad-daughter-having-breakfast-kitchen_144627-39775.jpg?w=1060")',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>

      {/* Content */}
      <div className="relative text-center text-white px-6 max-w-4xl z-10">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg"
        >
          Every Child Deserves a <span className="text-indigo-400">Loving Home</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl mt-4 text-gray-200"
        >
          Join us in creating brighter futures. Start your adoption journey today.
        </motion.p>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-10 flex flex-col md:flex-row items-center gap-4 
                     bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-2xl"
        >
          {/* Gender */}
          <select
            className="w-full md:w-1/4 px-4 py-3 rounded-lg bg-white/90 text-gray-800 shadow focus:ring-2 focus:ring-indigo-500 transition"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Boy">Boy</option>
            <option value="Girl">Girl</option>
          </select>

          {/* Age Group */}
          <select
            className="w-full md:w-1/4 px-4 py-3 rounded-lg bg-white/90 text-gray-800 shadow focus:ring-2 focus:ring-indigo-500 transition"
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
          >
            <option value="">Select Age Group</option>
            <option value="infant">Infant (0-2 years)</option>
            <option value="toddler">Toddler (2-5 years)</option>
            <option value="teen">Teen (6+ years)</option>
          </select>

          {/* Location */}
          <select
            className="w-full md:w-1/4 px-4 py-3 rounded-lg bg-white/90 text-gray-800 shadow focus:ring-2 focus:ring-indigo-500 transition"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Select Location</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai, India</option>
            <option value="Hyderabad">Hyderabad, Telangana</option>
          </select>

          {/* Button */}
          <button
            onClick={handleSearch}
            className="w-full md:w-auto px-8 py-3 rounded-lg 
                       bg-gradient-to-r from-indigo-600 to-purple-600 
                       text-white font-semibold shadow-lg 
                       hover:from-indigo-700 hover:to-purple-700 transition"
          >
            Filter Child
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSectionChildren;
