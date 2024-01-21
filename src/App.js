import React from "react";
import ProductFilter from "./components/ProductFilter";
import ProductList from "./components/ProductList";
import "./App.css";
import cardImg from "./assets/logo192.png";

function App() {
  return (
    <div className="container">
      <div className="column left">
        <ProductFilter />
      </div>
      <div className="column center">
        <ProductList
          products={[
            { id: 1, title: "Ürün 1", price: 50, image: cardImg },
            { id: 2, title: "Ürün 2", price: 30, image: cardImg },
            { id: 3, title: "Ürün 3", price: 70, image: cardImg },
            { id: 4, title: "Ürün 4", price: 45, image: cardImg },
            { id: 5, title: "Ürün 5", price: 50, image: cardImg },
            { id: 6, title: "Ürün 6", price: 30, image: cardImg },
            { id: 7, title: "Ürün 7", price: 70, image: cardImg },
            { id: 8, title: "Ürün 8", price: 45, image: cardImg },
            // ... Diğer ürünler
          ]}
        />
      </div>
      <div className="column right">Aysu</div>
    </div>
  );
}

export default App;
