import React from "react";
import { FaPaw, FaHeart, FaHome } from "react-icons/fa";

function AdditionalInfo() {
  return (
    <section className="py-12 px-6 bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Why Choose Us?
      </h2>
      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-lg transition">
          <FaPaw className="text-pink-500 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Animal Care</h3>
          <p className="text-gray-600">
            We ensure every pet is healthy, vaccinated, and ready for adoption.
          </p>
        </div>

        <div className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-lg transition">
          <FaHeart className="text-red-500 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Compassion</h3>
          <p className="text-gray-600">
            We connect pets with families filled with love and kindness.
          </p>
        </div>

        <div className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-lg transition">
          <FaHome className="text-blue-500 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Forever Homes</h3>
          <p className="text-gray-600">
            Our goal is to find every pet a safe and caring forever home.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AdditionalInfo;
