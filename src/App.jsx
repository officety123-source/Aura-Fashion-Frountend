import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import CartSidebar from "./components/CartSidebar";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Product from "./pages/Product";
import PlaceOrder from "./pages/PlaceOrder";

function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col relative">
        {/* 🔥 ToastContainer hamesha return ke andar hona chahiye */}
        <ToastContainer position="bottom-right" autoClose={3000} />

        <NavBar setShowCart={setShowCart} />
        <CartSidebar showCart={showCart} setShowCart={setShowCart} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route
              path="/product/:productId"
              element={<Product setShowCart={setShowCart} />}
            />
            <Route path="/place-order" element={<PlaceOrder />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
