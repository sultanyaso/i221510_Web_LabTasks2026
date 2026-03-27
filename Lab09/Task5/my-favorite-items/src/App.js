import React, { useState } from "react";
import "./App.css";

function App() {
  // React DOM color state
  const [reactColor, setReactColor] = useState("lightblue");

  // HTML DOM Manipulation
  const changeHtmlColor = () => {
    const colorInput = document.getElementById("htmlColorInput").value.trim();
    const box = document.getElementById("htmlColorBox");
    if (colorInput === "") return;
    box.style.backgroundColor = colorInput;
    document.getElementById("htmlColorInput").value = "";
  };

  // React DOM Manipulation
  const changeReactColor = () => {
    const colorInput = document.getElementById("reactColorInput").value.trim();
    if (colorInput === "") return;
    setReactColor(colorInput);
    document.getElementById("reactColorInput").value = "";
  };

  return (
    <div className="container">
      <h1>Interactive Color Changer</h1>

      {/* HTML DOM Box */}
      <div className="section">
        <h2>HTML DOM Manipulation</h2>
        <div id="htmlColorBox" className="color-box"></div>
        <input
          type="text"
          id="htmlColorInput"
          placeholder="Enter color (e.g., red, #ff0000)"
        />
        <button onClick={changeHtmlColor}>Change Color (HTML DOM)</button>
      </div>

      {/* React DOM Box */}
      <div className="section">
        <h2>React DOM Manipulation</h2>
        <div
          id="reactColorBox"
          className="color-box"
          style={{ backgroundColor: reactColor }}
        ></div>
        <input
          type="text"
          id="reactColorInput"
          placeholder="Enter color (e.g., green, #00ff00)"
        />
        <button onClick={changeReactColor}>Change Color (React DOM)</button>
      </div>

      {/* Comparison Section */}
      <div className="section">
        <h2>Comparison</h2>
        <table>
          <thead>
            <tr>
              <th>Aspect</th>
              <th>HTML DOM Approach</th>
              <th>React DOM Approach</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>How does it update the UI?</td>
              <td>Directly changes the DOM element style (imperative)</td>
              <td>Updates React state and re-renders JSX (declarative)</td>
            </tr>
            <tr>
              <td>Does it touch the DOM directly?</td>
              <td>Yes</td>
              <td>No, React handles it via virtual DOM</td>
            </tr>
            <tr>
              <td>What happens on re-render?</td>
              <td>Changes remain unless manually updated</td>
              <td>React calculates differences and updates only changed DOM</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;