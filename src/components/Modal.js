import React from "react";
import { useState, useEffect } from "react";

//steps for creating modal display:
//button is clicked
//=>assume it is clicked for now
//modal state changes from falsy to truthy
//=>in the onClick event handler it should accept the showModal function?
//displays popup list for all counties in vermont
//=>need array of objects with county and associated lat/lon
//user can click on list and choose a county
//two buttons: guess and cancel
//once county is selected user clicks guess
//if user is correct
//=> I take the lat/lon from the county and plug it into a fetch request
//=> from nominatim reverse lookup API
//=> the return will be a json object with the county info in it
//then information in the info box is filled in => county data
//=>take county information and fill the info box places with it
//alerts user that it was a correct guess
//if guess is false then user is alerted and -10 subtracted from point total
//if cancel is clicked no change to score and user can continue to play

const Modal = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [chosen, setChosen] = useState(null);
  const [selected, setSelected] = useState({});
  const [countyData, setCountyData] = useState(null);

  function showModal() {
    setModalOpen(true);
  }

  //How to use current location of user to determine if they guessed right
  //current location is stored as a props and passed to this components as currentCenter
  //then take that props which contains an array with two numbers: lat/lon
  //plug these two numbers into the url of a fetch request
  //update the state of....data and then map that json object to get the county the current location is in
  //then compare that county to the one the user selected
  //if they match then declare it so and update the info field with relevant data such as county etc...from json object
  //add points
  //this begins from a click event

  //onChange Event Handler
  function handleSubmit(e) {
    //synthetic event as argument
    e.preventDefault();

    setChosen({
      county: selected.county,
    });

    console.log(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${props.currentCenter[0]}&lon=${props.currentCenter[1]}`
    );
  }

  function handleChange(e) {
    let name = e.target.name;
    let currVal = selected;
    console.log("from change handler");
    currVal[name] = e.target.value;
    setSelected(currVal);
  }

  //fetch inside
  const fetchData = async () => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${props.currentCenter[0]}&lon=${props.currentCenter[1]}`
    )
      .then((res) => res.json())
      .then((jsonObj) => {
        setCountyData(
          jsonObj.address.county.replace(" County", "").toLowerCase()
        );
        console.log(` Data = ${countyData}`);
      });
  };

  //.catch((err) => {
  //   alert('Something went wrong...')
  //   console.error(err.message)
  // })

  return (
    <div id="modal-wrapper">
      <div>
        <div className="modal">
          <h1>Choose The County</h1>
          <h4> {countyData}</h4>

          <form onSubmit={handleSubmit}>
            <select
              name="county"
              value={selected.counties}
              onChange={handleChange}
            >
              <option value={"Grand Isle"}>Grand Isle</option>
              <option value={"franklin"}>Franklin</option>
              <option value={"orleans"}>Orleans</option>
              <option value={"essex"}>Essex</option>
              <option value={"caledonia"}>Caledonia</option>
              <option value={"lamoille"}>Lamoille</option>
              <option value={"chittenden"}>Chittenden</option>
              <option value={"washington"}>Washington</option>
              <option value="addison">Addison</option>
              <option value="orange">Orange</option>
              <option value={"rutland"}>Rutland</option>
              <option value={"windsor"}>Windsor</option>
              <option value={"bennington"}>Bennington</option>
              <option value={"windham"}>Windham</option>
            </select>
            <input type="submit" />
            <button className="fetch-button" onClick={fetchData}>
              Fetch Current County
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
