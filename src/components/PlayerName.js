import React, { useEffect } from "react";
import { useState } from "react";

const PlayerName = (props) => {
  function updateNameState() {
    localStorage.setItem("name", JSON.stringify(props.name));
  }



  //stores synthetic event -user name- in local storage
  // useEffect(() => {
  //   localStorage.setItem("name", name);
  //   console.log(`Stored Name: ${name}`);
  //   const retrieveName = localStorage.getItem("name");
  //   console.log(`Stored Name Object: ${retrieveName}`);
  // }, [name]);

  //----Event Handler----//
  //synthetic event value on input
  const onChange = (e) => props.setName(e.target.value);

  //div container handles toggle visible/hidden
  //the rest is modal title and an input for collecting user name to send to highscore list
  //basic validation in onClick that won't let user play again until name is submitted
  return (
    <div
      style={{ visibility: props.playerNameDisplay }}
      id="playerName-wrapper"
    >
      <div id="player-name-modal">
        <h1>Enter Name</h1>
        <h2>For High Score List</h2>
        <input
          id="name-input"
          value={props.name}
          placeholder={"Name"}
          type="text"
          onChange={onChange}
        />
        <button
          id="play-again"
          onClick={() => {
            if (!props.name) {
              alert(`Please Enter Your Name First`);
            } else if (props.name) {
              updateNameState();
      
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            }
          }}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default PlayerName;
