import React, { useState } from "react";
import "../style/cardStyle.css";
import Modal from "./Modal";

const ProductList = ({ products, addToCart }) => {
  const [filter, setFilter] = useState("");
  const [modalState, setModalState] = useState({
    isOpen: false,
    clickedProduct: null,
  });

  const filteredProducts = filter
    ? products.filter((product) => product.name.includes(filter))
    : products;

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [addedProducts, setAddedProducts] = useState([]);

  const handleAddToCart = (product) => {
    if (!addedProducts.includes(product.id)) {
      addToCart(product);
      setAddedProducts([...addedProducts, product.id]);
    }
  };

  const openModal = (product) => {
    setModalState({
      isOpen: true,
      clickedProduct: product,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      clickedProduct: null,
    });
  };
  return (
    <div>
      <Modal
        onClose={closeModal}
        isOpen={modalState.isOpen}
        data={modalState.clickedProduct}
      />

      <div className="product-list">
        {currentItems.map((product) => (
          <div
            onClick={() => openModal(product)}
            key={product.id}
            className="product-card"
          >
            <div key={product.id} className="singleCard">
              <div className="imgDiv">
                <img src={product.image} alt={product.title} />
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
                <button
                  onClick={() => handleAddToCart(product)}
                  style={{ width: "90%", padding: ".3rem" }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from(
          { length: Math.ceil(filteredProducts.length / itemsPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ProductList;
