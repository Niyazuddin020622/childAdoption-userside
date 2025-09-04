import React from "react";
import { motion } from "framer-motion";

const About = () => {
  const steps = [
    { title: "Consultation", description: "We discuss your goals and guide you through the adoption process." },
    { title: "Paperwork & Approval", description: "We assist with legal paperwork and approvals for a smooth process." },
    { title: "Child Matching", description: "We carefully match children with families based on needs and preferences." },
    { title: "Home Integration", description: "Support for both child and family to create a loving environment." },
  ];

  const testimonials = [
    { quote: "We found our daughter through this agency, and the process was smooth and supportive.", author: "John & Mary" },
    { quote: "The team guided us at every step, making our adoption journey worry-free.", author: "Sita & Raj" },
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-6xl grid md:grid-cols-2 gap-10 items-center">

        {/* Left Side Image */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" // smiling child
            alt="Happy child"
            className="rounded-2xl shadow-lg"
          />
        </motion.div>

        {/* Right Side Text */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-gray-800"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Bringing <span className="text-blue-600">Families Together</span>
          </h1>
          <p className="text-lg leading-relaxed mb-6">
            We help children find loving homes and support families in the adoption journey.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Our licensed agency provides guidance, counseling, and post-adoption support to ensure every child thrives in a nurturing environment.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            Start Your Adoption Journey
          </motion.button>
        </motion.div>
      </div>

      {/* Adoption Process Steps */}
      <div className="max-w-6xl mt-16 grid md:grid-cols-4 gap-8 text-center">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="p-6 bg-blue-50 rounded-xl shadow hover:shadow-lg transition-all duration-300"
          >
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-700">{step.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="max-w-4xl mt-20">
        <h2 className="text-3xl font-bold text-center mb-8">What Families Say</h2>
        <div className="space-y-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="p-6 bg-gray-100 rounded-xl shadow"
            >
              <p className="italic text-gray-800">"{t.quote}"</p>
              <p className="mt-2 font-semibold text-gray-700">- {t.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
