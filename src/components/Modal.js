import React from "react";
import { useState } from "react";

//---------steps for creating modal display:------------- //
//button is clicked
//modal state changes from falsy to truthy
//=>in the onClick event handler it should accept the showModal function?
//displays popup list for all counties in vermont
//user can click on list and choose a county
//two buttons: guess and cancel
//once county is selected user clicks guess
//if user is correct
//=> take the lat/lon from the county and plug it into a fetch request
//=> from nominatim reverse lookup API
//=> the return will be a json object with the county info in it
//then information in the info box is filled in => county data
//=>take county information and fill the info box places with it
//alerts user that it was a correct guess
//if guess is false then user is alerted and -10 subtracted from point total
//if cancel is clicked no change to score and user can continue to play

//functional component
const Modal = (props) => {
  // const [modalOpen, setModalOpen] = useState(false); //modal display state
  const [submittedCounty, setSubmittedCounty] = useState(""); //state for when guess button is clicked
  const [selectedCounty, setSelectedCounty] = useState({}); //intermediate state for when user selects a county from dropdown but does not submit it yet
  const [countyData, setCountyData] = useState({}); //state for current location of the user in the game

  // Closes our modal when canceled is clicked on
  function closeModal() {
    props.setModalDisplay("hidden");
  }

  //function that toggles the player name modal if user guesses correctly
  function showPlayerNameModal() {
    props.setPlayerNameDisplay("visible");
  }

  //----------Form Event Handlers--------------//

  //guess button handler
  function handleSubmit(e) {
    //preventing page from refreshing when a submit button is triggered
    e.preventDefault();
    //calling function that will check if user selected correctly
    checkWin();
  }

  //every time user selects a county BUT does not yet submit this function gets called
  //we call the fetch function and store that data in countyData state
  //set the synthetic event value to a variable
  function handleChange(e) {
    fetchData();
    //intermediate storage for selected county
    let name = e.target.name;
    //passing in intermediate storage to chosen state

    let currVals = selectedCounty;
    currVals[name] = e.target.value;
    setSelectedCounty(currVals);
    setSubmittedCounty(selectedCounty.county);
  }

  //-----Fetch--------//
  // fetches current location data, that will populate info box using a reverse address lookup API
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

  //---------Check WIN----------//
  //How to use current location of user to determine if they guessed right
  //current location is stored as a props and passed to this components as currentCenter
  //then take that props which contains an array with two numbers: lat/lon
  //plug these two numbers into the url of a fetch request
  //update the state of....data and then tunnel into that json object to get the county the user is in
  //then compare that county to the one the user selected
  //if they match then declare it so and update the info field with relevant data such as lat/lon, town, etc...from json object
  //add points
  //this begins from a click event
  function checkWin() {
    //guard clause for if user clicks guess without selecting a county
    if (submittedCounty !== "") {
      if (
        submittedCounty !==
        countyData.address.county.trim().replace(" County", "").toLowerCase()
      ) {
        alert(`You Guessed Incorrectly`);
        props.setScore(props.score - 10);
      } else {
        props.setInformation({
          latitude: countyData.lat,
          longitude: countyData.lon,
          county: countyData.address.county,
          town: countyData.address.village,
        });
        //updates high score state using the current score
        props.setHighScore(props.score);
        //toggles input name modal to pair with high score
        showPlayerNameModal();
      }
    } else {
      alert(`Please Choose a County`);
    }
  }

  return (
    <div style={{ visibility: props.modalDisplay }} id="modal-wrapper">
      <div>
        <div className="modal">
          <h1>Choose The County</h1>
          <form onSubmit={handleSubmit}>
            <div id="select-wrapper">
              <select
                name="county"
                value={selectedCounty.county}
                onChange={handleChange}
              >
                <option value="please choose a county">
                  --Please Choose a County--
                </option>
                <option value="grand isle">Grand Isle</option>
                <option value="franklin">Franklin</option>
                <option value="orleans">Orleans</option>
                <option value="essex">Essex</option>
                <option value="caledonia">Caledonia</option>
                <option value="lamoille">Lamoille</option>
                <option value="chittenden">Chittenden</option>
                <option value="washington">Washington</option>
                <option value="addison">Addison</option>
                <option value="orange">Orange</option>
                <option value="rutland">Rutland</option>
                <option value="windsor">Windsor</option>
                <option value="bennington">Bennington</option>
                <option value="windham">Windham</option>
              </select>
            </div>
            <input id="modal-submit" type="submit" value="Guess" />
            {/* <button className="fetch-button" onClick={fetchData}>
              Fetch Current County
            </button> */}
          </form>
          <button className="modal-cancel" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
