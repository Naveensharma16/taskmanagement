import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import boardscontext from "../context/boardscontext";

import close from "../assets/close.png";
import useEscEnter from "../customhooks/useEscEnter";

import "react-toastify/dist/ReactToastify.css";

export default function NewTaskModal({ showModal, setShowModal }) {
  const [newTaskInfo, setNewTaskInfo] = useState({
    task: "",
    description: "",
    statusid: "",
  });

  // getting the context
  const Taksboard = useContext(boardscontext);
  // destructuring the taskboard context to get data we need in component
  const { currentBoard, addTask, taskStatus } = Taksboard;

  const statusref = useRef();

  useEffect(() => {
    if (!newTaskInfo.statusid) {
      // eslint-disable-next-line no-unused-expressions
      newTaskInfo.statusid
        ? ""
        : setNewTaskInfo({
            ...newTaskInfo,
            statusid: statusref?.current[0]?.value,
          });
    }
  }, []);

  //  function to add a task in a column
  function handleAddTask() {
    const id = uuidv4();
    // if all data not given show a toast to user
    if (
      newTaskInfo.task === "" ||
      newTaskInfo.description === "" ||
      newTaskInfo.statusid === ""
    ) {
      toast("please fill all field", { type: "error" });
    } else {
      const task = {
        id,
        ...newTaskInfo,
        boardid: currentBoard.id,
      };
      // adding task to the context
      addTask(task);
    }

    // empty the task state
    setNewTaskInfo({
      task: "",
      description: "",
      statusid: "",
    });
  }

  // function to close the modal popup for adding a task in column
  function handleCloseTaskModal() {
    setShowModal(!showModal);
  }

  // calling custom hook for esc and enter keys and passing function we want to call on particular key press
  // esc will call handleCloseStatus and enter will call handleAddStatus
  useEscEnter({
    handleAdd: handleAddTask,
    handleClose: handleCloseTaskModal,
  });

  return (
    <div className="modal-container">
      <div className="add-board-form-container">
        <p>Create New Task</p>
        <span>Title</span>
        <input
          type="text"
          name=""
          id=""
          value={newTaskInfo.task}
          onChange={(event) =>
            setNewTaskInfo({ ...newTaskInfo, task: event.target.value })
          }
        />
        <span>Description</span>
        <textarea
          cols="30"
          rows="10"
          value={newTaskInfo.description}
          onChange={(event) =>
            setNewTaskInfo({ ...newTaskInfo, description: event.target.value })
          }
        />
        <span>Status</span>
        <select
          name=""
          id=""
          value={newTaskInfo.statusid}
          onChange={(event) =>
            setNewTaskInfo({ ...newTaskInfo, statusid: event.target.value })
          }
          ref={statusref}
        >
          {taskStatus
            .filter((item) => item.board.id === currentBoard.id)
            .map((item) => (
              <option value={item.id} selected>
                {item.name}
              </option>
            ))}
        </select>

        <button type="button" onClick={handleAddTask} className="add-item">
          create
        </button>
        <button
          type="button"
          onClick={handleCloseTaskModal}
          className="close-modal"
        >
          <img src={close} alt="" />
        </button>
      </div>
    </div>
  );
}
