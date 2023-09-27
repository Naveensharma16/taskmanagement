import React, { useContext, useEffect, useRef, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import boardscontext from "../context/boardscontext";
import SingleTask from "./SingleTask";

import remove from "../assets/delete.png";

// eslint-disable-next-line react/prop-types
export default function TaskStatus({ statusName, id }) {
  // gettiing the context
  const Taksboard = useContext(boardscontext);
  // desctructuring the context data that we need (all tasks ,current board and delete a task from column)
  const { tasks, currentBoard, deleteTaskStatus } = Taksboard;
  // state to hold the filtered tasks
  const [singleStatusTasks, setSingleStatusTasks] = useState([]);

  // ref hook for color
  const colorref = useRef(null);

  // effect creted to set a random color
  useEffect(() => {
    const generateRandomColor = () => {
      // 3 random generated numbers for color in hsl
      const first = Math.floor(Math.random() * 255);
      const second = Math.floor(Math.random() * 255);
      const third = Math.floor(Math.random() * 255);
      // setting color of the span using ref hook
      colorref.current.style.backgroundColor = `rgb(${first},${second},${third})`;
    };
    generateRandomColor();
  }, []);

  // effect used to filter the particular board task according to board id and in which column it should be show
  // update whenever a new task is added
  useEffect(() => {
    const getTasks = () => {
      const tempTaskHolder = tasks.filter(
        (item) => item.boardid === currentBoard.id && item.statusid === id
      );
      setSingleStatusTasks(tempTaskHolder);
    };
    getTasks();
  }, [tasks]);

  return (
    <div className="task-status-box">
      <h3>
        <span className="color-circle" ref={colorref} /> {statusName} (
        {singleStatusTasks.length})
      </h3>
      <div className="task-list">
        <Droppable droppableId={id}>
          {(provided) =>
            tasks && (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="droppable-zone"
              >
                {/* TODO: make a droppable zone box when user drag */}
                {/* {dragging === true ? (
                  <div className="droppable-zone-box">Drop Here</div>
                ) : (
                  ""
                )} */}
                {/* // <div className="droppable-zone-box">Drop Here</div> */}
                {singleStatusTasks.map((item, index) => (
                  <SingleTask
                    key={item.id}
                    task={item.task}
                    id={item.id}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </div>
            )
          }
        </Droppable>
      </div>

      <button
        type="button"
        onClick={() => deleteTaskStatus(id)}
        className="cursor"
      >
        <img src={remove} alt="" />
      </button>
    </div>
  );
}
