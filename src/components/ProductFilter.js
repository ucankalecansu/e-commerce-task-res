import React, { useEffect, useState } from "react";
import "../style/productFilter.css";

const sortData = [
  { id: 1, key: "oldToNew", title: "Old to new" },
  { id: 2, key: "newToOld", title: "New to old" },
  { id: 2, key: "priceHightToLow", title: "Price hight to low" },
  { id: 2, key: "priceLowToHigh", title: "Price low to high" },
];

const ProductFilter = ({
  brandsData,
  selectedBrands,
  setSelectedBrands,
  selectedSortKey,
  setSelectedSortKey,
  modelsData,
  selectedModels,
  setSelectedModels,
}) => {
  const [searchModelInput, setSearchModelInput] = useState("");
  const [filteredModels, setFilteredModels] = useState(modelsData);

  const [searchBrandInput, setSearchBrandInput] = useState("");
  const [filteredBrands, setFilteredBrands] = useState(brandsData);

  const handleSearchBrandInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchBrandInput(inputValue);

    if (inputValue.length >= 3) {
      const filteredData = brandsData.filter((brand) =>
        brand.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredBrands(filteredData);
    } else {
      setFilteredBrands(brandsData);
    }
  };

  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchModelInput(inputValue);
    if (inputValue.length >= 3) {
      const filteredData = modelsData.filter((model) =>
        model.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredModels(filteredData);
    } else {
      setFilteredModels(modelsData);
    }
  };

  useEffect(() => {
    if (searchModelInput === "") {
      setFilteredModels(modelsData);
    }
    if (searchBrandInput === "") {
      setFilteredBrands(brandsData);
    }
  }, [searchModelInput, modelsData, searchBrandInput, brandsData]);

  const handleBrandToggle = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(
        selectedBrands.filter((selectedBrand) => selectedBrand !== brand)
      );
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handleModelToggle = (model) => {
    if (selectedModels.includes(model)) {
      setSelectedModels(
        selectedModels.filter((selectedModel) => selectedModel !== model)
      );
    } else {
      setSelectedModels([...selectedModels, model]);
    }
  };

  const handleSortToggle = (sort) => {
    setSelectedSortKey(sort.key === selectedSortKey ? null : sort.key);
  };
  return (
    <div className="sidebar">
      <div>
        <div>Sort By</div>
        <div className="card">
          {sortData.map((sort) => (
            <div key={sort} className="brand-card">
              <label>
                <input
                  type="checkbox"
                  checked={sort.key === selectedSortKey}
                  onChange={() => handleSortToggle(sort)}
                />
                {sort.title}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div>Brands</div>
        <div className="card">
          <div class="search">
            <input
              className="searchInput"
              type="text"
              placeholder="Ara..."
              value={searchBrandInput}
              onChange={handleSearchBrandInputChange}
            />
          </div>
          {filteredBrands.map((brand) => (
            <div key={brand} className="brand-card">
              <label>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandToggle(brand)}
                />
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div>Models</div>
        <div className="card">
          <div class="search">
            <input
              className="searchInput"
              type="text"
              placeholder="Ara..."
              value={searchModelInput}
              onChange={handleSearchInputChange}
            />
          </div>
          {filteredModels.map((model) => (
            <div key={model} className="brand-card">
              <label>
                <input
                  type="checkbox"
                  checked={selectedModels.includes(model)}
                  onChange={() => handleModelToggle(model)}
                />
                {model}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
