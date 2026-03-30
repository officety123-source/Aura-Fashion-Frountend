import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { ShopContext } from "../context/ShopContext";

const NavBar = ({ setShowCart }) => {
  const [sideMenu, setSideMenu] = useState(false);
  const [isTransparent, setIsTransparent] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const { getCartCount } = useContext(ShopContext);

  const categories = [
    "VIEW ALL",
    "T-SHIRTS",
    "POLOS",
    "SHIRTS",
    "ACTIVEWEAR",
    "DENIM",
    "TROUSERS",
    "SHORTS",
    "JEANS",
  ];

  // Navbar transparency effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsTransparent(false);
      } else {
        setIsTransparent(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCategoryClick = (item) => {
    setSideMenu(false);
    const categoryPath = item === "VIEW ALL" ? "ALL" : item;
    navigate(`/collection?category=${categoryPath}`);
  };

  // Dynamic Styles
  const isHome = location.pathname === "/";
  const navBg =
    isTransparent && isHome
      ? "bg-transparent text-white"
      : "bg-white text-black shadow-sm border-b border-gray-100";

  const iconColor = isTransparent && isHome ? "text-white" : "text-black";
  const badgeBg =
    isTransparent && isHome ? "bg-white text-black" : "bg-black text-white";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 h-16 md:h-20 flex items-center justify-between px-6 ${navBg}`}
      >
        {/* Left Section: Menu & Logo */}
        <div className="flex items-center gap-4">
          <Menu
            className={`w-6 h-6 cursor-pointer hover:scale-110 transition-transform ${iconColor}`}
            onClick={() => setSideMenu(true)}
          />
          <Link to="/">
            <h1 className="text-xl md:text-2xl font-black tracking-tighter uppercase italic">
              Aura Fashion
            </h1>
          </Link>
        </div>

        {/* Right Section: Icons */}
        <div className={`flex items-center gap-5 ${iconColor}`}>
          <Search className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />

          <div className="hidden md:block group relative">
            <User className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
            {/* Dropdown for Login/Profile (Optional) */}
            <div className="hidden group-hover:block absolute top-5 right-0 pt-4">
              <div className="bg-white text-black text-[10px] font-bold py-3 px-5 w-32 shadow-lg flex flex-col gap-2 uppercase tracking-widest border border-gray-50">
                <p className="cursor-pointer hover:text-gray-400">My Profile</p>
                <p className="cursor-pointer hover:text-gray-400">Orders</p>
                <p className="cursor-pointer hover:text-gray-400">Logout</p>
              </div>
            </div>
          </div>

          {/* Cart Icon Logic */}
          <div
            onClick={() => setShowCart(true)}
            className="relative cursor-pointer group"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span
              className={`absolute -top-1 -right-1 text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black ${badgeBg}`}
            >
              {getCartCount()}
            </span>
          </div>
        </div>
      </nav>

      {/* --- SIDEBAR MENU --- */}
      <div
        className={`fixed top-0 left-0 h-full bg-white text-black z-[150] transition-all duration-500 shadow-2xl ${sideMenu ? "w-[300px] sm:w-[400px]" : "w-0 overflow-hidden"}`}
      >
        <div className="p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-12">
            <X
              className="w-6 h-6 cursor-pointer hover:rotate-90 transition-transform"
              onClick={() => setSideMenu(false)}
            />
            <h2 className="text-sm font-black tracking-widest uppercase">
              Navigation
            </h2>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex gap-8 border-b border-gray-100 pb-5">
              <span className="text-[11px] font-black border-b-2 border-black pb-1 cursor-pointer tracking-[0.2em] uppercase">
                Men
              </span>
              <span className="text-[11px] font-bold text-gray-300 cursor-not-allowed tracking-[0.2em] uppercase">
                Women Coming Soon
              </span>
            </div>

            <div className="flex flex-col gap-5 overflow-y-auto no-scrollbar pb-10">
              <p className="text-[9px] font-bold text-gray-400 tracking-[0.3em] uppercase mb-2">
                Categories
              </p>
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => handleCategoryClick(item)}
                  className="text-[11px] font-bold hover:pl-3 hover:text-gray-500 transition-all uppercase tracking-[0.2em] text-black text-left"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop with Blur */}
      {sideMenu && (
        <div
          className="fixed inset-0 bg-black/40 z-[140] backdrop-blur-sm transition-opacity duration-500"
          onClick={() => setSideMenu(false)}
        ></div>
      )}
    </>
  );
};

export default NavBar;
