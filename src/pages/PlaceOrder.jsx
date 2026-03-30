import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    cartItems,
    getCartAmount,
    delivery_fee,
    currency,
    backendUrl,
    allProducts,
    setCartItems,
  } = useContext(ShopContext);

  const navigate = useNavigate();
  const [method, setMethod] = useState("cod");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];

      // 🔥 UPDATED LOOP: Color wali loop khatam kar di
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const itemInfo = structuredClone(
              allProducts.find(
                (product) => String(product._id) === String(itemId),
              ),
            );
            if (itemInfo) {
              itemInfo.size = size;
              // Color field nikal di kyunke backend mein nahi hai
              itemInfo.quantity = cartItems[itemId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      if (orderItems.length === 0) {
        return toast.error("Aapka cart khali hai!");
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      if (method === "cod") {
        const response = await axios.post(
          backendUrl + "/api/order/place",
          orderData,
        );

        if (response.data.success) {
          setCartItems({});
          localStorage.removeItem("auraCart");
          toast.success("Order Successfully Placed!");
          navigate("/"); // Order ke baad home ya orders page par bhejein
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.info("Filhal sirf Cash on Delivery available hai.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Order process nahi ho saka. Server check karein.");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="mt-28 px-4 md:px-10 lg:px-20 mb-20 flex flex-col lg:flex-row justify-between gap-10 lg:gap-20"
    >
      {/* --- LEFT SIDE: Delivery Information --- */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-6 bg-black"></div>
          <h2 className="text-xl font-black uppercase tracking-widest">
            Delivery Information
          </h2>
        </div>

        <div className="flex gap-3">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={formData.firstName}
            className="border border-gray-300 rounded py-3 px-4 w-full focus:border-black outline-none text-sm"
            type="text"
            placeholder="First name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={formData.lastName}
            className="border border-gray-300 rounded py-3 px-4 w-full focus:border-black outline-none text-sm"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={formData.email}
          className="border border-gray-300 rounded py-3 px-4 w-full focus:border-black outline-none text-sm"
          type="email"
          placeholder="Email address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={formData.street}
          className="border border-gray-300 rounded py-3 px-4 w-full focus:border-black outline-none text-sm"
          type="text"
          placeholder="Street / House Number"
        />

        <div className="flex gap-3">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={formData.city}
            className="border border-gray-300 rounded py-3 px-4 w-full focus:border-black outline-none text-sm"
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={formData.state}
            className="border border-gray-300 rounded py-3 px-4 w-full focus:border-black outline-none text-sm"
            type="text"
            placeholder="State/Province"
          />
        </div>

        <div className="flex gap-3">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={formData.zipcode}
            className="border border-gray-300 rounded py-3 px-4 w-full focus:border-black outline-none text-sm"
            type="number"
            placeholder="Zipcode"
          />
          <input
            required
            name="phone"
            onChange={onChangeHandler}
            value={formData.phone}
            className="border border-gray-300 rounded py-3 px-4 w-full focus:border-black outline-none text-sm"
            type="number"
            placeholder="Phone Number"
          />
        </div>
      </div>

      {/* --- RIGHT SIDE: Order Summary & Payment --- */}
      <div className="lg:w-[400px] flex flex-col gap-8">
        <div className="bg-gray-50 p-6 rounded-sm">
          <h3 className="text-sm font-black uppercase tracking-widest mb-6 border-b pb-4">
            Order Summary
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Subtotal</p>
              <p className="font-bold">
                {currency} {getCartAmount().toLocaleString()}
              </p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Shipping Fee</p>
              <p className="font-bold">
                {currency} {delivery_fee.toLocaleString()}
              </p>
            </div>
            <div className="flex justify-between text-base border-t pt-4">
              <p className="font-black uppercase">Total Amount</p>
              <p className="font-black">
                {currency} {(getCartAmount() + delivery_fee).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            Select Payment Method
          </h3>
          <div className="flex flex-col gap-3">
            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-3 border p-4 cursor-pointer transition-all ${
                method === "cod" ? "border-black bg-gray-50" : "border-gray-200"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  method === "cod" ? "border-black" : "border-gray-300"
                }`}
              >
                {method === "cod" && (
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                )}
              </div>
              <p className="text-xs font-bold uppercase tracking-widest">
                Cash On Delivery (COD)
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all active:scale-95 shadow-xl shadow-black/10"
        >
          Confirm Order
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
