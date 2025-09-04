import React, { useState } from "react";

const faqData = [
  {
    q: "How do I adopt a pet?",
    a: "Fill out the adoption form and our team will contact you.",
  },
  {
    q: "Are pets vaccinated?",
    a: "Yes, all pets are vaccinated before adoption.",
  },
  {
    q: "Can I volunteer?",
    a: "Absolutely! Join our volunteer program and help pets in need.",
  },
];

function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-12 bg-pink-50 px-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqData.map((item, i) => (
          <div
            key={i}
            className="bg-white shadow rounded-lg p-4 cursor-pointer"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {item.q}
            </h3>
            {open === i && <p className="mt-2 text-gray-600">{item.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;
