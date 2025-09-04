import React from "react";

const events = [
  { title: "Adoption Camp", date: "Sep 15, 2025", location: "City Park" },
  { title: "Pet Care Workshop", date: "Oct 5, 2025", location: "Community Hall" },
  { title: "Fundraising Event", date: "Nov 20, 2025", location: "Downtown Plaza" },
];

function UpcomingEvents() {
  return (
    <section className="py-12 bg-white px-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Upcoming Events
      </h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {events.map((event, i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-2xl p-6 shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {event.title}
            </h3>
            <p className="text-gray-600">{event.date}</p>
            <p className="text-gray-500">{event.location}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default UpcomingEvents;
