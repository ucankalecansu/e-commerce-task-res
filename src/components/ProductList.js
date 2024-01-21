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
              {/* <a
                href={product.liveLink}
                target="_blank"
                rel="noopener noreferrer"
              > */}
              <img src={product.image} alt={product.title} />
              {/* </a> */}
            </div>

            <div className="textContainer">
              <div className="cardTitle">
                <h3>{product.name}</h3>
              </div>
              <div className="price">{product.price}</div>
            </div>
            <div className="desc">
              {product.description.length > 150
                ? `${product.description.slice(0, 150)} ...`
                : product.description}
            </div>

            <div
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <button style={{ width: "90%", padding: ".3rem" }}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
