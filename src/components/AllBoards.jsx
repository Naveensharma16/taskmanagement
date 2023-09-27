import React, { useContext } from "react";

import boardscontext from "../context/boardscontext";

import remove from "../assets/delete.png";
import clipboard from "../assets/clipboard.png";

import "./component.scss";

export default function AllBoards() {
  const Taksboard = useContext(boardscontext);
  // destructuring the context value we are using
  const {
    deleteBoard,
    setCurrentBoard,
    boards: boardlist,
    currentBoard,
  } = Taksboard;

  //  function to delete the board from context whose id is passed as argument
  const handleDeleteBoard = (id, e) => {
    e.stopPropagation();
    deleteBoard(id);
  };

  // function to set the current board in context
  const handleSetCurrentBoard = (id) => {
    setCurrentBoard(id);
  };

  return (
    <div className="board-list-container">
      <ul>
        {/* checking if there is any elemet in board list if found loop through them using map */}
        {!!boardlist.length &&
          boardlist.map((board) => (
            <li
              key={board.id}
              onClick={() => handleSetCurrentBoard(board.id)}
              aria-hidden="true"
              className={
                board.id === currentBoard.id
                  ? "cursor flex-layout active"
                  : "cursor flex-layout"
              }
            >
              <img src={clipboard} alt="" />
              <span>{board.name}</span>
              <button
                type="button"
                onClick={(e) => handleDeleteBoard(board.id, e)}
              >
                <img src={remove} alt="" className="cursor" />
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
