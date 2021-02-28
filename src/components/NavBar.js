import { useState } from "react";

function NavBar(props) {
  //toggles to visibility of the instruction model to visible
  function showInstructions() {
    props.setViewInstructions("visible");
  }

  //nav bar containing about, high scores, and score board
  return (
    <ul id="nav">
      <li id="instructions" onClick={showInstructions}>Instructions</li>
      <li id="high-scores">High Scores</li>
      <li id="score">
        Score: <b>{props.score}</b>
      </li>
    </ul>
  );
}
export default NavBar;
