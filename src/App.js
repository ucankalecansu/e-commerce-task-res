import React, { useEffect, useState, useMemo } from "react";
import ProductFilter from "./components/ProductFilter";
import ProductList from "./components/ProductList";
import "./App.css";
import axios from "axios";

function App() {
  const [productData, setProductData] = useState([]);
  const [brandsData, setBrandsData] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSortKey, setSelectedSortKey] = useState(null);

  const filteredData = useMemo(() => {
    let sortedData;
    if (selectedSortKey === "newToOld" || selectedSortKey === "oldToNew") {
      //Tarihe göre Sıralama
      sortedData = productData.slice().sort((a, b) => {
        if (selectedSortKey === "newToOld") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        } else {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
      });
    } else if (selectedSortKey === "priceHightToLow") {
      //Ücrete göre Sıralama
      sortedData = productData.slice().sort((a, b) => b.price - a.price);
    } else if (selectedSortKey === "priceLowToHigh") {
      sortedData = productData.slice().sort((a, b) => a.price - b.price);
    } else {
      sortedData = productData.slice();
    }
    //Model Filter
    let filteredByBrand =
      selectedBrands.length > 0
        ? sortedData.filter((item) => selectedBrands.includes(item.brand))
        : sortedData;

    //Orjinal dataya geri dönüş
    return selectedBrands.length > 0 ? filteredByBrand : sortedData;
  }, [selectedBrands, productData, selectedSortKey]);

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
        const uniqueBrandsArray = brandArray.filter(
          (brand, index, array) => array.indexOf(brand) === index
        );
        setBrandsData(uniqueBrandsArray);
      })
      .catch(() => {});
  };

  return (
    <div className="container">
      <div className="column left">
        <ProductFilter
          brandsData={brandsData}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          selectedSortKey={selectedSortKey}
          setSelectedSortKey={setSelectedSortKey}
        />
      </div>
      <div className="column center">
        <ProductList products={displayedData} />
      </div>
      <div className="column right">Aysu</div>
    </div>
  );
}

export default App;
