import React from "react";

const ProductFilter = ({
  brandsData,
  selectedBrands,
  setSelectedBrands,
  selectedSortKey,
  setSelectedSortKey,
}) => {
  //   const [filter, setLocalFilter] = useState("");

  //   const handleFilterChange = (filterValue) => {
  //     setLocalFilter(filterValue);
  //     setFilter(filterValue);
  //   };

  const handleBrandToggle = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(
        selectedBrands.filter((selectedBrand) => selectedBrand !== brand)
      );
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const sortData = [
    { id: 1, key: "oldToNew", title: "Old to new" },
    { id: 2, key: "newToOld", title: "New to old" },
    { id: 2, key: "priceHightToLow", title: "Price hight to low" },
    { id: 2, key: "priceLowToHigh", title: "Price low to high" },
  ];

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
          {brandsData.map((brand) => (
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

      <div className="card">Model</div>
    </div>
  );
};

export default ProductFilter;
