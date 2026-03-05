import React from "react";
import "../styles/Components/_category_color.scss";

const colorOptions = [
  "Beige",
  "Blue",
  "Black",
  "Orange",
  "Green",
  "Brown",
  "Purple",
  "Gold",
  "Taupe",
  "White",
  "Pink",
  "Red",
];

function CategoryColor({ click }) {
  const handleChange = (e) => {
    click(e.target.value);
  };

  return (
    <div className="categoryColorContainer">
      <select
        className="category-dropdown"
        defaultValue=""
        onChange={handleChange}
      >
        <option value="">All colors</option>
        {colorOptions.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryColor;
