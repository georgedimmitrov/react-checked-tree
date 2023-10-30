import CheckedTree from "./CheckedTree";
import { formatData } from "./utils";
import "./App.css";
import data from "./data";
import SwapItemsInCarts from "./swapItemsInCarts/SwapItemsInCarts";

function App() {
  const formattedData = formatData(data);

  return (
    <>
      <div className="container">
        <CheckedTree data={formattedData} />

        <SwapItemsInCarts />
      </div>
    </>
  );
}

export default App;
