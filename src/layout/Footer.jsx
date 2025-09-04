import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-700 via-pink-600 to-red-600 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* About Section */}
        <div>
          <h5 className="text-xl font-semibold mb-4">About Company</h5>
          <p className="text-sm leading-relaxed">
            LittleHaven is a compassionate and trusted child adoption
            organization dedicated to connecting children in need with loving
            families.
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h5 className="text-xl font-semibold mb-4">Contact Us</h5>
          <ul className="space-y-2 text-sm">
            <li>Rajkot, Gujarat 360020</li>
            <li>childadopt02@adoptionagency.com</li>
            <li>+91 8825135461</li>
            <li>+91 6206173716</li>
            <li>+91 6203357350</li>
          </ul>
        </div>

        {/* Opening Hours */}
        <div>
          <h5 className="text-xl font-semibold mb-4">Opening Hours</h5>
          <p className="text-sm">Mon - Fri: 8am - 9pm</p>
          <p className="text-sm">Sat - Sun: 9am - 10pm</p>
        </div>

        {/* Newsletter */}
        <div>
          <h5 className="text-xl font-semibold mb-4">Newsletter</h5>
          <p className="text-sm mb-3">
            Subscribe to our newsletter to get the latest updates.
          </p>
          <div className="flex space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold px-4 py-2 rounded-lg shadow-md transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-black bg-opacity-30 text-center py-4 text-sm">
        © 2025 LittleHaven | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
