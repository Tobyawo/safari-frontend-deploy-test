import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import productApis from "../apis/ProductApi";
import CardProductItem from "./CardProductItem";

function SearchLayout() {
  const [searchedProducts, setSearchedProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  let keyword = new URLSearchParams(window.location.search).get("keyword");

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);

    (async () => {
      const products = await productApis.searchProductByParams(keyword);
      console.log(products.content);
      setSearchedProduct(products.content);
    })();
  }, []);

  return (
    <div>
      <Container>
        <h3>Search for: {keyword}</h3>
        {loading ? (
          <div>Loading...</div>
        ) : searchedProducts.length != 0 ? (
          searchedProducts.map((product, index) => (
            <CardProductItem
              key={index}
              id={product.id}
              src="/images/products/gustavo-spindula-l7wrlsKDmCE-unsplash 1.png"
              name={product.name}
              price={"₦" + product.price}
              path={`/cart/${product.id}`}
              // favourtie="/favourite"
              // favourtie={`/api/customer/favourite/${product.id}`}
            />
          ))
        ) : (
          <div>No product exist by that keyword</div>
        )}
      </Container>
    </div>
  );
}

export default SearchLayout;
