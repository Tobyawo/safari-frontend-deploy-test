import React from "react";
import Pagination from "../../components/Pagination";
import Footer from "../../components/Footer";
import ShoeLayout from "../../components/categoriesLayout/ShoeLayout";

function Shoes() {
  return (
    <>
      <ShoeLayout
        value={{
          author: "Cars & Equipment",
          names: [
            { name: "Cars", path: "localhost/" },
            { name: "Motorcycles", path: "localhost" },
            { name: "Trucks & Buses", path: "localhost" },
            { name: "Spare Parts", path: "localhost" },
            { name: "Commercial Equipment", path: "localhost" },
            { name: "Power Tools", path: "localhost" },
            { name: "Industrial Machinery", path: "localhost" },
          ],
          category: "Category",
        }}
      />
      <Pagination />
      <Footer />
    </>
  );
}

export default Shoes;
