import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header.js";
import Map from "./components/Map";
import MovementButtons from "./components/MovementButtons";
import Info from "./components/Info";
import Modal from "./components/Modal";
import RandomSpot from "./components/RandomSpot.js";
import Instructions from "./components/Instructions.js";
import PlayerName from "./components/PlayerName";
import HighScore from "./components/HighScore";

function App() {
  //---------Location State------------//
  //declares variable to set and store the location of the marker[latitude,longitude]
  const [center, setCenter] = useState([43.88, -72.7317]);
  //declares variable to set and store the location of the center of the view box
  const [viewCenter, setViewCenter] = useState([43.88, -72.7317]);
  //declares an array to keep track of users movement from the start point (randomSpot)
  const [pathArray, setPathArray] = useState({ coordinates: [[]] });

  //-----------Nav Bar State--------//
  //declares variable to store and set score
  const [score, setScore] = useState("100");
  //declare variable to show instructions modal
  const [viewInstructions, setViewInstructions] = useState("hidden");
  //High Score state that will save session scores for user
  const [highScore, setHighScore] = useState("");

  //declare state to view highScore modal
  const [viewHighScore, setViewHighScore] = useState("hidden");

  //---------Zoom State---------//
  //declare variable to store and set zoom
  const [zoom, setZoom] = useState(8);

  //----------Modal State-------//
  //declaring variable to show modal
  const [modalDisplay, setModalDisplay] = useState("hidden");

  //-----Name Modal State------//
  //form to collect users name for game session
  const [playerNameDisplay, setPlayerNameDisplay] = useState("hidden");

  //----------Info Box State--------//
  //declares variable to store and set information in info box
  const [information, setInformation] = useState({
    latitude: "???",
    longitude: "???",
    county: "???",
    town: "???",
  });

  //---------Game Record State-------//
  const [moves, setMoves] = useState();
  const [guesses, setGuesses] = useState();
  const [name, setName] = useState();
  const [date, setDate] = useState();

  const [gameRecord, setGameRecord] = useState({});
  console.log('GAME RECORD')
  console.log(gameRecord ? gameRecord : "Loading")
  function updateGameRecord() {
    setGameRecord([{
      name: JSON.parse(localStorage.getItem('name')),
      score: score,
      moves: JSON.parse(localStorage.getItem('Moves')),
      guesses: JSON.parse(localStorage.getItem('Guesses')),
      date: JSON.parse(localStorage.getItem('date')),
    }]);
  }
  function storeGameRecord(arr) {
    localStorage.setItem("gamerecord", JSON.stringify(arr) )
  }

  //updates Game Record
  useEffect(() => {
    updateGameRecord()
    storeGameRecord(gameRecord) 
  },[score])

  // let parseMovesArr = JSON.parse(localStorage.getItem('Moves'))
  // console.log('PARSED MOVES ARRAY')
  // console.log(parseMovesArr)
  
  // let parseGuessesArr = JSON.parse(localStorage.getItem('Guesses'))
  // console.log('PARSED Guesses ARRAY')
  // console.log(parseGuessesArr)
  
  // let parseName = JSON.parse(localStorage.getItem('name'))
  // console.log('PARSED Name ARRAY')
  // console.log(parseName)
  
  // let parseDate = JSON.parse(localStorage.getItem('date'))
  // console.log('PARSED Name ARRAY')
  // console.log(parseDate)



  //We have organized our components inside div containers in the following manner:
  //=> Header: contains the top of page color bar and Title  of application
  //=> MovementButtons: contains the navigation buttons that move the user around the map once started - left side of map
  //=> Map: contains the tiled leaflet map library
  //=> Info: contains the info box on the right of map
  //=> Instructions: contains a pop-up modal that provides useful information about how to play the game
  //=> Modal: contains a pop-up modal when user presses Guess button that provides a choice of all vt counties for user to select from a drop-down form
  //=> Random Spot: contains the three main buttons for the game and the code that generates a random location

  return (
    <>
      <Header
        score={score}
        setViewInstructions={setViewInstructions}
        setViewHighScore={setViewHighScore}
        viewHighScore={setViewHighScore}
      />
      <div id="map-container">
        <div className="board-containers">
          <MovementButtons
            center={center}
            setCenter={setCenter}
            viewCenter={viewCenter}
            setViewCenter={setViewCenter}
            score={score}
            setScore={setScore}
            pathArray={pathArray}
            setPathArray={setPathArray}
            setMoves={setMoves}
          />
        </div>
        <div className="board-containers">
          <Map
            center={center}
            viewCenter={viewCenter}
            zoom={zoom}
            pathArray={pathArray}
          />
        </div>
        <div className="board-containers">
          <Info information={information} />
        </div>
        <Instructions
          viewInstructions={viewInstructions}
          setViewInstructions={setViewInstructions}
        />
        <HighScore
          viewHighScore={viewHighScore}
          setViewHighScore={setViewHighScore}
          score={score}
          date={date}
          setGameRecord={setGameRecord}
        />
        <Modal
          currentCenter={center}
          setInformation={setInformation}
          information={information}
          modalDisplay={modalDisplay}
          setModalDisplay={setModalDisplay}
          score={score}
          setScore={setScore}
          setPlayerNameDisplay={setPlayerNameDisplay}
          playerNameDisplay={playerNameDisplay}
          highScore={highScore}
          setHighScore={setHighScore}
          setGuesses={setGuesses}
          setDate={setDate}
          date={date}
        />
        <PlayerName
          setPlayerNameDisplay={setPlayerNameDisplay}
          playerNameDisplay={playerNameDisplay}
          score={score}
          setScore={setScore}
          setName={setName}
          name={name}
          date={date}
          guesses={guesses}
          moves={moves}
          gameRecord={gameRecord}
          setGameRecord={setGameRecord}
        />
      </div>

      <div id="button-container">
        <RandomSpot
          modalDisplay={modalDisplay}
          setModalDisplay={setModalDisplay}
          setCenter={setCenter}
          setViewCenter={setViewCenter}
          setInformation={setInformation}
          setZoom={setZoom}
          currentCenter={center}
          setPathArray={setPathArray}
          setPlayerNameDisplay={setPlayerNameDisplay}
          playerNameDisplay={playerNameDisplay}
          highScore={highScore}
          setHighScore={setHighScore}
          setDate={setDate}
        />
      </div>
    </>
  );
}

export default App;
