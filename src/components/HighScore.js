import React from "react";
import { useState, useRef } from "react";
import { useOnClickOutside } from "./hooks/clickOutside";
const HighScore = (props) => {
 
let parseMovesArr = JSON.parse(localStorage.getItem('Moves'))
let parseGuessesArr = JSON.parse(localStorage.getItem('Guesses'))
let parseName = JSON.parse(localStorage.getItem('name'))
let parseDate = JSON.parse(localStorage.getItem('date'))




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
        <div id="hs-name-wrapper">
        <h3>Name: </h3>
          <div id="name">
          <h4>{parseName}</h4>
          </div>
     </div>
        <div id="hs-move-wrapper">
        <h3>Moves: </h3>
          <div id="moves">
          {parseMovesArr.map(item => {
           return <p>{item}</p>
          })}
          </div>
     </div>
        <div id="hs-guess-wrapper">
        <h3>Guesses: </h3>
          <div id="guess">
          {parseGuessesArr.map(item => {
           return <p>{item}</p>
          })}
          </div>
     </div>
     <div id="hs-score-wrapper">
        <h3>Score: </h3>
          <div id="score">
          <p>{props.score}</p>
          </div>
     </div>
     <div id="hs-date-wrapper">
        <h3>Date: </h3>
          <div id="date">
          <p>{parseDate}</p>
          </div>
     </div>
        <button onClick={closeHighScore}>Close</button>
      </div>
    </div>
  );
};

export default HighScore;
