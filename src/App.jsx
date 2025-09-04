import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar"; 
import Footer from "./layout/Footer";
import Home from "./components/Home"; // ✅ make sure path sahi ho
import About from "./components/About"
import Contact from "./components/Contact";
import AvailableChildren from "./components/AvailableChildren ";
import ChildDetails from "./pages/ChildDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Resources from "./components/Resource";
import Donates from "./components/Donates";
import Gallery from "./components/Gallery";
import UserProfile from "./userProfile/UserProfile";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />
         <Route path="/about" element={<About />} />
         <Route path="/contact" element={<Contact />} />
         <Route path="/children" element={<AvailableChildren />} />
         <Route path="/child/:id" element={<ChildDetails />} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/donate" element={<Donates />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/profile" element={<UserProfile />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
