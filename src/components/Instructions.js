// instruction component that generates modal to show how to play instructions
function Instructions(props) {
  //toggles to visibility of the instruction model to visible
  function closeInstructions() {
    props.setViewInstructions("hidden");
  }

  return (
    <div
      style={{ visibility: props.viewInstructions }}
      id="instruction-wrapper"
    >
      <div className="instruction-modal">
        <h1>How To Play</h1>
        <h3>Introduction</h3>
        <p>
          Geo-Vermonter is a GEOGUESSER game. In the game you will be placed in
          a random location within Vermont with the goal being to guess which VT
          county you are in.
        </p>
        <h3>Game Play</h3>
        <p>
          To help identify where you are in VT you can pan around the map using
          the navigation buttons. Selecting the center button returns you to the
          starting point. You will not be able to zoom in or out.
        </p>
        <h3>Making a Guess</h3>
        <p>
          When you think you know what county you were placed in you can make a
          guess by clicking the *GUESS* button. Choose the county from the popup
          menu to make your guess. If you guess incorrectly you may guess again
          or return to the map to continue looking around. If you guess
          correctly you have won the game.
        </p>
        <h3>Scoring</h3>
        <p>
          Every game begins with an initial score of 100. Each time you click a
          navigation button, your score will go down by 1 point. The center
          return button will return you to the starting point, with no reduction
          to your score. An incorrect guess reduces your score by 10 points.
        </p>
        <button onClick={closeInstructions}>OK!</button>
      </div>
    </div>
  );
}

export default Instructions;
