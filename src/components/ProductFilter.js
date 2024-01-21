import React, { useState } from "react";

const ProductFilter = ({ setFilter }) => {
  const [filter, setLocalFilter] = useState("");

  const handleFilterChange = (filterValue) => {
    setLocalFilter(filterValue);
    setFilter(filterValue);
  };

  return (
    <div className="sidebar">
      <div className="card" onClick={() => handleFilterChange("Sort By")}>
        Sort By
      </div>
      <div className="card" onClick={() => handleFilterChange("Brands")}>
        Brands
      </div>
      <div className="card" onClick={() => handleFilterChange("Model")}>
        Model
      </div>
    </div>
  );
};

export default ProductFilter;
