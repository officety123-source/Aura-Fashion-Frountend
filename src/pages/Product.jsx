import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Product = ({ setShowCart }) => {
  const { productId } = useParams();
  const { allProducts, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [size, setSize] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const item = allProducts.find((p) => String(p._id) === String(productId));
    if (item) {
      setProductData(item);
      setCurrentIndex(0);
    }
    window.scrollTo(0, 0);
  }, [productId, allProducts]);

  if (!productData) {
    return (
      <div className="mt-40 text-center font-black uppercase tracking-widest text-xs">
        Loading Product...
      </div>
    );
  }

  const productImages = productData.image || [];

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1,
    );
  };

  return (
    <div className="mt-20 md:mt-28 px-0 md:px-10 lg:px-20 bg-white mb-20 overflow-x-hidden">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">
        {/* --- LEFT: Image Section --- */}
        <div className="w-full lg:w-[60%]">
          <div className="relative md:hidden w-full aspect-[3/4] bg-gray-100 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={productImages[currentIndex]}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover object-top"
              />
            </AnimatePresence>
            {productImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          <div className="hidden md:grid grid-cols-2 gap-2">
            {productImages.map((img, index) => (
              <div
                key={index}
                className="w-full aspect-[3/4] bg-gray-100 overflow-hidden"
              >
                <img
                  src={img}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  alt={productData.name}
                />
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT: Product Details --- */}
        <div className="w-full lg:w-[40%] px-4 md:px-0 lg:sticky lg:top-32 h-fit">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-black uppercase tracking-tighter text-black leading-tight">
              {productData.name}
            </h1>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">
              {productData.category} | {productData.fit || "PREMIUM FIT"}
            </p>
          </div>

          <div className="mt-5 flex items-center gap-4">
            <span className="text-xl font-black">
              {currency} {productData.price.toLocaleString()}
            </span>
          </div>

          {/* Sizes Section */}
          <div className="mt-8">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4">
              Select Size
            </p>
            <div className="flex gap-6">
              {productData.sizes?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`text-[14px] font-black transition-all ${size === item ? "text-black border-b-2 border-black" : "text-gray-300 hover:text-gray-500"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => {
              if (size) {
                // Color condition hata di hai, bss ab Size lazmi hai
                addToCart(productData._id, size);
                setShowCart(true);
              } else {
                alert("Please select size");
              }
            }}
            className="w-full mt-10 bg-black text-white h-14 flex items-center justify-between px-8 active:scale-95 transition-all"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.3em]">
              Add To Bag
            </span>
            <ShoppingBag size={20} />
          </button>

          <div className="mt-10 pt-10 border-t border-gray-100">
            <p className="text-[11px] text-gray-500 leading-relaxed uppercase font-medium">
              {productData.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
