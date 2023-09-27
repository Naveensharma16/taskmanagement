import React from "react";
import "./App.css";
import Home from "./Pages/Home";
import "./sass/style.scss";
import BoardsProvider from "./provider/BoardsProvider";

function App() {
  return (
    <BoardsProvider>
      <Home />
    </BoardsProvider>
  );
}

export default App;
