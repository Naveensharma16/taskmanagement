import React, { useContext, useEffect, useRef, useState } from "react";
import boardscontext from "../context/boardscontext";

import close from "../assets/close.png";
import useEscEnter from "../customhooks/useEscEnter";

import remove from "../assets/delete.png";

export default function UpdateTaskModal({
  id,
  showUpdateModel,
  setShowUpdateModel,
}) {
  const [updateTaskInfo, setupdateTaskInfo] = useState({
    statusid: "",
  });

  const Taksboard = useContext(boardscontext);

  const { updateTask, deleteTask, taskStatus, tasks, currentBoard } = Taksboard;

  const statusref = useRef();

  // function to update the task data we can only change id and not context
  function handleUpdateTask() {
    updateTask({ taskid: id, updatedData: updateTaskInfo });
  }

  // function to delete the task
  const handleDeleteTask = () => {
    deleteTask(id);
  };

  //  function to close the popup for adding task
  function handleCloseUpdateModal() {
    setShowUpdateModel(!showUpdateModel);
  }

  // calling custom hook for esc and enter keys and passing function we want to call on particular key press
  // esc will call handleCloseUpdateModal and enter will call handleUpdateTask
  useEscEnter({
    handleAdd: handleUpdateTask,
    handleClose: handleCloseUpdateModal,
  });

  useEffect(() => {
    if (!updateTaskInfo.statusid) {
      updateTaskInfo.statusid
        ? ""
        : setupdateTaskInfo({
            ...updateTaskInfo,
            statusid: statusref.current[0].value,
          });
    }
  }, []);

  return (
    <div className="modal-container">
      <div className="add-board-form-container">
        {tasks &&
          tasks
            .filter((item) => item.id === id)
            // eslint-disable-next-line array-callback-return
            .map((item) => (
              <div key={item.id}>
                <div>
                  <p>{item.task}</p>
                  <button
                    type="button"
                    onClick={handleDeleteTask}
                    className="remove-task cursor"
                  >
                    <img src={remove} alt="" />
                  </button>
                </div>
                <div className="">
                  <span>{item.description}</span>
                </div>
                <select
                  name=""
                  id=""
                  value={updateTaskInfo.statusid}
                  onChange={(event) =>
                    setupdateTaskInfo({
                      ...updateTaskInfo,
                      statusid: event.target.value,
                    })
                  }
                  ref={statusref}
                >
                  {taskStatus
                    .filter((item) => item.board.id === currentBoard.id)
                    .map((item) => (
                      <option key={item.id} value={item.id} selected>
                        {item.name}
                      </option>
                    ))}
                </select>

                <button
                  type="button"
                  onClick={handleUpdateTask}
                  className="add-item cursor"
                >
                  update
                </button>

                <button
                  type="button"
                  onClick={handleCloseUpdateModal}
                  className="close-modal cursor"
                >
                  <img src={close} alt="" />
                </button>
              </div>
            ))}
      </div>
    </div>
  );
}
