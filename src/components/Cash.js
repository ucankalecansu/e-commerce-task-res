import React from "react";
import { FaTrash } from "react-icons/fa";

const Cash = ({
  cartItems,
  increaseQuantity,
  decreaseQuantity,
  getTotalPrice,
  removeItem,
}) => {
  return (
    <div>
      <h2>Shopping Cart</h2>
      <div style={{ margin: "0.1rem" }}>
        {cartItems.map((item) => (
          <div
            style={{ borderBottom: "1px solid #ddd", padding: "0.1rem" }}
            key={item.id}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ width: "20%" }}>{item.name}</div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "10%",
                }}
              >
                <button onClick={() => decreaseQuantity(item)}>-</button>
                <span style={{ margin: "0 0.5rem" }}>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item)}>+</button>
              </div>

              <div style={{ maxWidth: "20px", width: "20%" }}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <div style={{ width: "10%" }}>
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
      <div>Total: ${getTotalPrice().toFixed(2)}</div>
    </div>
  );
};

export default Cash;
