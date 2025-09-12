import React, { useEffect, useState } from "react";
import socket from "../sockets/socket";  // ✅ Reuse same instance
const API_URL = import.meta.env.VITE_API_URL;


const AdoptionHistory = ({ userId }) => {
  const [adoptionHistory, setAdoptionHistory] = useState([]);

  useEffect(() => {
    const fetchAdoptionHistory = async () => {
      try {
        const response = await fetch(`${API_URL}/api/history/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setAdoptionHistory(data.adoptionHistory);
        } else {
          console.error("Failed to fetch adoption history");
        }
      } catch (error) {
        console.error("Error fetching adoption history:", error);
      }
    };

    fetchAdoptionHistory();

    socket.on("statusUpdated", ({ userId: updatedUserId, newStatus }) => {
      if (updatedUserId === userId) {
        setAdoptionHistory((prevHistory) =>
          prevHistory.map((adopted) =>
            adopted.userId === updatedUserId ? { ...adopted, status: newStatus } : adopted
          )
        );
      }
    });

    return () => {
      socket.off("statusUpdated");
    };
  }, [userId]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Adoption History
      </h2>

      {adoptionHistory.length > 0 ? (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-700 border border-gray-200">
            <thead className="bg-indigo-600 text-white text-center">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Child</th>
                <th className="px-4 py-3">Details</th>
                <th className="px-4 py-3">Adopter Info</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {adoptionHistory.map((adopted, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {/* Index */}
                  <td className="px-4 py-3 text-center font-medium">
                    {index + 1}
                  </td>

                  {/* Child Info */}
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={adopted.child?.photo || "/default-child.png"}
                      alt={adopted.child?.name || "Child"}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {adopted.child?.name || "N/A"}
                      </p>
                      <span className="text-gray-500 text-xs">
                        {adopted.child?.age} yrs • {adopted.child?.gender}
                      </span>
                    </div>
                  </td>

                  {/* Adoption Details */}
                  <td className="px-4 py-3 text-sm">
                    <p>
                      <span className="font-semibold">Adopted On:</span>{" "}
                      {adopted.adoptionDate
                        ? new Date(adopted.adoptionDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )
                        : "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Reason:</span>{" "}
                      {adopted.adoptionReason || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Terms:</span>{" "}
                      {adopted.agreeTerms ? "✅ Yes" : "❌ No"}
                    </p>
                  </td>

                  {/* Adopter Info */}
                  <td className="px-4 py-3 text-sm">
                    <p className="font-semibold">{adopted.fullName}</p>
                    <p>📧 {adopted.email}</p>
                    <p>📞 {adopted.phone}</p>
                    <p>🏠 {adopted.address}</p>
                  </td>

                  {/* Status Badge */}
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        adopted.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : adopted.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {adopted.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">No adoptions yet.</p>
      )}
    </div>
  );
};

export default AdoptionHistory;
