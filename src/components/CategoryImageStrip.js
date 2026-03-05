import React from "react";

const CategoryImageStrip = ({ images, altPrefix }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="category-image-strip">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`${altPrefix} ${index + 1}`}
          className="category-image-strip__item"
        />
      ))}
    </div>
  );
};

export default CategoryImageStrip;

