import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import CategoryCard from "../components/CategoryCard";
import ProductItem from "../components/ProductItem";
import { ShopContext } from "../context/ShopContext";

const Home = () => {
  // backendUrl ko context se nikala taake Hero slider connect ho sake
  const { allProducts, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("T-SHIRTS");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);

  const categories = [
    {
      title: "Trousers",
      image:
        "https://outfitters.com.pk/cdn/shop/files/F0536108901_1.jpg?v=1753097681",
      search: "Trousers",
    },
    {
      title: "Polos",
      image:
        "https://outfitters.com.pk/cdn/shop/files/F1774106706..jpg?v=1773634495",
      search: "Polos",
    },
    {
      title: "Shirts",
      image:
        "https://outfitters.com.pk/cdn/shop/files/F1042103618._8daaf363-c6fb-45ea-bb71-8fbf96aaad9e.jpg?v=1769425850",
      search: "Shirts",
    },
    {
      title: "Denims",
      image:
        "https://outfitters.com.pk/cdn/shop/files/F0642109901LOWER._163f0fd3-0b00-46f3-b77e-10b2c7c45d65.jpg?v=1773723153",
      search: "Denim",
    },
    {
      title: "T Shirts",
      image:
        "https://outfitters.com.pk/cdn/shop/files/F1734106002._3779b56d-5466-4847-a7a5-fe311445c5b8.jpg?v=1772599187",
      search: "T-shirts",
    },
    {
      title: "Shorts",
      image:
        "https://outfitters.com.pk/cdn/shop/files/F0166110901_2_b3e7ccdd-36bf-4dca-99b8-0108df7072c4.jpg?v=1773811214",
      search: "Shorts",
    },
  ];

  const tabs = ["T-SHIRTS", "SHIRTS", "ACTIVEWEAR", "SHORTS", "DENIM"];

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      // 1. Filter Best Sellers
      const best = allProducts.filter((item) => item.bestseller === true);
      setBestSellers(best.slice(0, 4));

      // 2. Filter Tabbed Products (Slightly improved logic for matching)
      const filtered = allProducts.filter(
        (item) =>
          item.category.toUpperCase() === activeTab.replace("-", "") ||
          item.category.toUpperCase() === activeTab,
      );
      setFilteredProducts(filtered.slice(0, 10));
    }
  }, [activeTab, allProducts]);

  return (
    <div className="bg-white overflow-x-hidden">
      {/* 🔥 Backend URL pass kiya taake slider ka data fetch ho sake */}
      <Hero backendUrl={backendUrl} />

      {/* SECTION 1: Categories */}
      <section className="w-full py-6 md:py-10 border-b border-gray-100">
        <div className="flex overflow-x-auto gap-3 md:gap-4 px-4 md:px-8 pb-4 no-scrollbar scroll-smooth">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => navigate(`/collection?category=${cat.search}`)}
              className="min-w-[150px] md:min-w-[200px] cursor-pointer"
            >
              <CategoryCard title={cat.title} image={cat.image} />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: Best Sellers */}
      <section className="w-full flex flex-col md:flex-row border-b border-gray-100">
        <div className="w-full md:w-[32%] lg:w-[30%] h-[50vh] md:h-auto overflow-hidden relative group">
          <img
            src="https://outfitters.com.pk/cdn/shop/files/tee_and_polos.jpg?v=1770208458&width=360"
            className="w-full h-full object-cover object-top"
            alt="Banner"
          />
          <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-8">
            <h2 className="text-white text-2xl font-black uppercase tracking-tighter">
              Best Sellers
            </h2>
          </div>
        </div>
        <div className="w-full md:w-[68%] lg:w-[70%] flex flex-col bg-white">
          <div className="flex-1 overflow-x-auto no-scrollbar p-2 md:p-6">
            <div className="flex flex-nowrap gap-2">
              {bestSellers.map((item) => (
                <div
                  key={item._id}
                  className="w-[46%] md:w-[30%] flex-shrink-0"
                >
                  <ProductItem
                    id={item._id}
                    name={item.name}
                    image={item.image[0]}
                    price={item.price}
                  />
                </div>
              ))}
              {bestSellers.length === 0 && (
                <p className="text-[10px] uppercase font-bold p-10 text-gray-400 italic">
                  No Bestsellers Found
                </p>
              )}
            </div>
          </div>
          <div className="px-6 py-8 md:px-12 md:py-14 border-t border-gray-50">
            <h2 className="text-[15px] font-black tracking-widest uppercase mb-4">
              Trending Now
            </h2>
            <button
              onClick={() => navigate("/collection")}
              className="bg-black text-white px-10 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-zinc-900 transition-all active:scale-95"
            >
              Explore Collection
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3: Tabbed Section */}
      <section className="w-full py-12 md:py-20 px-4 md:px-12">
        <div className="flex overflow-x-auto no-scrollbar gap-8 border-b border-gray-100 pb-4 mb-10 whitespace-nowrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[11px] font-black uppercase tracking-[0.15em] transition-all relative pb-4 -mb-[18px] ${
                activeTab === tab
                  ? "text-black border-b-2 border-black"
                  : "text-gray-300 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
          {filteredProducts.map((product) => (
            <ProductItem
              key={product._id}
              id={product._id}
              name={product.name}
              image={product.image[0]}
              price={product.price}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center text-[10px] font-bold text-gray-400 uppercase py-20">
            No products found in {activeTab}.
          </p>
        )}
      </section>
    </div>
  );
};

export default Home;
