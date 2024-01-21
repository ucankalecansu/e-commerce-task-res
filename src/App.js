import React, { useEffect, useState } from "react";
import ProductFilter from "./components/ProductFilter";
import ProductList from "./components/ProductList";
import "./App.css";
import cardImg from "./assets/logo192.png";
import axios from "axios";

function App() {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    getProductData();
  }, []);

  const getProductData = () => {
    axios
      .get("https://5fc9346b2af77700165ae514.mockapi.io/products")
      .then((res) => {
        console.log(res, "res");
        setProductData(res.data);
      })
      .catch(() => {});
  };
  return (
    <div className="container">
      <div className="column left">
        <ProductFilter />
      </div>
      <div className="column center">
        <ProductList products={productData} />
      </div>
      <div className="column right">Aysu</div>
    </div>
  );
}

export default App;
