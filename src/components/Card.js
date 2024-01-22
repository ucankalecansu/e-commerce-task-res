import React from "react";
import "../style/Card.css";

const Card = ({ openModal, product, handleAddToCart }) => {
  return (
    <div key={product.id} className="product-card">
      <div key={product.id} className="singleCard">
        <div onClick={() => openModal(product)} className="imgDiv">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="textContainer">
          <div className="cardTitle">
            <h3 className="w90">{product.name}</h3>
          </div>
          <div className="price">{product.price}</div>
        </div>
        <div className="desc">{product.description.length > 150 ? `${product.description.slice(0, 150)} ...` : product.description}</div>

        <div className="btnContainer">
          <button onClick={() => handleAddToCart(product)} className="w90 padding03rem">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
