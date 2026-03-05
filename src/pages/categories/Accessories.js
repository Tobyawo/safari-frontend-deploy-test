import React from "react";
import Pagination from "../../components/Pagination";
import Footer from "../../components/Footer";
import AccessoriesLayout from "../../components/categoriesLayout/AccessoriesLayout";

function Accessories() {
  return (
    <>
      <AccessoriesLayout
        value={{
          author: "Home & Accessories",
          names: [
            { name: "Home Furniture", path: "localhost/" },
            { name: "Home Appliances", path: "localhost" },
            { name: "Kitchen Appliances", path: "localhost" },
            { name: "Office Furniture", path: "localhost" },
            { name: "Home Decor", path: "localhost" },
            { name: "Smart Home & Security", path: "localhost" },
            { name: "Fashion Accessories", path: "localhost" },
          ],
          category: "Category",
        }}
      />
      <Pagination />
      <Footer />
    </>
  );
}

export default Accessories;
