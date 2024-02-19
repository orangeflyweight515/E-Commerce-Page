import React, { useState } from "react";
import Header from "./components/Header/Header";
import Detailcomp from "./components/DetailComponent/DetailComp";
import "./App.scss";
import staticData from "./constants/staticData.json";

const App = () => {
  const [isCartButtonVisible, setIsCartButtonVisible] = useState(true);
  const [cartItemCount, setCartItemCount] = useState(staticData.cart.items);

  return (
    <div className="container">
      <Header
        isCartButtonVisible={isCartButtonVisible}
        cartItemCount={cartItemCount}
        setCartItemCount={setCartItemCount}
      />
      <Detailcomp
        setIsCartButtonVisible={setIsCartButtonVisible}
        cartItemCount={cartItemCount}
        setCartItemCount={setCartItemCount}
      />
    </div>
  );
};

export default App;
