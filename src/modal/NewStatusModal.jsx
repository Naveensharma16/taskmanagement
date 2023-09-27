import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import boardscontext from "../context/boardscontext";

import close from "../assets/close.png";
import useEscEnter from "../customhooks/useEscEnter";

export default function NewStatusModal({ show, setShow }) {
  const [statusName, setStatusName] = useState();
  const currentboard = useContext(boardscontext);

  // function to add new column in the current board
  function handleAddStatus() {
    const id = uuidv4();
    // object have id name for column and the board it is defined in (i.e current board)
    const taskStatusToAdd = {
      id,
      name: statusName,
      board: currentboard.currentBoard,
    };
    currentboard.addTaskStatus(taskStatusToAdd);
    setStatusName("");
  }

  // function to close the popup modal for new column
  function handleCloseStatus() {
    setShow(!show);
  }

  // calling custom hook for esc and enter keys and passing function we want to call on particular key press
  // esc will call handleCloseStatus and enter will call handleAddStatus
  useEscEnter({
    handleAdd: handleAddStatus,
    handleClose: handleCloseStatus,
  });

  return (
    <div className="modal-container">
      <div className="add-board-form-container">
        <p>Create New column</p>
        <span>Title</span>
        <input
          type="text"
          value={statusName}
          onChange={(event) => setStatusName(event.target.value)}
        />
        <button type="submit" onClick={handleAddStatus} className="add-item">
          Create
        </button>
        <button
          type="button"
          onClick={handleCloseStatus}
          className="close-modal"
        >
          <img src={close} alt="" />
        </button>
      </div>
    </div>
  );
}
