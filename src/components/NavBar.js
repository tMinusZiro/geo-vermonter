import React from "react";

function NavBar(props) {
  //toggles to visibility of the instruction modal to visible
  function showInstructions() {
    props.setViewInstructions("visible");
  }
  //toggles to visibility of the high score modal to visible
  function showHighScore() {
    props.setViewHighScore("visible");
  }

  //nav bar containing about, high scores, and score board
  return (
    <ul id="nav">
      <li id="instructions" onClick={showInstructions}>
        Instructions
      </li>
      <li id="high-scores" onClick={showHighScore}>
        High Scores
      </li>
      <li id="score">
        Score: <b>{props.score}</b>
      </li>
    </ul>
  );
}
export default NavBar;
