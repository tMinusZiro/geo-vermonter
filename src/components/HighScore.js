import React from "react";
import { useState, useRef } from "react";
import { useOnClickOutside } from "./hooks/clickOutside";
const HighScore = (props) => {
 
  let parseMovesArr = JSON.parse(localStorage.getItem('Moves'))
console.log('PARSED MOVES ARRAY')
console.log(parseMovesArr)

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
        <h3>Moves: </h3>
          <div id="moves">
          {parseMovesArr.map(item => {
           return <p>{item}</p>
            console.log('ITEM IN MAP')
            console.log(item)
          })}
     </div>
        <button onClick={closeHighScore}>Close</button>
      </div>
    </div>
  );
};

export default HighScore;
