import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

// Example children data (you can replace with API later)
const children = [
  {
    id: 1,
    name: "Aarav",
    age: 6,
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Meera",
    age: 5,
    image:
      "https://images.unsplash.com/photo-1627063002374-8e77958d4b99?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Rohan",
    age: 7,
    image:
      "https://images.unsplash.com/photo-1618213837799-f8c3a3f6f6c1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Sia",
    age: 4,
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Kabir",
    age: 8,
    image:
      "https://images.unsplash.com/photo-1597437579356-7b3f21eeb1c9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Anaya",
    age: 6,
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Vihaan",
    age: 5,
    image:
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "Ishita",
    age: 7,
    image:
      "https://images.unsplash.com/photo-1607746882042-5e67e3e6e3b7?auto=format&fit=crop&w=800&q=80",
  },
];

// Animation Variants
const cardVariants = [
  { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }, // fade up
  { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }, // zoom
  { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } }, // slide left
  { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } }, // slide right
];

const Gallery = () => {
  return (
    <section className="py-16 px-6 lg:px-16 bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-gray-800"
        >
          Meet the Children 💖
        </motion.h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Every child deserves love, care, and a family. Explore these profiles
          and take the step towards giving them a brighter future.
        </p>
      </div>

      {/* Grid Gallery */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {children.map((child, index) => {
          const variant = cardVariants[index % cardVariants.length]; // rotate animations

          return (
            <motion.div
              key={child.id}
              variants={variant}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              <img
                src={child.image}
                alt={child.name}
                className="w-full h-72 object-cover transform group-hover:scale-110 transition duration-500"
              />

              {/* Overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-5 opacity-90 group-hover:opacity-100 transition duration-500">
                <h3 className="text-white text-2xl font-bold drop-shadow">
                  {child.name}
                </h3>
                <p className="text-gray-200">Age: {child.age}</p>
                <button className="mt-3 flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full shadow-lg transition">
                  <Heart size={18} />
                  Adopt Me
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Gallery;
