import React from "react";
import "../styles/Components/_category_price.scss";

const priceOptions = [
  { label: "₦0 - ₦10,000", value: "0,10000" },
  { label: "₦10,000 - ₦20,000", value: "10000,20000" },
  { label: "₦20,000 - ₦50,000", value: "20000,50000" },
  { label: "₦50,000 - ₦100,000", value: "50000,100000" },
  { label: "₦100,000 - ₦200,000", value: "100000,200000" },
];

function CategoryPrice({ click, activeFilter }) {
  const selected = activeFilter.price[0] || "";

  const handleChange = (e) => {
    click(e.target.value);
  };

  return (
    <div className="Category-Price">
      <select
        className="category-dropdown"
        value={selected}
        onChange={handleChange}
      >
        <option value="">All price ranges</option>
        {priceOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryPrice;
