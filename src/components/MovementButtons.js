import arrow from "./images/arrow.svg";
import { useState } from "react";


function MovementButtons(props) {
  //the initial view is centered at the center of the map
  // const [viewCenter, setViewCenter] = useState(props.center);

  //first part is longitude (north & south)
  let currentLong = props.viewCenter[0];
  //second part is latitude (east & west)
  let currentLat = props.viewCenter[1];

  // console.log(
  //   `from inside movement buttons center is ${
  //     props.center
  //   } with type ${typeof props.center}`
  // );
  // console.log(
  //   `from inside movement buttons center at 0 is ${
  //     props.center[0]
  //   } with type ${typeof props.center[0]}`
  // );
  // console.log(
  //   `from inside movement buttons center at 1 is ${
  //     props.center[1]
  //   } with type ${typeof props.center[1]}`
  // );

  function moveNorth() {
    console.log("moving north");
    console.log("adjusting the first number [0] by increasing .01");
    props.setViewCenter([currentLong + 0.001, currentLat]);
  }

  function moveEast() {
    console.log("moving east");
    console.log("adjusting the second number [1] by increasing .01");
    props.setViewCenter([currentLong, currentLat + 0.001]);
  }

  function moveSouth() {
    console.log("moving south");
    console.log("adjusting the first number [0] by decreasing .01");
    props.setViewCenter([currentLong - 0.001, currentLat]);
  }

  function moveWest() {
    console.log("moving west");
    console.log("adjusting the second number [1] by decreasing .01");
    props.setViewCenter([currentLong, currentLat - 0.001]);
  }

  function moveReturn() {
    console.log("returning");
  }

  return (
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
        {/* <button id="return" onClick={moveReturn}></button> */}
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
    </div>
  );
}

export default MovementButtons;
