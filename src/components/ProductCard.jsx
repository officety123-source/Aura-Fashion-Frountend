import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="group cursor-pointer bg-white border border-gray-50 flex flex-col h-full">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          alt={product.name}
        />
        <div className="absolute bottom-2 right-2 bg-white/80 p-1.5 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
      </div>

      <div className="p-3 md:p-4 flex flex-col flex-grow">
        <h3 className="text-[10px] font-bold uppercase tracking-tight line-clamp-1">
          {product.name}
        </h3>
        <p className="text-[9px] text-gray-400 uppercase mt-0.5">
          {product.fit || "Standard Fit"} | {product.gender || "Unisex"}
        </p>
        <p className="text-[11px] font-black mt-1 text-black">
          PKR {product.price.toLocaleString()}
        </p>

        {/* Safe Colors Mapping */}
        <div className="flex gap-1 mt-2">
          {product?.colors?.map((c, i) => (
            <div
              key={i}
              className="w-3.5 h-3.5 border border-gray-200 rounded-full"
              style={{ backgroundColor: c }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
