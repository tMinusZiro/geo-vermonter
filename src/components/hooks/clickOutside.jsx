import { useEffect } from "react";
import React from "react";

//custom hook for closing modals outside when clicking outside it
export const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      //check to see if current element is close button or contains close button like highscore component
      //if true then return and nothing happens => menu will still close if
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    //cleanup
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};
