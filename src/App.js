import React, { useEffect, useState, useMemo } from "react";
import ProductFilter from "./components/ProductFilter";
import ProductList from "./components/ProductList";
import "./App.css";
import axios from "axios";
import Basket from "./components/Basket";
import Header from "./components/Header";

function App() {
  const [productData, setProductData] = useState([]);
  const [brandsData, setBrandsData] = useState([]);
  const [modelsData, setModelsData] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [selectedSortKey, setSelectedSortKey] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const filteredData = useMemo(() => {
    let sortedData;
    if (selectedSortKey === "newToOld" || selectedSortKey === "oldToNew") {
      // date
      sortedData = productData.slice().sort((a, b) => {
        if (selectedSortKey === "newToOld") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        } else {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
      });
      // price
    } else if (selectedSortKey === "priceHightToLow") {
      sortedData = productData.slice().sort((a, b) => b.price - a.price);
    } else if (selectedSortKey === "priceLowToHigh") {
      sortedData = productData.slice().sort((a, b) => a.price - b.price);
    } else {
      // orjinal
      sortedData = productData.slice();
    }
    // brand filter
    let filteredByBrand = selectedBrands.length > 0 ? sortedData.filter((item) => selectedBrands.includes(item.brand)) : sortedData;

    // model filter
    let filteredByModel = selectedModels.length > 0 ? filteredByBrand.filter((item) => selectedModels.includes(item.model)) : filteredByBrand;

    return selectedModels.length > 0 ? filteredByModel : filteredByBrand;
  }, [selectedBrands, selectedModels, productData, selectedSortKey]);

  useEffect(() => {
    setDisplayedData(filteredData);
  }, [filteredData]);
  const [displayedData, setDisplayedData] = useState(filteredData);

  useEffect(() => {
    getProductData();
  }, []);

  const getProductData = () => {
    axios
      .get("https://5fc9346b2af77700165ae514.mockapi.io/products")
      .then((res) => {
        setProductData(res.data);
        const brandArray = res.data.map((i) => i.brand);
        const uniqueBrandsArray = brandArray.filter((brand, index, array) => array.indexOf(brand) === index);
        setBrandsData(uniqueBrandsArray);

        const modelArray = res.data.map((i) => i.model);
        const uniqueModelsArray = modelArray.filter((brand, index, array) => array.indexOf(brand) === index);
        setModelsData(uniqueModelsArray);
      })
      .catch(() => {});
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      setCartItems(cartItems.map((item) => (item.id === existingItem.id ? { ...item, quantity: item.quantity + 1 } : item)));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const increaseQuantity = (item) => {
    setCartItems(cartItems.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)));
  };

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      setCartItems(cartItems.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)));
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const removeItem = (item) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(updatedCart);
  };

  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);
    const filteredData = productData.filter((product) => product.name.toLowerCase().includes(inputValue.toLowerCase()));
    setDisplayedData(filteredData);
  };

  return (
    <>
      <Header totalPrice={getTotalPrice().toFixed(2)} searchInput={searchInput} handleSearchInputChange={handleSearchInputChange} />
      <div className="container">
        <div className="column left">
          <ProductFilter
            brandsData={brandsData}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            selectedSortKey={selectedSortKey}
            setSelectedSortKey={setSelectedSortKey}
            modelsData={modelsData}
            selectedModels={selectedModels}
            setSelectedModels={setSelectedModels}
          />
        </div>
        <div className="column center">
          <ProductList products={displayedData} addToCart={addToCart} />
        </div>
        <div className="column right">
          <Basket cartItems={cartItems} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} getTotalPrice={getTotalPrice} removeItem={removeItem} />
        </div>
      </div>
    </>
  );
}

export default App;
