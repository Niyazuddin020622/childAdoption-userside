import React, { useEffect, useState } from "react";
import axios from "axios";

function ContactHistory() {
  const [contacts, setContacts] = useState([]);
const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user?.email;

    if (!userEmail) return;

    axios
      .get(`${API_URL}/api/user/fetch`)
      .then((response) => {
        const userMessages = response.data.filter(
          (contact) => contact.email === userEmail
        );
        setContacts(userMessages);
      })
      .catch((error) =>
        console.error("Error fetching contact history:", error)
      );
  }, []);

  const getReplyStatus = (reply) => {
    if (!reply)
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
          Pending
        </span>
      );
    if (reply.trim().toLowerCase() === "ignore") {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
          Ignored
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
        Replied
      </span>
    );
  };

  const getReplyText = (reply) => {
    if (!reply) return <span className="text-gray-500 italic">No reply yet</span>;
    if (reply.trim().toLowerCase() === "ignore") {
      return <span className="text-red-600 font-medium">Ignored Message</span>;
    }
    return <span className="text-green-600">{reply}</span>;
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Contact History
      </h2>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left border border-gray-200 text-gray-700">
          <thead className="bg-indigo-600 text-white text-center">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Your Message</th>
              <th className="px-4 py-3">Admin's Reply</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((contact, index) => (
                <tr
                  key={contact._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 text-center">{index + 1}</td>
                  <td className="px-4 py-3 font-medium">{contact.name}</td>
                  <td className="px-4 py-3 text-indigo-600">{contact.message}</td>
                  <td className="px-4 py-3">{getReplyText(contact.adminReply)}</td>
                  <td className="px-4 py-3 text-center">{getReplyStatus(contact.adminReply)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-6 text-center text-gray-500 italic"
                >
                  No contact history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContactHistory;
