import { useMap } from "react-leaflet";

function AdjustMap(props) {
  //MapContainer props cannot be mutated, AdjustMap allows adjustment of the
  const map = useMap();
  map.setView(props.center, props.zoom);
  return null;
}

export default AdjustMap;
