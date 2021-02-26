import arrow from "./images/arrow.svg";
import { useState } from "react";

function MovementButtons(props) {
  //viewCenter is passed as a prop from App.js, this is the point where the map view is centered
  //the first part is longitude (north & south)
  let currentLong = props.viewCenter[0];

  //the second part is latitude (east & west)
  let currentLat = props.viewCenter[1];

  console.log(props.score);

  //called on when the North button is clicked - moveNorth changes the current longitutde by .001 and decreases score by 1
  function moveNorth() {
    console.log("moving north");
    console.log("adjusting the first number [0] by increasing .01");
    props.setViewCenter([currentLong + 0.001, currentLat]);
    props.setScore(props.score - 1);
  }

  //called on when the East button is clicked - moveEast changes the current longitutde by .001 and decreases score by 1
  function moveEast() {
    console.log("moving east");
    console.log("adjusting the second number [1] by increasing .01");
    props.setViewCenter([currentLong, currentLat + 0.001]);
    props.setScore(props.score - 1);
  }

  //called on when the South button is clicked - moveSouth changes the current longitutde by .001 and decreases score by 1
  function moveSouth() {
    console.log("moving south");
    console.log("adjusting the first number [0] by decreasing .01");
    props.setViewCenter([currentLong - 0.001, currentLat]);
    props.setScore(props.score - 1);
  }

  //called on when the West button is clicked - moveWest changes the current longitutde by .001 and decreases score by 1
  function moveWest() {
    console.log("moving west");
    console.log("adjusting the second number [1] by decreasing .01");
    props.setViewCenter([currentLong, currentLat - 0.001]);
    props.setScore(props.score - 1);
  }

  function moveReturn() {
    console.log("returning");
  }

  return (
    <div id="navigation-container">
    <h2 id="navigation">Navigation</h2>
    <div id="movement-buttons">
      <div id="movement-buttons-top">
        <img
          src={arrow}
          id="north"
          className="move-button"
          onClick={moveNorth}
        />
      </div>
      <div id="movement-buttons-center">
        <img src={arrow} id="west" className="move-button" onClick={moveWest} />
        <div id="return" className="move-button" onClick={moveReturn}></div>
        <img src={arrow} id="east" className="move-button" onClick={moveEast} />
      </div>
      <div id="movement-buttons-bottom">
        <img
          src={arrow}
          id="south"
          className="move-button"
          onClick={moveSouth}
        />
      </div>
      {/* <p>
        Once the game has started use these buttons to navigate around the map,
        North, South, East or West. Each time you move, your score will go down
        by 1 point. The center button will return you to the starting point,
        with no reduction to your score.{" "}
      </p> */}
    </div>
    </div>
  );
}

export default MovementButtons;
