import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ShopContextProvider from "./context/ShopContext"; // ShopContext import karein

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* ShopContextProvider pure App ko data provide karega */}
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </StrictMode>,
);
