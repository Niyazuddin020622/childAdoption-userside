import React, { useEffect, useState } from "react";

const Resources = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch("/api/resources")
      .then((res) => res.json())
      .then((data) => setResources(data))
      .catch((error) => console.error("Error fetching resources:", error));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-indigo-600">
        📚 Adoption Resources
      </h2>

      {/* Grid of Resources */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between border border-gray-100"
          >
            <div>
              <h5 className="text-lg font-semibold text-gray-800 mb-3">
                {index + 1}. {resource.title}
              </h5>
              <p className="text-gray-600 text-sm leading-relaxed min-h-[100px]">
                {resource.description}
              </p>
            </div>

            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block bg-indigo-600 text-white text-sm font-medium px-5 py-2 rounded-xl hover:bg-indigo-700 transition"
            >
              {resource.buttonText || "Learn More"} →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
