import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  Polyline,
} from "react-leaflet";
import borderData from "../data/border";
import { useRef, useEffect } from "react";
import L from "leaflet";
import AdjustMap from "./AdjustMap.js";

// map component contains the amp and related styling
function Map(props) {
  //takes the longitutde and latitude from borderData and switches it to latitude then longitude
  let vtOutline = borderData.geometry.coordinates[0].map((coords) => [
    coords[1],
    coords[0],
  ]);

  // const saniPolyLine = (array) => {
  //   let counter = 0;

  //   let newArray = [];
  //   while (counter < array.length) {
  //     newArray = [...newArray, array.slice(counter, counter + 2)];
  //     counter += 2;
  //   }
  //   console.log(`new array: ${newArray}`);
  //   // console.log(`path array: ${props.pathArray}`);

  //   return newArray;
  // };

  // let breadCrumbLine = saniPolyLine(props.pathArray.coordinates);

  //zoom & drag functionalities are disabled on the map to limit user interaction
  return (
    <>
      <MapContainer
        center={props.center}
        zoom={8}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        zoomControl={false}
        touchZoom={false}
        dragging={false}
        style={{ height: "600px", width: "600px" }}
      >
        {/* allows adjustment of the map center and zoom properties */}
        <AdjustMap center={props.viewCenter} zoom={props.zoom} />
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        />
        <Polyline positions={props.pathArray} />
        <Marker position={props.center} />
        <Polygon
          positions={vtOutline}
          pathOptions={{ color: "orange", fillOpacity: 0 }}
        />
      </MapContainer>
    </>
  );
}

export default Map;
