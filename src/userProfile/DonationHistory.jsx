import React, { useEffect, useState } from "react";

const DonationHistory = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.email) {
      console.error("User not found or not logged in.");
      setLoading(false);
      return;
    }

    fetch(`/api/donations?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setDonations(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching donations:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <p className="text-center text-gray-500 py-6">Loading donation history...</p>
    );
  }

  if (donations.length === 0) {
    return (
      <p className="text-center text-gray-500 py-6">No donation history found.</p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Donation History
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-indigo-600 text-white text-center">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Donor Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Amount (₹)</th>
              <th className="px-4 py-3">Donation Type</th>
              <th className="px-4 py-3">Payment Method</th>
              <th className="px-4 py-3">Razorpay ID</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, index) => (
              <tr
                key={donation._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 text-center">{index + 1}</td>
                <td className="px-4 py-3 font-medium">{donation.donorName}</td>
                <td className="px-4 py-3">{donation.email}</td>
                <td className="px-4 py-3">{donation.phone}</td>
                <td className="px-4 py-3 font-semibold text-green-600">
                  ₹{donation.amount.toLocaleString()}
                </td>
                <td className="px-4 py-3">{donation.donationType}</td>
                <td className="px-4 py-3">{donation.paymentMethod}</td>
                <td className="px-4 py-3 text-xs break-all">
                  {donation.razorpayPaymentId}
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      donation.paymentStatus === "Success"
                        ? "bg-green-100 text-green-700"
                        : donation.paymentStatus === "Failed"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {donation.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {new Date(donation.createdAt).toLocaleDateString("en-GB")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationHistory;
