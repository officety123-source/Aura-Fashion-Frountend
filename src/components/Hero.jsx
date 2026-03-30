import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

const Hero = () => {
  // 1. Backend se data save karne ke liye state
  const [cmsHeroData, setCmsHeroData] = useState(null);

  // Aapka backend URL direct yahan de raha hoon
  const backendUrl = "https://aura-fashionbackend2-production.up.railway.app";

  // 2. Data Fetch karne ka function
  const fetchHeroData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/hero/get");
      if (response.data.success) {
        setCmsHeroData(response.data.data);
        console.log("Data fetched:", response.data.data); // Console mein check karne ke liye
      }
    } catch (error) {
      console.error("Hero Data Fetch Error:", error);
    }
  };

  // Page load hote hi data mangwao
  useEffect(() => {
    fetchHeroData();
  }, []);

  // 3. Dummy Data (Backup ke liye agar backend off ho)
  const dummyImages = [
    "https://outfitters.com.pk/cdn/shop/files/5_ce52a69c-1d0f-459e-9e89-2364eff1ec4d_1600x.jpg?v=1770637123",
    "https://outfitters.com.pk/cdn/shop/files/1_11a411aa-b007-4fe2-ba27-0949b97cf323_1600x.jpg?v=1770636245",
  ];

  // Logic: Agar backend se images hain toh wo, warna dummy
  const sliderImages =
    cmsHeroData?.images && cmsHeroData.images.length > 0
      ? cmsHeroData.images
      : dummyImages;

  const heroContent = {
    title: cmsHeroData?.title || "PAPER PLANES",
    subtitle: cmsHeroData?.subtitle || "New Summer Collection 2026",
    btnText: cmsHeroData?.btnText || "Shop Now",
  };

  // --- Animation Logic (Same as your original) ---
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const variants = {
    enter: (direction) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setIndex(
      (prevIndex) =>
        (prevIndex + newDirection + sliderImages.length) % sliderImages.length,
    );
  };

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [index, sliderImages.length]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-white"
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          className="absolute inset-0"
        >
          <motion.div
            style={{ y: yImage }}
            className="w-full h-full absolute inset-0"
          >
            <img
              src={sliderImages[index]}
              className="w-full h-full object-cover object-top"
              alt="Hero"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/10"></div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 pointer-events-none">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="pointer-events-auto"
        >
          <h2 className="text-5xl md:text-[120px] font-black tracking-tighter text-white uppercase leading-none drop-shadow-2xl">
            {heroContent.title}
          </h2>
          <p className="text-white text-[10px] md:text-sm tracking-[0.4em] font-medium uppercase mt-6 mb-10">
            {heroContent.subtitle}
          </p>
          <button className="bg-white text-black px-12 py-4 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all">
            {heroContent.btnText}
          </button>
        </motion.div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {sliderImages.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={`h-1 transition-all duration-500 rounded-full ${index === i ? "bg-white w-12" : "bg-white/30 w-4"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
