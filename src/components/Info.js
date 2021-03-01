import React from "react";

// info component contains information panel with include lat/long/county and town
const Info = (props) => {

  return (
    <div id="info-wrapper">
      <h2 id="info">Information</h2>
      <div>
        <h4>Latitude</h4>
        <p>{props.information.latitude}</p>
      </div>
      <div>
        <h4>Longitude</h4>
        <p>{props.information.longitude}</p>
      </div>
      <div>
        <h4>County</h4>
        <p>{props.information.county}</p>
      </div>
      <div>
        <h4>Town</h4>
        <p>{props.information.town}</p>
      </div>
    </div>
  );
};

export default Info;
