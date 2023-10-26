import { useState } from "react";
import CheckedTree from "./CheckedTree";
import { formatData } from "./utils";
import "./App.css";
import data from "./data";

function App() {
  const [formData, setFormData] = useState({ checkedTree: [] });

  const handleSubmit = () => {
    console.log(formData);
  };

  const formattedData = formatData(data);

  return (
    <>
      <div className="container">
        <h1>Mock Form</h1>
        <input placeholder="Mock Input" className="common" />
        <input placeholder="Mock Input" className="common" />
        <CheckedTree data={formattedData} />
        <button onClick={handleSubmit} className="common">
          Submit
        </button>
      </div>
    </>
  );
}

export default App;
