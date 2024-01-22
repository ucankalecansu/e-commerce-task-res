import React from "react";
import { FaTrash } from "react-icons/fa";
import "../style/Cash.css";

const Basket = ({ cartItems, increaseQuantity, decreaseQuantity, getTotalPrice, removeItem }) => {
  return (
    <>
      <div className="cashCard margin1rem">
        {cartItems.map((item) => (
          <div key={item.id}>
            <div className="cashContainer">
              <div className="w20">{item.name}</div>
              <div className="counter w20">
                <button onClick={() => decreaseQuantity(item)}>-</button>
                <span className="margin05rem">{item.quantity}</span>
                <button onClick={() => increaseQuantity(item)}>+</button>
              </div>

              <div className="w20">₺{(item.price * item.quantity).toFixed(2)}</div>
              <div className="w10">
                {item.quantity === 1 && (
                  <button onClick={() => removeItem(item)}>
                    <FaTrash />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cashCard row margin1rem">
        <div className="totalPriceTitle">
          <text>Total Price:</text>
        </div>
        <div className="totalPrice">
          <div>₺{getTotalPrice().toFixed(2)}</div>
        </div>
      </div>
    </>
  );
};

export default Basket;
