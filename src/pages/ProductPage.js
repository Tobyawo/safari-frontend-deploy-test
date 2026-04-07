import React from "react";
import ProductItemLayout from "../components/ProductItemLayout";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";

function ProductPage() {
  const { id } = useParams();

  return (
    <>
      <ProductItemLayout productId={id} />
      <Footer />
    </>
  );
}

export default ProductPage;
