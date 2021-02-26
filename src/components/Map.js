import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  Polyline,
  useMap
} from "react-leaflet";
import borderData from "../data/border";
import { useRef, useEffect } from "react";
import L from "leaflet";

// map component contains the amp and related styling
function Map(props) {
  //takes the longitutde and latitude from borderData and switches it to latitude then longitude
  let vtOutline = borderData.geometry.coordinates[0].map((coords) => [
    coords[1],
    coords[0],
  ]);

  //------------------------------------------------------trying to figure out moving map --------------------------------------------//
  // //declare variable to constant to hold map reference
  // const mapRef = useRef();
  // console.log(`mapRef is ${mapRef}`)
  console.log(`map container is ${MapContainer}`);
  // const map = useMap();
  // console.log(map)

  //------------------------------------------------------trying to figure out moving map --------------------------------------------//

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
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        />
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
