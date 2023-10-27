import React, { useState } from "react";

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
    copyCartA.forEach((cartAItem: string, i: number) => {
      if (i % 2 === 0) {
        const tempItem = copyCartA[i];
        copyCartA[i] = copyCartB[i];
        copyCartB[i] = tempItem;
      }
    });

    setCartA(copyCartA);
    setCartB(copyCartB);
  };

  return (
    <div style={{ display: "flex", gap: "30px" }}>
      <div>
        {cartA?.map((aItem, i) => (
          <div>
            {i + 1}.{aItem}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <button onClick={swapOdds}>Swap Odds</button>
      </div>

      <div>
        {cartB?.map((bItem, i) => (
          <div>
            {i + 1}.{bItem}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwapItemsInCarts;
