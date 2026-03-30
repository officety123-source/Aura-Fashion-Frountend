// src/components/CategoryCard.jsx
import React from "react";
import { motion } from "framer-motion";

const CategoryCard = ({ image, title }) => {
  return (
    <div className="relative overflow-hidden cursor-pointer group aspect-[3/4] bg-gray-100 shadow-sm">
      {/* Zoom Effect on Hover */}
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Title Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/0 transition-all duration-500">
        <h3 className="text-white text-sm md:text-lg font-black tracking-[0.3em] uppercase drop-shadow-lg pointer-events-none">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default CategoryCard;
