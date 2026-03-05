import React from "react";
import "../styles/Components/_category_size.scss";

const sizeOptions = [
  "XXS",
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
];

function CategorySize({ click }) {
  const handleChange = (e) => {
    click(e.target.value);
  };

  return (
    <div className="categorySizeContainer">
      <select className="category-dropdown" defaultValue="" onChange={handleChange}>
        <option value="">All sizes</option>
        {sizeOptions.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategorySize;
