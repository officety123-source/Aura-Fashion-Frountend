import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "Rs.";
  const delivery_fee = 200;
  export const backendUrl = "https://aura-fashionbackend2.vercel.app";
  const [token, setToken] = useState("");
  const [allProducts, setAllProducts] = useState([]);

  // --- LOCAL STORAGE REFRESH FIX ---
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("auraCart");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  // Cart save karne ke liye
  useEffect(() => {
    localStorage.setItem("auraCart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Page load hote hi token check karna
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  // --- FETCH PRODUCTS FROM DATABASE ---
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setAllProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Products load nahi ho sakay!");
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  // --- 🔥 UPDATED CART LOGIC (NO COLOR) ---
  const addToCart = (itemId, size) => {
    if (!size) {
      toast.info("Please select size!");
      return;
    }

    let cartData = structuredClone(cartItems);

    // Structure ab aisa hai: cartData[itemId][size]
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1;
    } else {
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
    toast.success("Added to Bag");
  };

  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    if (quantity === 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const size in cartItems[items]) {
        try {
          if (cartItems[items][size] > 0) {
            totalCount += cartItems[items][size];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = allProducts.find((p) => String(p._id) === String(items));
      if (itemInfo) {
        for (const size in cartItems[items]) {
          try {
            if (cartItems[items][size] > 0) {
              totalAmount += itemInfo.price * cartItems[items][size];
            }
          } catch (error) {}
        }
      }
    }
    return totalAmount;
  };

  const value = {
    allProducts,
    currency,
    delivery_fee,
    cartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    backendUrl,
    token,
    setToken,
    setCartItems,
    getProductsData,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
