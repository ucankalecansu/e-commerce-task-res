import React, { useState } from "react";
import { AiFillGithub, AiFillYoutube } from "react-icons/ai";
import "./cardStyle.css";

const ProductList = ({ products }) => {
  const [filter, setFilter] = useState("");

  const filteredProducts = filter
    ? products.filter((product) => product.name.includes(filter))
    : products;

  return (
    <div className="product-list">
      {filteredProducts.map((product) => (
        <div key={product.id} className="product-card">
          <div key={product.id} className="singleCard">
            <div className="imgDiv">
              <a
                href={product.liveLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={product.image} alt={product.title} />
              </a>
            </div>

            <div className="cardTitle">
              <h3>{product.title}</h3>
            </div>

            <div className="price">{product.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
