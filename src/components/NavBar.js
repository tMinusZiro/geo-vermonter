import { useState } from "react";

function NavBar(props) {
  //toggles to visibility of the instruction model to visible
  function showInstructions() {
    props.setViewHowToPlay("visible");
  }

  //nav bar containing about, high scores, and score board
  return (
    <ul id="nav">
      <li onClick={showInstructions}>How To Play</li>
      <li>High Scores</li>
      <li>
        Score: <b>{props.score}</b>
      </li>
    </ul>
  );
}
export default NavBar;
