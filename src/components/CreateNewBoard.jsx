/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { createPortal } from "react-dom";
import NewBoard from "../modal/NewBoard";

import clipboardblue from "../assets/clipboardblue.png";

export default function CreateNewBoard({ showBoard, setShowBoard }) {
  return (
    <>
      <button
        type="button"
        onClick={() => setShowBoard(!showBoard)}
        className="add-new-board cursor flex-layout"
      >
        <img src={clipboardblue} alt="" />
        create new board
      </button>
      {/* portal for new board popup */}
      {showBoard &&
        createPortal(
          <NewBoard showBoard={showBoard} setShowBoard={setShowBoard} />,
          document.body
        )}
      {/* portal for new board popup */}
    </>
  );
}
