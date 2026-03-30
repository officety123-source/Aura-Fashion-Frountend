import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const ProductItem = ({ id, image, name, price }) => {
  const { currency, addToCart, setShowCart } = useContext(ShopContext);

  // Click Handler function
  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Link ke click ko rokne ke liye

    console.log("!!! CLICK DETECTED !!!"); // Agar ye console mein aaye to click working hai
    console.log("Product ID being added:", id);

    if (id) {
      addToCart(id, "M"); // Default Size 'M'
      if (setShowCart) {
        setShowCart(true); // Sidebar kholne ke liye
      }
    } else {
      console.log("Error: ID missing in ProductItem");
    }
  };

  return (
    <div className="group relative border border-transparent hover:border-gray-100 transition-all p-2">
      {/* Image and Link Section */}
      <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
        <div className="relative overflow-hidden bg-[#f9f9f9] aspect-[3/4]">
          <img
            className="hover:scale-105 transition-transform duration-700 w-full h-full object-cover"
            src={image}
            alt={name}
          />

          {/* Plus Icon Button - Fixed Version */}
          <button
            type="button"
            onClick={handleButtonClick}
            className="absolute bottom-3 right-3 bg-black text-white p-2.5 rounded-full shadow-2xl z-[50] active:scale-90 transition-transform cursor-pointer"
            style={{ pointerEvents: "auto" }}
          >
            <Plus size={18} strokeWidth={3} />
          </button>
        </div>

        <div className="pt-4">
          <h3 className="text-[10px] font-black uppercase tracking-tight truncate">
            {name}
          </h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
            Men | Regular Fit
          </p>
          <p className="text-[12px] font-black mt-1 tracking-tighter">
            {currency} {price.toLocaleString()}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
