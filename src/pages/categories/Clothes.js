import React from "react";
import Pagination from "../../components/Pagination";
import Footer from "../../components/Footer";
import ClothingLayout from "../../components/categoriesLayout/ClothingLayout";

function Clothes() {
  return (
    <>
      <ClothingLayout
        value={{
          author: "Laptops & Phones",
          names: [
            { name: "Laptops", path: "localhost/" },
            { name: "Phones", path: "localhost" },
            { name: "Tablets", path: "localhost" },
            { name: "Laptop Accessories", path: "localhost" },
            { name: "Phone Accessories", path: "localhost" },
            { name: "Gaming & Consoles", path: "localhost" },
          ],
          category: "Category",
        }}
      />
      <Pagination />
      <Footer />
    </>
  );
}

export default Clothes;
