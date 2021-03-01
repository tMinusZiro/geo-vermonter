import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  Polyline,
} from "react-leaflet";
import borderData from "../data/border";
import AdjustMap from "./AdjustMap.js";

// map component contains the amp and related styling
function Map(props) {
  //takes the longitutde and latitude from borderData and switches it to latitude then longitude
  let vtOutline = borderData.geometry.coordinates[0].map((coords) => [
    coords[1],
    coords[0],
  ]);

  // declares an array to store to and from coordinates as quadruples pulled from pathArray
  let polylineCoordinates = [];

  // declares a counter variable for iteration.  We start at 1 instead of 0 because we only want to iterate through patharray if there are at least 2 elements
  let i = 1;

  // iterate through pathArray and generate quadruples, one for each breadcrumb path
  while (i < props.pathArray.coordinates[0].length) {
    //each quadruple takes the lat and long from the previous element in patharray, and lat long from the current element
    polylineCoordinates.push([
      props.pathArray.coordinates[0][i - 1][0],
      props.pathArray.coordinates[0][i - 1][1],
      props.pathArray.coordinates[0][i][0],
      props.pathArray.coordinates[0][i][1],
    ]);
    i += 1;
  }

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
        {/* for each quadrule in polyline coordiantes, create a path */}
        {polylineCoordinates.map((item) => {
          return (
            <Polyline
              positions={[
                [item[0], item[1]],
                [item[2], item[3]],
              ]}
            />
          );
        })}
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
