import arrow from "./images/arrow.svg";
import { useState } from "react";

function MovementButtons(props) {
  //declares an array to keep track of users movement from the start point (randomSpot)
  const [pathArray, setPathArray] = useState([props.center]);

  //viewCenter is passed as a prop from App.js, this is the point where the map view is centered
  //the first part is longitude (north & south)
  let currentLong = props.viewCenter[0];

  //the second part is latitude (east & west)
  let currentLat = props.viewCenter[1];

  //called on when the North button is clicked - moveNorth changes the current longitude by .001 and decreases score by 1
  function moveNorth() {
    props.setViewCenter([currentLong + 0.001, currentLat]);
    props.setScore(props.score - 1);
    pathArray.push(props.center);
    console.log(`after moving north path array is ${pathArray}`);
  }

  //called on when the East button is clicked - moveEast changes the current longitude by .001 and decreases score by 1
  function moveEast() {
    props.setViewCenter([currentLong, currentLat + 0.001]);
    props.setScore(props.score - 1);
  }

  //called on when the South button is clicked - moveSouth changes the current longitude by .001 and decreases score by 1
  function moveSouth() {
    props.setViewCenter([currentLong - 0.001, currentLat]);
    props.setScore(props.score - 1);
  }

  //called on when the West button is clicked - moveWest changes the current longitude by .001 and decreases score by 1
  function moveWest() {
    props.setViewCenter([currentLong, currentLat - 0.001]);
    props.setScore(props.score - 1);
  }

  //called on when the return button is clicked - return recenters the map on the game's center with no change to score
  function moveReturn() {
    props.setViewCenter([props.center[0], props.center[1]]);
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
            alt="up-arrow"
            onClick={moveNorth}
          />
        </div>
        <div id="movement-buttons-center">
          <img
            src={arrow}
            id="west"
            className="move-button"
            alt="left-arrow"
            onClick={moveWest}
          />
          <div id="return" className="move-button" onClick={moveReturn}></div>
          <img
            src={arrow}
            id="east"
            className="move-button"
            alt="right-arrow"
            onClick={moveEast}
          />
        </div>
        <div id="movement-buttons-bottom">
          <img
            src={arrow}
            id="south"
            className="move-button"
            alt="down-arrow"
            onClick={moveSouth}
          />
        </div>
      </div>
    </div>
  );
}

export default MovementButtons;
