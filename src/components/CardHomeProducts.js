import React from "react";
import CardProductItem from "./CardProductItem";
import "../styles/Components/_card-product.scss";

function CardProducts(props) {
  return (
    <div className="cards">
      <h1 className="shopstyleh">Buying and Selling made easy with FIRSTCHECKER</h1>
      <p className="shopstylep">
        Find great deals on fairly used laptops, phones, cars, home furniture & appliances, accessories, and commercial equipment & tools directly from sellers.
      </p>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            {props.products.map((product, index) => {
              const { id } = product;
              const imageSrc =
                product.productImages &&
                product.productImages[0] &&
                product.productImages[0].image
                  ? product.productImages[0].image
                  : "";
              return (
                <CardProductItem
                  key={index}
                  id={product.id}
                  src={imageSrc}
                  name={product.name}
                  price={"₦" + product.price}
                  path={`/cart/${id}`}
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
