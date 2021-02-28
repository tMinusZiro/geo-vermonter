import arrow from "./images/arrow.svg";
import { useState, useEffect } from "react";

function MovementButtons(props) {
  //viewCenter is passed as a prop from App.js, this is the point where the map view is centered
  //the first part is longitude (north & south)
  let currentLong = props.viewCenter[0];

  //the second part is latitude (east & west)
  let currentLat = props.viewCenter[1];

  function updateBreadCrumb() {
    const { coordinates } = props.pathArray;
    let tempArr = [...coordinates];
    tempArr.push([props.viewCenter[0], props.viewCenter[1]]);
    props.setPathArray({
      coordinates: tempArr,
    });
  }

  //called on when the North button is clicked - moveNorth changes the current longitude by .001 and decreases score by 1
  function moveNorth() {
    props.setViewCenter([currentLong + 0.001, currentLat]);
    props.setScore(props.score - 1);

    // props.setPathArray({
    //   coordinates: [props.viewCenter[0], props.viewCenter[1]],
    // });
    console.log(`after moving north path array is ${props.pathArray}`);
  }

  //called on when the East button is clicked - moveEast changes the current longitude by .001 and decreases score by 1
  function moveEast() {
    props.setViewCenter([currentLong, currentLat + 0.001]);
    props.setScore(props.score - 1);

    // props.setPathArray({ coordinates: [props.viewCenter] });
    console.log(`after moving east path array is ${props.pathArray}`);
  }

  //called on when the South button is clicked - moveSouth changes the current longitude by .001 and decreases score by 1
  function moveSouth() {
    props.setViewCenter([currentLong - 0.001, currentLat]);
    props.setScore(props.score - 1);

    // props.setPathArray({ coordinates: [props.viewCenter] });
    console.log(`after moving south path array is ${props.pathArray}`);
  }

  //called on when the West button is clicked - moveWest changes the current longitude by .001 and decreases score by 1
  function moveWest() {
    props.setViewCenter([currentLong, currentLat - 0.001]);
    props.setScore(props.score - 1);

    // props.setPathArray({ coordinates: [props.viewCenter] });
    console.log(`after moving west path array is ${props.pathArray}`);
  }

  //called on when the return button is clicked - return recenters the map on the game's center with no change to score
  function moveReturn() {
    props.setViewCenter([props.center[0], props.center[1]]);

    // props.setPathArray({ coordinates: [props.viewCenter] });
    console.log(`after moving center path array is ${props.pathArray}`);
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
          <div id="return" className="move-button" onClick={moveReturn}>
            Return
          </div>
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
