import NavBar from "./NavBar.js";

// Header component containing name of game and navigation bar
function Header(props) {
  return (
    <header id="header">
      <h1>Geo-Vermonter</h1>
      <NavBar score={props.score} setViewInstructions={props.setViewInstructions}/>
    </header>
  );
}

export default Header;