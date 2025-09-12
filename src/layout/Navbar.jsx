import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isParentOpen, setIsParentOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userMenuRef = useRef(null);

  // Close user dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    { path: "/children", label: "Children" },
    { path: "/resources", label: "Resources" },
    { path: "/donate", label: "Donate" },
    { path: "/gallery", label: "Gallery" },
  ];

  const parentLinks = [
    { path: "/stories", label: "Stories" },
    { path: "/guide", label: "Guide" },
    { path: "/tips", label: "Tips" },
    { path: "/support", label: "Support" },
    { path: "/legal", label: "Legal" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-purple-700 via-pink-600 to-red-600 shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="https://static.vecteezy.com/system/resources/previews/021/955/473/original/happy-family-symbol-icon-logo-design-vector.jpg"
            alt="Logo"
            className="h-12 w-12 rounded-full border-2 border-white shadow-md"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-white font-medium">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`hover:text-yellow-300 transition ${
                location.pathname === item.path ? "font-bold underline" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Parents Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsParentOpen(true)}
            onMouseLeave={() => setIsParentOpen(false)}
          >
            <button className="hover:text-yellow-300 transition flex items-center">
              Parents ▾
            </button>
            {isParentOpen && (
              <div className="absolute top-8 left-0 bg-white text-gray-800 shadow-lg rounded-lg py-2 w-48">
                {parentLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* User / Login */}
        <div className="flex items-center space-x-3" ref={userMenuRef}>
          {user ? (
            <div className="relative">
              <button
                className="text-white flex items-center space-x-1 hover:text-yellow-300"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <FaUserCircle size={22} />
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="bg-white text-pink-600 font-semibold px-4 py-2 rounded-full shadow-md hover:bg-yellow-300 hover:text-black transition">
                <FaUserCircle size={20} className="inline mr-1" /> Login
              </button>
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-purple-700 via-pink-600 to-red-600 text-white px-6 py-4 space-y-2">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block py-2 border-b border-pink-500 hover:text-yellow-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {/* Parents dropdown inside mobile */}
          <div>
            <span className="block py-2 font-semibold">Parents</span>
            <div className="ml-4 space-y-1">
              {parentLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block hover:text-yellow-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
