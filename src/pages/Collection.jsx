import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { allProducts, search, showSearch } = useContext(ShopContext);

  const [filterProducts, setFilterProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [sortType, setSortType] = useState("relavent");
  const location = useLocation();

  // FIX: Accessories hata kar Trousers add kar diya
  const categories = [
    "ALL",
    "T-SHIRTS",
    "SHIRTS",
    "DENIM",
    "POLOS",
    "SHORTS",
    "TROUSERS",
    "ACTIVEWEAR",
    "JACKETS",
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryQuery = params.get("category");
    if (categoryQuery) {
      setActiveCategory(categoryQuery.toUpperCase());
    } else {
      setActiveCategory("ALL");
    }
  }, [location.search]);

  const applyFilter = () => {
    let tempProducts = [...allProducts];

    if (showSearch && search) {
      tempProducts = tempProducts.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // --- SMART CATEGORY FILTER (DENIM FIX) ---
    if (activeCategory !== "ALL") {
      tempProducts = tempProducts.filter((item) => {
        if (!item.category) return false;

        // Normalizing: Sab spaces aur '-' khatam karke check karega
        // Taake "Denim" aur "Denims" dono match ho jayein
        const dbCat = item.category.replace(/[-\s]/g, "").toUpperCase();
        const activeCat = activeCategory.replace(/[-\s]/g, "").toUpperCase();

        // Specific Check for Denim: Agar user "DENIM" click kare aur DB mein "DENIMS" ho
        if (activeCat === "DENIM" && dbCat.includes("DENIM")) return true;
        if (activeCat === "TROUSERS" && dbCat.includes("TROUSER")) return true;

        return dbCat === activeCat;
      });
    }

    // Sorting
    if (sortType === "low-high") {
      tempProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      tempProducts.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(tempProducts);
  };

  useEffect(() => {
    applyFilter();
  }, [activeCategory, sortType, allProducts, search, showSearch]);

  return (
    <div className="bg-white min-h-screen pt-24 pb-10 px-4 md:px-10">
      <div className="flex flex-col mb-10">
        {/* Category Tabs */}
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar border-b border-gray-100 pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[11px] font-black tracking-widest uppercase transition-all relative pb-2 whitespace-nowrap ${
                activeCategory === cat
                  ? "text-black"
                  : "text-gray-300 hover:text-black"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black"></div>
              )}
            </button>
          ))}
        </div>

        {/* Stats & Sort */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-[10px] font-black text-black uppercase tracking-widest">
            {activeCategory} / {filterProducts.length} ITEMS
          </p>
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="text-[10px] font-black uppercase tracking-widest outline-none bg-transparent cursor-pointer border border-gray-200 px-2 py-1 rounded"
          >
            <option value="relavent">Sort By: Relevant</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-2 gap-y-12">
        {filterProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image[0]}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>

      {/* Empty State */}
      {filterProducts.length === 0 && (
        <div className="text-center py-40 border border-dashed border-gray-100 rounded-lg">
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
            No products found in "{activeCategory}".
          </p>
          <button
            onClick={() => setActiveCategory("ALL")}
            className="mt-4 text-[10px] font-black underline uppercase tracking-widest text-black"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Collection;
