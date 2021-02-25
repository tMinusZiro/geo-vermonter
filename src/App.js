import "./App.css";
import { useState } from "react";
import Header from "./components/Header.js";
import Map from "./components/Map";
import MovementButtons from "./components/MovementButtons";
import Info from "./components/Info";
import Modal from "./components/Modal";

function App() {
  const [center, setCenter] = useState([43.88, -72.7317]);
  //viewcenter is the current center being viewed
  const [viewCenter, setViewCenter] = useState([43.88, -72.7317]);

  console.log(
    `inside app.js view center is being accessed and is ${viewCenter}`
  );

  return (
    <>
      <Header />
      <div id="map-container">
        <div className="board-containers">
          <MovementButtons
            center={center}
            viewCenter={viewCenter}
            setCenter={setCenter}
            setViewCenter={setViewCenter}
          />
        </div>
        <div className="board-containers">
          <Map center={center} viewCenter={viewCenter} />
        </div>
        <div className="board-containers">
          <Info />
        </div>
        {/* <Modal /> */}
      </div>
    </>
  );
}

export default App;
