import react from "react";
import {useState, useEffect} from "react"

function StatusButtons(props) {
  const [disabledButton, setDisabledButton] = useState(false)  
  useEffect(() => setDisabledButton(true), [true])
  return (
    <div>
      <button name="start" onclick= {setDisabledButton}>
        start
      </button>

      <button name="Guess" disabled onclick="event( )">
        Guess
      </button>

      <button name="Quit" disabled onclick="event( )">
        quit
      </button>
    </div>
  );
}
export default StatusButtons;
