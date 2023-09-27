import React, { useMemo, useReducer } from "react";
import boardscontext from "../context/boardscontext";

// eslint-disable-next-line react/prop-types
export default function BoardsProvider({ children }) {
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_BOARD": {
        // eslint-disable-next-line no-case-declarations
        let updatedCurrentBoard = {};
        if (state.boards.length === 0) {
          updatedCurrentBoard = action.payload;
        } else {
          updatedCurrentBoard = state.currentBoard;
        }
        return {
          ...state,
          boards: [...state.boards, action.payload],
          currentBoard: updatedCurrentBoard,
        };
      }
      case "DELETE_BOARD": {
        const filteredboards = state.boards.filter(
          (singleboard) => singleboard.id !== action.payload
        );
        const filteredTaskStatus = state.taskStatus.filter(
          (item) => item.board.id !== action.payload
        );
        const filteredTasks = state.tasks.filter(
          (item) => item.boardid !== action.payload
        );
        let updatedCurrentBoard = {};
        if (state.currentBoard.id === action.payload) {
          // eslint-disable-next-line no-unused-expressions
          filteredboards.length > 0
            ? // TODO: destructuring
              (updatedCurrentBoard = filteredboards[0])
            : "";
        } else {
          updatedCurrentBoard = state.currentBoard;
        }
        return {
          ...state,
          boards: filteredboards,
          taskStatus: filteredTaskStatus,
          tasks: filteredTasks,
          currentBoard: updatedCurrentBoard,
        };
      }
      case "SET_CURRENT_BOARD": {
        const current = state.boards.filter(
          (singleboard) => singleboard.id === action.payload
        );
        return {
          ...state,
          currentBoard: current[0],
        };
      }
      case "ADD_TASK_STATUS":
        return {
          ...state,
          taskStatus: [...state.taskStatus, action.payload],
        };
      case "DELETE_TASK_STATUS": {
        const filteredTaskStatus = state.taskStatus.filter(
          (item) => item.id !== action.payload
        );
        const filteredTasks = state.tasks.filter(
          (item) => item.statusid !== action.payload
        );
        return {
          ...state,
          tasks: filteredTasks,
          taskStatus: filteredTaskStatus,
        };
      }
      case "ADD_TASK":
        return {
          ...state,
          tasks: [...state.tasks, action.payload],
        };
      case "UPDATE_TASK": {
        const updateTask = state.tasks.map((task) => {
          if (task.id === action.payload.taskid) {
            return { ...task, ...action.payload.updatedData };
          }
          return task;
        });
        return {
          ...state,
          tasks: updateTask,
        };
      }
      case "DELETE_TASK": {
        const filteredTask = state.tasks.filter(
          (task) => task.id !== action.payload
        );
        return {
          ...state,
          tasks: filteredTask,
        };
      }
      case "DRAGGING": {
        return {
          ...state,
          dragging: action.payload,
        };
      }
      default:
        return state;
    }
  };

  const initialvalue = {
    boards: [],
    taskStatus: [],
    tasks: [],
    currentBoard: {},
    dragging: false,
  };

  const [taskData, dispatch] = useReducer(reducer, initialvalue);

  const d = useMemo(
    () => ({
      boards: taskData.boards,
      currentBoard: taskData.currentBoard,
      taskStatus: taskData.taskStatus,
      tasks: taskData.tasks,
      dragging: taskData.dragging,
      addBoard: (newboard) =>
        dispatch({ type: "ADD_BOARD", payload: newboard }),
      deleteBoard: (id) => dispatch({ type: "DELETE_BOARD", payload: id }),
      setCurrentBoard: (id) =>
        dispatch({ type: "SET_CURRENT_BOARD", payload: id }),
      addTaskStatus: (newStatus) =>
        dispatch({ type: "ADD_TASK_STATUS", payload: newStatus }),
      deleteTaskStatus: (id) =>
        dispatch({ type: "DELETE_TASK_STATUS", payload: id }),
      addTask: (newtask) => dispatch({ type: "ADD_TASK", payload: newtask }),
      updateTask: (updatetask) =>
        dispatch({ type: "UPDATE_TASK", payload: updatetask }),
      deleteTask: (taskid) =>
        dispatch({ type: "DELETE_TASK", payload: taskid }),
      setDragging: (status) => dispatch({ type: "DRAGGING", payload: status }),
    }),
    [taskData]
  );
  return <boardscontext.Provider value={d}>{children}</boardscontext.Provider>;
}
