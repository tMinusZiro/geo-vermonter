import borderData from "../data/border";
import leafletPip from "leaflet-pip";
import L from "leaflet";
import { useState, useEffect } from "react";
import Modal from "./Modal";

//select a random number for latitude and longitutde within the bounder of VT
function RandomSpot(props) {
  const [countyData, setCountyData] = useState(); //state for current location of the user in the game
  const [buttonState, setButtonState] = useState(true);
  const [startState, setStartState] = useState(false);

  let deactivateStyle;
  //sets guess and quit button to disabled when start is clicked
  function clickButton() {
    setButtonState(false);
    //deactivates the start button after it is clicked
    if (buttonState === true) {
      setStartState(true);
      deactivateStyle = {
        color: "rgba(127, 131, 106, 0.897)",
        pointer: "none",
      };
    }
  }

  //A function that toggles the modal to open
  function showModal() {
    props.setModalDisplay("visible");
  }

  //returns a random number between a min and max - we are not using floor since we can accept decimal values
  function randomNum(min, max) {
    return Math.random() * (max - min + 1) + min;
  }

  //pick a random latitude
  function randomLatitude() {
    //from VT border latitude min: 42.730315121762715 & max: 45.007561302382754
    return randomNum(42.730315121762715, 45.007561302382754);
  }

  //pick a random longitude
  function randomLongitude() {
    //from VT border longitude min:-73.42613118833583 max: -71.51022535353107
    return randomNum(-73.42613118833583, -71.51022535353107);
  }

  //check if a given point is within the boundary of VT and returns a boolean
  function checkPointWithinBorder(point) {
    //sets the VT borderData into a geoJSON object to be passed into leaflet pip
    let stateLayer = L.geoJSON(borderData);

    //calls leafletPip.pointInLayer method - returns an array of the polygons included in the stateLayer that contain the provided point
    //note that leafletpip looks for [lat,long] instead of [long,lat] which is typical set up
    let layerLength = leafletPip.pointInLayer([point[1], point[0]], stateLayer);

    //if length of the array is 0, there are no polygons that the point is inside => the point is not inside VT.  Return false.  Else, return true.
    if (layerLength.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  //function to generate a random point inside of VT boarder
  function generatePointInsideVT() {
    //declares variables to generate new random lat & long coordinates
    let newLatitude = randomLatitude();
    let newLongitude = randomLongitude();

    //declares a variable to store whether the random point generated is inside VT or not
    let insideVT = checkPointWithinBorder([newLatitude, newLongitude]);

    //while insideVT is false, continue to generate new random coordinates
    while (!insideVT) {
      newLatitude = randomLatitude();
      newLongitude = randomLongitude();
      insideVT = checkPointWithinBorder([newLatitude, newLongitude]);
    }

    //once a random point is insideVT, setCenter sends the marker to App.js
    props.setCenter([newLatitude, newLongitude]);
    // set viewCenter sends the view center to App.js
    props.setViewCenter([newLatitude, newLongitude]);
    // sets path array to start with the first coordinate as the center
    props.setPathArray({ coordinates: [[[newLatitude, newLongitude]]] });
  }

  //-----Fetch--------//

  //used a useEffect hook that will fetch current county every time the current center coordinate changes
  useEffect(() => {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${props.currentCenter[0]}&lon=${props.currentCenter[1]}`
    )
      .then((res) => res.json())
      .then((jsonObj) => {
        //calling the countData change function and assigning the state to the current location json object containing useful location info
        setCountyData(jsonObj);
      });
  }, [props.currentCenter]);

  console.log("Outside of fetch, COUNTY =");
  console.log(countyData ? countyData : "Loading...");
  function leaveGame() {
    props.setInformation({
      latitude: countyData.lat,
      longitude: countyData.lon,
      county: countyData.address.county,
      town: countyData.address.village,
    });
  }

  //a single button with onClick listener that triggers generatePointInsideVT, adjusts zoom of map, sets information in the info bar
  return (
    <div>
      <button
        className="index-buttons"
        disabled={startState}
        style={deactivateStyle}
        onClick={(evt) => {
          clickButton();
          generatePointInsideVT();
          // setCenter sends the zoom adjustment to App.js
          props.setZoom(18);
          props.setInformation({
            latitude: "???",
            longitude: "???",
            county: "???",
            town: "???",
          });
          // fetchData();
        }}
      >
        Start
      </button>
      <button
        className="index-buttons"
        name="Guess"
        disabled={buttonState}
        onClick={showModal}
      >
        Guess
      </button>

      <button
        className="index-buttons"
        name="Quit"
        disabled={buttonState}
        onClick={() => {
          console.log(countyData);
          leaveGame();
          //sets a delay after quitting to allow user to see info box populate
          let timeout = setTimeout(function reset() {
            //a little quitting pun to entice the user to play again
            alert("Why did the Donkey quit his job?\n\nHee Hawed enough!");
            //refreshes page to restart the game after player quits
            window.location.reload();
          }, 1200);
        }}
      >
        Quit
      </button>
    </div>
  );
}

export default RandomSpot;
