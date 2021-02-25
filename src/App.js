import "./App.css";
import { useState } from "react";
import Header from "./components/Header.js";
import Map from "./components/Map";
import MovementButtons from "./components/MovementButtons";

function App() {
  const [center, setCenter] = useState([43.88, -72.7317]);
  //viewcenter is the current center being viewed
  const [viewCenter, setViewCenter] = useState([43.88, -72.7317]);

  console.log(`insde app.js view center is being accessed and is ${viewCenter}`)

  return (
    <>
      <Header />
      <div id="map-container">
        <Map center={center} viewCenter={viewCenter}/>
        <MovementButtons center={center} viewCenter={viewCenter} setCenter={setCenter} setViewCenter={setViewCenter}/>
      </div>
    </>
  );
}

export default App;
