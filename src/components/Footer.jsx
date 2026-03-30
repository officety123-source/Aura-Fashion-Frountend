import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/collection?category=${category}`);
  };

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Section 1: Brand Info */}
        <div className="flex flex-col gap-5">
          <h1 className="text-xl font-black uppercase tracking-tighter italic">
            Aura Fashion
          </h1>
          <p className="text-[11px] text-gray-400 leading-relaxed tracking-wider uppercase">
            Elevating everyday essentials with premium fabrics and minimalist
            design. Proudly crafted for the modern man.
          </p>
          <div className="flex gap-4 mt-2">
            <Instagram className="w-4 h-4 cursor-pointer hover:text-gray-400 transition-all" />
            <Facebook className="w-4 h-4 cursor-pointer hover:text-gray-400 transition-all" />
            <Twitter className="w-4 h-4 cursor-pointer hover:text-gray-400 transition-all" />
          </div>
        </div>

        {/* Section 2: Quick Links */}
        <div className="flex flex-col gap-5">
          <h3 className="text-[12px] font-black uppercase tracking-[0.2em]">
            Shop
          </h3>
          <ul className="flex flex-col gap-3 text-[10px] font-bold text-gray-400 tracking-widest uppercase">
            <li
              onClick={() => handleCategoryClick("T-shirts")}
              className="hover:text-black transition-all cursor-pointer"
            >
              T-Shirts
            </li>
            <li
              onClick={() => handleCategoryClick("Denim")}
              className="hover:text-black transition-all cursor-pointer"
            >
              Denim
            </li>
            <li
              onClick={() => handleCategoryClick("Polos")}
              className="hover:text-black transition-all cursor-pointer"
            >
              Polos
            </li>
            <li
              onClick={() => handleCategoryClick("Accessories")}
              className="hover:text-black transition-all cursor-pointer"
            >
              Accessories
            </li>
          </ul>
        </div>

        {/* Section 3: Policies */}
        <div className="flex flex-col gap-5">
          <h3 className="text-[12px] font-black uppercase tracking-[0.2em]">
            Customer Care
          </h3>
          <ul className="flex flex-col gap-3 text-[10px] font-bold text-gray-400 tracking-widest uppercase">
            <li className="hover:text-black transition-all cursor-pointer">
              Track Your Order
            </li>
            <li className="hover:text-black transition-all cursor-pointer">
              Shipping Policy
            </li>
            <li className="hover:text-black transition-all cursor-pointer">
              Returns & Exchange
            </li>
            <li className="hover:text-black transition-all cursor-pointer">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Section 4: Contact & Newsletter */}
        <div className="flex flex-col gap-5">
          <h3 className="text-[12px] font-black uppercase tracking-[0.2em]">
            Get In Touch
          </h3>
          <div className="flex flex-col gap-3 text-[10px] font-bold text-gray-400 tracking-widest uppercase leading-loose">
            <p className="flex items-center gap-2">
              <MapPin className="w-3 h-3" /> Karachi, Pakistan
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-3 h-3" /> +92 300 1234567
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3 h-3" /> support@aurafashion.pk
            </p>
          </div>

          <div className="mt-4 border-b border-gray-300 pb-1 flex justify-between items-center">
            <input
              type="email"
              placeholder="YOUR EMAIL"
              className="bg-transparent text-[10px] outline-none w-full font-bold"
            />
            <button className="text-[10px] font-black uppercase tracking-widest hover:opacity-50 transition-opacity">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
          © 2026 Aura Fashion. All Rights Reserved.
        </p>
        <div className="flex gap-6 opacity-40 grayscale h-4">
          <span className="text-[9px] font-bold">VISA</span>
          <span className="text-[9px] font-bold">MASTERCARD</span>
          <span className="text-[9px] font-bold">CASH ON DELIVERY</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
