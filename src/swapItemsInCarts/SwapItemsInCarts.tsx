import React, { useState } from "react";
import Cart from "./Cart";

const SwapItemsInCarts = () => {
  const [cartA, setCartA] = useState<string[]>([
    "apples",
    "bananas",
    "grapes",
    "oranges",
    "pears",
    "pineapple",
  ]);
  const [cartB, setCartB] = useState<string[]>([
    "potatoes",
    "beans",
    "carrots",
    "spinnach",
    "kale",
    "broccoli",
  ]);

  const swapOdds = () => {
    const copyCartA = [...cartA];
    const copyCartB = [...cartB];
    for (let i = 0; i < cartA.length; i += 2) {
      copyCartA[i] = cartB[i];
      copyCartB[i] = cartA[i];
    }

    setCartA(copyCartA);
    setCartB(copyCartB);
  };

  return (
    <>
      <div style={{ border: "solid black 1px", padding: "5px" }}>
        <h3 style={{ textAlign: "center" }}>Swap Odd Items</h3>
        <div className="flex carts-parent-container">
          <Cart items={cartA} cartNumber={1} />
          <button className="swap-button" onClick={swapOdds}>
            Swap Odds
          </button>
          <Cart items={cartB} cartNumber={2} />
        </div>
      </div>
    </>
  );
};

export default SwapItemsInCarts;
