import React, { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { ToastContainer, toast } from "react-toastify";
import boardscontext from "../context/boardscontext";
import NewTaskModal from "../modal/NewTaskModal";

import "react-toastify/dist/ReactToastify.css";
import "./layout.scss";

export default function Header() {
  // state to show or hide popup
  const [showModal, setShowModal] = useState(false);
  // getting the context use to store board state
  const Taksboard = useContext(boardscontext);
  //  destructuring the context to get info we want
  const { taskStatus, currentBoard } = Taksboard;

  // function to open or close popup for adding task
  const handleShowAddPopup = () => {
    const status = taskStatus.filter(
      (item) => item.board.id === currentBoard.id
    );
    // check if there are any columns added if not show toast if added change modal state
    if (!status.length) {
      toast("please add a column first", { type: "error" });
    } else {
      setShowModal(!showModal);
    }
  };

  return (
    <>
      <header className="app-header-container flex-layout">
        <div className="current-board-name">
          <h2>{currentBoard && currentBoard?.name}</h2>
        </div>
        <div className="add-new-task">
          <button type="button" onClick={handleShowAddPopup} className="cursor">
            + add new task
          </button>
        </div>
      </header>
      <ToastContainer />
      {/* portal for adding task popup  */}
      {showModal &&
        createPortal(
          <NewTaskModal showModal={showModal} setShowModal={setShowModal} />,
          document.body
        )}
      {/* portal for adding task popup  */}
    </>
  );
}
