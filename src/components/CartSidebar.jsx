import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { X, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartSidebar = ({ showCart, setShowCart }) => {
  const { cartItems, allProducts, currency, updateQuantity, getCartAmount } =
    useContext(ShopContext);

  const navigate = useNavigate();

  // --- 🔥 UPDATED LOGIC: Sirf Item aur Size par loop chalegi ---
  const cartData = [];
  for (const items in cartItems) {
    for (const size in cartItems[items]) {
      if (cartItems[items][size] > 0) {
        cartData.push({
          _id: items,
          size: size,
          quantity: cartItems[items][size],
        });
      }
    }
  }

  return (
    <div
      className={`fixed top-0 right-0 bottom-0 bg-white z-[100] transition-all duration-500 border-l ${
        showCart ? "w-full md:w-[400px]" : "w-0 overflow-hidden"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <p className="text-sm font-black uppercase tracking-widest">
            Your Bag ({cartData.length})
          </p>
          <X
            onClick={() => setShowCart(false)}
            className="cursor-pointer w-5 h-5"
          />
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5">
          {cartData.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-50">
              <p className="uppercase text-[10px] font-bold tracking-widest">
                Your bag is empty
              </p>
            </div>
          ) : (
            cartData.map((item, index) => {
              // MongoDB ki _id se match karne ke liye p._id use kiya
              const productInfo = allProducts.find(
                (p) => String(p._id) === String(item._id),
              );

              if (!productInfo) return null;

              return (
                <div
                  key={index}
                  className="flex gap-4 mb-6 border-b pb-6 border-gray-50"
                >
                  <img
                    src={productInfo.image[0]} // Pehli image dikhane ke liye
                    className="w-20 h-24 object-cover bg-gray-100"
                    alt={productInfo.name}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h2 className="text-[11px] font-bold uppercase tracking-tighter">
                        {productInfo.name}
                      </h2>
                      <Trash2
                        onClick={
                          () => updateQuantity(item._id, item.size, 0) // No color here
                        }
                        className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-red-500"
                      />
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold">
                      Size: {item.size}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              item.size,
                              item.quantity - 1,
                            )
                          }
                          className="px-2 py-1 text-xs hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="px-2 text-[11px] font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              item.size,
                              item.quantity + 1,
                            )
                          }
                          className="px-2 py-1 text-xs hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-xs font-bold">
                        {currency}{" "}
                        {(productInfo.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t bg-white">
          <div className="flex justify-between mb-4">
            <p className="text-[10px] font-bold uppercase text-gray-400">
              Subtotal
            </p>
            <p className="text-sm font-black">
              {currency} {getCartAmount().toLocaleString()}
            </p>
          </div>

          <button
            onClick={() => {
              setShowCart(false);
              navigate("/place-order");
            }}
            className="w-full bg-black text-white py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all active:scale-95"
            disabled={cartData.length === 0}
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
