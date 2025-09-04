import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
  "https://austinshousenv.org/wp-content/uploads/2018/07/Little-Kids-Group.jpg",
  "https://t3.ftcdn.net/jpg/02/43/53/90/360_F_243539073_ZkIl2iDs017GU1ocTAqq4qADsQrqhWv7.jpg",
  "https://images.unsplash.com/photo-1628676348963-f88c671333f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full h-[400px] relative overflow-hidden">
      {/* Images */}
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="carousel"
            className="w-full flex-shrink-0 object-cover h-[600px]"
          />
        ))}
      </div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        <FaChevronLeft size={20} />
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        <FaChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              currentIndex === i ? "bg-white" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
