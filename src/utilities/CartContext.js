import React, { useContext, useState } from "react";

const NavContext = React.createContext();
const UpdateNavContext = React.createContext();

export function useCart() {
  return useContext(NavContext);
}

export function useCartUpdate() {
  return useContext(UpdateNavContext);
}

export function CartProvider({ children }) {
  const getCartCount = localStorage.getItem("cart-count");
  let counter = 0;

  if (getCartCount == null) localStorage.setItem("cart-count", counter);
  else counter = localStorage.getItem("cart-count");

  console.log(counter, "dd");

  const [count, setCount] = useState(Number(counter));

  function addToCart() {
    setCount((prevCount) => prevCount + 1);
    localStorage.setItem("cart-count", count + 1);
  }

  return (
    <NavContext.Provider value={count}>
      <UpdateNavContext.Provider value={addToCart}>
        {children}
      </UpdateNavContext.Provider>
    </NavContext.Provider>
  );
}
