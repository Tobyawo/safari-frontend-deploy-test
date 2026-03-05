import React from "react";

function CategoryEmptyState({ message, items }) {
  const shownItems = (items || []).slice(0, 6);

  return (
    <div className="category-empty-state">
      {shownItems.length > 0 && (
        <div className="category-empty-state__grid">
          {shownItems.map((item, index) => (
            <img
              key={index}
              src={item.image}
              alt={item.name}
              className="category-empty-state__image"
            />
          ))}
        </div>
      )}
      {shownItems.length > 0 && (
        <div className="category-empty-state__details">
          {shownItems.map((item, index) => (
            <div key={index} className="category-empty-state__detail">
              <div className="category-empty-state__name">{item.name}</div>
              <div className="category-empty-state__desc">{item.description}</div>
              <div className="category-empty-state__price">{item.price}</div>
            </div>
          ))}
        </div>
      )}
      {!shownItems.length && (
        <p className="category-empty-state__text">
          {message ||
            "No items match your filters yet. Try adjusting your filters or exploring other categories."}
        </p>
      )}
    </div>
  );
}

export default CategoryEmptyState;


