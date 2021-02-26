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
  const [submittedCounty, setSubmittedCounty] = useState("");
  const [selectedCounty, setSelectedCounty] = useState({});
  const [countyData, setCountyData] = useState({});

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
  console.log(` Submitted County is outside: ${submittedCounty}`);

  //onChange Event Handler
  function handleSubmit(e) {
    //synthetic event as argument
    e.preventDefault();
    //calling function that will check if user selected correctly
    checkWin();
    // console.log(
    //   `https://nominatim.openstreetmap.org/reverse?format=json&lat=${props.currentCenter[0]}&lon=${props.currentCenter[1]}`
    // );
  }

  //lot to unpack here
  //every time user selects a county BUT does not yet submit this function gets called
  //we call the fetch function and store that data in countyData state
  //set the e.target.value to a variable
  function handleChange(e) {
    fetchData();
    //intermediate storage for selected county
    let name = e.target.name;
    //passing in intermediate storage to chosen state
    let currVals = selectedCounty;
    currVals[name] = e.target.value;
    console.log(` Target Value: ${e.target.value}`);
    setSelectedCounty(currVals);
    setSubmittedCounty(selectedCounty.county);
    console.log(selectedCounty);
  }

  //fetch inside
  const fetchData = async () => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${props.currentCenter[0]}&lon=${props.currentCenter[1]}`
    )
      .then((res) => res.json())
      .then((jsonObj) => {
        //calling the countData change function and assigning the state to the current location json object containing useful location info
        setCountyData(jsonObj);
      });
  };

  function checkWin() {
    //tunneling into the currentlocation json and logging out the relavent info
    console.log(`Fetch Data is: ${countyData}`);
    console.log(`Fetch lat: ${countyData.lat}`);
    console.log(`Fetch lat: ${countyData.lon}`);
    console.log(
      ` You are in = ${countyData.address.county
        .replace(" County", "")
        .toLowerCase()}`
    );
    console.log(submittedCounty);
    //conditional checking if the user selected the truthy county by checking it against the current location
    if (submittedCounty !== countyData.address.county) {
      alert(`You Guessed Incorrectly`);
    } else {
      alert(`You Guessed Correctly`);
    }
  }

  //.catch((err) => {
  //   alert('Something went wrong...')
  //   console.error(err.message)
  // })

  return (
    <div id="modal-wrapper">
      <div>
        <div className="modal">
          <h1>Choose The County</h1>

          <form onSubmit={handleSubmit}>
            <select
              name="county"
              value={selectedCounty.county}
              onChange={handleChange}
            >
              <option value="">--Please Choose a County--</option>
              <option value={"grand isle"}>Grand Isle</option>
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
            <input type="submit" value="submit" />
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
