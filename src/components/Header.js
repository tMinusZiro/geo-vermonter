import NavBar from "./NavBar.js";

// Header component containing name of game and navigation bar
function Header(props) {
  return (
    <header id="header">
      <h1>Geo-Vermonter</h1>
      <NavBar score={props.score} setViewHowToPlay={props.setViewHowToPlay}/>
    </header>
  );
}

export default Header;
