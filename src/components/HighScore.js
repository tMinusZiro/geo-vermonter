import React from "react";
import { useState, useRef } from "react";
import { useOnClickOutside } from "./hooks/clickOutside";
const HighScore = (props) => {
  //toggles to visibility of the instruction model to visible
  function closeHighScore() {
    props.setViewHighScore("hidden");
  }

  //DOM element node
  const domElem = useRef();

  useOnClickOutside(domElem, () => props.setViewHighScore("hidden"));

  return (
    <div
      ref={domElem}
      style={{ visibility: props.viewHighScore }}
      id="highScore-wrapper"
    >
      <div id="high-score-modal">
        <h1>High Score Board</h1>
        <h3>
          {localStorage.getItem("recentHSName")}{" "}
          {localStorage.getItem("recentHighScore")}
        </h3>
        <button onClick={closeHighScore}>Close</button>
      </div>
    </div>
  );
};

export default HighScore;
