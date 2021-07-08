import React from "react";
import CardProductItem from "./CardProductItem";
import "../styles/Components/_card-product.scss";

function CardProducts(props) {
  return (
    <div className="cards">
      <h1 className="shopstyleh">Shop with Style</h1>
      <p className="shopstylep">
        Shop the latests in Fashion. Shop at Safari webstore today.
      </p>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            {props.products.map((product, index) => {
              const { id, name, price } = product;
              return (
                <CardProductItem
                  key={index}
                  id={product.id}
                  src="/images/products/gustavo-spindula-l7wrlsKDmCE-unsplash 1.png"
                  name={product.name}
                  price={"₦" + product.price}
                  path={`/cart/${id}`}
                  // favourtie="/favourite"
                  // favourtie={`/api/customer/favourite/${product.id}`}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CardProducts;
