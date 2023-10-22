import { useState } from "react";
// import CheckedTree from './CheckedTree'
import "./App.css";

function App() {
  const [formData, setFormData] = useState({ checkedTree: [] });

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <>
      <div className="container">
        <h1>Mock Form</h1>
        <input placeholder="Mock Input" className="common" />
        <input placeholder="Mock Input" className="common" />
        {/* <CheckedTree /> */}
        <button onClick={handleSubmit} className="common">
          Submit
        </button>
      </div>
    </>
  );
}

export default App;
