import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ChildDetails = () => {
  const { id } = useParams();
  const [child, setChild] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    fetch(`${API_URL}/api/children/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setChild(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching child details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <h2 className="text-center mt-10 text-xl text-gray-600">
        Loading child details...
      </h2>
    );
  }

  if (!child) {
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <h2 className="text-2xl font-bold text-red-600">🚫 Child Not Found</h2>
        <p className="text-gray-500 mt-2">
          The child you are looking for doesn't exist or may have been adopted.
        </p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
          alt="Not Found"
          className="w-40 mt-4"
        />
        <Link
          to="/available-children"
          className="mt-5 bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          🔙 Back to Available Children
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left: Image */}
        <div className="md:w-1/2 h-80 md:h-auto">
          <img
            src={child.photo}
            alt={child.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Details */}
        <div className="md:w-1/2 p-8 flex flex-col">
          <h2 className="text-3xl font-extrabold text-gray-800">
            {child.name}
          </h2>
          <p className="text-lg text-gray-600 mt-1">({child.age} years old)</p>

          <div className="mt-4 space-y-2 text-gray-700">
            <p>
              <strong>📍 Location:</strong> {child.location}
            </p>
            <p>
              <strong>👦 Gender:</strong> {child.gender}
            </p>
            <p>
              <strong>🎓 Education:</strong> {child.education}
            </p>
            <p>
              <strong>🗣️ Languages:</strong> {child.languages.join(", ")}
            </p>
            <p>
              <strong>🎨 Hobbies:</strong> {child.hobbies.join(", ")}
            </p>
            <p>
              <strong>💡 Personality:</strong> {child.personality.join(", ")}
            </p>
            <p>
              <strong>🌟 Aspirations:</strong> {child.aspirations}
            </p>
            <p className="text-gray-500">
              <strong>📖 Background:</strong> {child.background}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">
            <Link
              to="/children"
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              🔙 Back
            </Link>
            <Link
              to={`/adopt-now/${child._id}`}
              state={{ child }}
              className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition"
            >
              ✅ Proceed to Adopt
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildDetails;
