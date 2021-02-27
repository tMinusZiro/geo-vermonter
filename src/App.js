import "./App.css";
import { useState } from "react";
import Header from "./components/Header.js";
import Map from "./components/Map";
import MovementButtons from "./components/MovementButtons";
import Info from "./components/Info";
import Modal from "./components/Modal";
import RandomSpot from "./components/RandomSpot.js";
import StatusButtons from "./components/Button.js";
import Instructions from "./components/Instructions.js";

function App() {
  //declares variable to set and store the location of the marker[latitude,longitude]
  const [center, setCenter] = useState([43.88, -72.7317]);

  //declares variable to set and store the location of the center of the view box
  const [viewCenter, setViewCenter] = useState([43.88, -72.7317]);

  //declares variable to store and set score
  const [score, setScore] = useState("100");

  //declare variable to store and set zoom
  const [zoom, setZoom] = useState(8);

  //declare variable to show instructions model
  const [viewInstructions, setViewInstructions] = useState("hidden");

  //declares variable to store and set information in info box
  const [information, setInformation] = useState({
    latitude: "???",
    longitude: "???",
    county: "???",
    town: "???",
  });

  return (
    <>
      <Header score={score} setViewInstructions={setViewInstructions}/>
      <div id="map-container">
        <div className="board-containers">
          <MovementButtons
            center={center}
            setCenter={setCenter}
            viewCenter={viewCenter}
            setViewCenter={setViewCenter}
            score={score}
            setScore={setScore}
          />
        </div>
        <div className="board-containers">
          <Map center={center} viewCenter={viewCenter} zoom={zoom} />
        </div>
        <div className="buttonControl">
          <StatusButtons></StatusButtons>
        </div>
        <div className="board-containers">
          <Info information={information} />
        </div>
        {/* <Modal currentCenter={center} /> */}
        <Instructions viewInstructions={viewInstructions} setViewInstructions={setViewInstructions}/>
      </div>

      <div id="button-container">
        <RandomSpot
          setCenter={setCenter}
          setViewCenter={setViewCenter}
          setInformation={setInformation}
          setZoom={setZoom}
        />
      </div>
    </>
  );
}

export default App;
