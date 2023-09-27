import React, { useState } from "react";
import Logo from "../components/Logo";
import AllBoards from "../components/AllBoards";
import CreateNewBoard from "../components/CreateNewBoard";
// import ThemeToggle from "../components/ThemeToggle";

export default function Sidebar() {
  // state to show or hide modal popup for adding new board
  const [showNewBoardModal, setShowNewBoardModal] = useState(false);
  return (
    <div className="sidebar-container">
      {/* component for logo */}
      <Logo />
      {/* component for all the boards  */}
      <AllBoards />
      {/* state passed as props */}
      <CreateNewBoard
        showBoard={showNewBoardModal}
        setShowBoard={setShowNewBoardModal}
      />
      {/* <ThemeToggle /> */}
    </div>
  );
}
