import React, { useState } from "react";

const ProfileSection = ({ user, setUser }) => {
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || "https://via.placeholder.com/150"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedUser),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        setIsEditing(false);
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while updating profile.");
      console.error("Error updating profile:", error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
      <div className="flex flex-col items-center">
        <label htmlFor="profileImageInput" className="cursor-pointer">
          <img
            src={profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-indigo-500 object-cover hover:scale-105 transition-transform"
          />
        </label>
        <input
          id="profileImageInput"
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
        />
      </div>

      {isEditing ? (
        <div className="mt-6 space-y-4">
          <input
            type="text"
            name="fullName"
            value={editedUser.fullName}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="email"
            name="email"
            value={editedUser.email}
            disabled
            className="w-full bg-gray-100 border border-gray-300 rounded-lg p-2"
          />
          <input
            type="text"
            name="dob"
            value={editedUser.dob}
            onChange={handleInputChange}
            placeholder="Date of Birth"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <select
            name="gender"
            value={editedUser.gender}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="tel"
            name="mobile"
            value={editedUser.mobile}
            onChange={handleInputChange}
            placeholder="Mobile Number"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            name="region"
            value={editedUser.region}
            onChange={handleInputChange}
            placeholder="Region"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            name="city"
            value={editedUser.city}
            onChange={handleInputChange}
            placeholder="City"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={handleSaveChanges}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      ) : (
        <div className="mt-6 text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">{user.fullName}</h2>
          <p className="text-gray-600">{user.email}</p>
          <button
            onClick={handleEditToggle}
            className="mt-3 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full transition"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
