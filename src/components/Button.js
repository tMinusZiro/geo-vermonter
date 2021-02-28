import react from "react";
import { useState, useEffect } from "react";
import Buttons from "./Buttons";

function App() {
  const [buttonState, SetButtonState] = useState(false);
  //const [DisabledButton, setDisabledButton] = useState(false);
  //useEffect(() => setDisabledButton(true), [true]);

  function clickButton() {
    SetButtonState(true);
  }
  return (
    <div id="buttonList">
      <button name="Guess" disabled onclick="event(disabled = false )">
        Guess
      </button>
      <button name="Quit" disabled onclick="event(disabled = false )">
        quit
      </button>
    </div>
  );
}

export default App;
