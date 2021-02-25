import React from "react";
import { useState } from "react";

const Modal = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  function showModal() {
    setModalOpen(true);
  }

  return (
    <div id="modal-wrapper">
      <div>{!modalOpen ? <div className="modal">{showModal}</div> : null}</div>
    </div>
  );
};

export default Modal;
