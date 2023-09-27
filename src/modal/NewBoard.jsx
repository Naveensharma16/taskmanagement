import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import boardscontext from "../context/boardscontext";

import close from "../assets/close.png";
import useEscEnter from "../customhooks/useEscEnter";

import "./modal.scss";

// eslint-disable-next-line react/prop-types
export default function NewBoard({ showBoard, setShowBoard }) {
  // state to hold board name
  const [newBoard, setNewBoard] = useState();
  const Taksboard = useContext(boardscontext);

  // context function to add a new board in context
  const { addBoard } = Taksboard;

  // function to add a new board in contxt
  // it create a id using uuid and assign a object(id an board name )
  function handleAddNewBoard() {
    const id = uuidv4();
    // if data in newboard state add it into context
    if (newBoard) {
      addBoard({ id, name: newBoard });
      setNewBoard("");
    }
  }

  // function to close the board popup we can also use false here as value
  function handleCloseBoard() {
    setShowBoard(!showBoard);
  }

  // calling custom hook for esc and enter keys and passing function we want to call on particular key press
  // esc will call handleCloseBoard and enter will call handleAddNewBoard
  useEscEnter({
    handleAdd: handleAddNewBoard,
    handleClose: handleCloseBoard,
  });

  return (
    <div className="modal-container">
      <div className="add-board-form-container">
        <p>Create a Board</p>
        <span>Title</span>
        <input
          type="text"
          value={newBoard}
          onChange={(event) => setNewBoard(event.target.value)}
        />
        <button
          type="button"
          onClick={handleAddNewBoard}
          className="add-item cursor"
        >
          Create
        </button>
        <button
          type="button"
          onClick={handleCloseBoard}
          className="close-modal cursor"
        >
          <img src={close} alt="" />
        </button>
      </div>
    </div>
  );
}
