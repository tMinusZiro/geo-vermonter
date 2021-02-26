import { useState } from "react"

function NavBar(props) {
    //nav bar containing about, high scores, and score board
    return (
      <ul id="nav">
        <li>About</li>
        <li>High Scores</li>
        <li>Score: <b>{props.score}</b></li>
      </ul>
    );
  }
  export default NavBar;
  