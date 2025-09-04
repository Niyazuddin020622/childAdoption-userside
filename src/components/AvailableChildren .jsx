import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSectionChildren from "../pages/HeroSectionChildren";

const AvailableChildren = () => {
  const [children, setChildren] = useState([]);
  const [filteredChildren, setFilteredChildren] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/children")
      .then((res) => res.json())
      .then((data) => {
        setChildren(data);
        setFilteredChildren(data);
      })
      .catch((err) => console.error("Error fetching children:", err));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <HeroSectionChildren setFilteredChildren={setFilteredChildren} />

      {/* Heading */}
      <div className="text-center mt-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-800">
          Available Children for Adoption
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-lg">
          These children are looking for a loving family. Click on a profile to
          learn more about them.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-8 sm:grid-cols-3">
        {filteredChildren.map((child) => (
          <div
            key={child._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex items-center gap-4 p-5"
          >
            {/* Left: Image */}
            <div className="flex-shrink-0 w-28 h-28 rounded-xl overflow-hidden">
              <img
                src={child.photo}
                alt={child.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right: Info */}
            <div className="flex flex-col flex-1">
              <h3 className="text-lg font-bold text-gray-800">{child.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-semibold">Age:</span> {child.age}
              </p>
              <p className="mt-2 text-gray-700 text-sm line-clamp-2">
                {child.description}
              </p>

              <button
                onClick={() => navigate(`/child/${child._id}`)}
                className="mt-3 self-start bg-indigo-700 text-white py-1.5 px-4 rounded-lg shadow hover:bg-indigo-800 transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredChildren.length === 0 && (
        <p className="text-center text-gray-500 text-lg pb-10">
          No children available at the moment. Please check back later.
        </p>
      )}
    </div>
  );
};

export default AvailableChildren;
