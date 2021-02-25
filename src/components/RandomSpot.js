import borderData from "../data/border";
import leafletPip from "leaflet-pip";
import L from "leaflet";

function RandomSpot(props) {
  //select a random number for latitude and longitutde
  function randomNum(min, max) {
    return Math.random() * (max - min + 1) + min;
  }

  //pick a random latitude
  function randomLatitude() {
    //latitude: min: 42.730315121762715 max: 45.007561302382754
    return randomNum(42.730315121762715, 45.007561302382754);
  }

  //pick a random longitude
  function randomLongitude() {
    //longitude: min:-73.42613118833583 max: -71.51022535353107
    return randomNum(-73.42613118833583, -71.51022535353107);
  }

  //   [43.88, -72.7317]
  //check if it's within the boundary of VT
  function checkPointWithinBorder(point) {
    console.log(point);

    let stateLayer = L.geoJSON(borderData);

    let layerLength = leafletPip.pointInLayer([point[1], point[0]], stateLayer)
      .length;
    return layerLength;
    //need if else logic to return true or false
  }

  function generatePointInsideVT() {
    let newLatitude = randomLatitude();
    let newLongitude = randomLongitude();
    let variable = checkPointWithinBorder([newLatitude, newLongitude]);

    while (variable === 0) {
      newLatitude = randomLatitude();
      newLongitude = randomLongitude();
      variable = checkPointWithinBorder([newLatitude, newLongitude]);
    }
    props.setCenter([newLatitude, newLongitude]);
  }

  return (
    <div>
      <button
        onClick={(evt) => {
          generatePointInsideVT();
        }}
      >
        Random Spot
      </button>
    </div>
  );
}

export default RandomSpot;
