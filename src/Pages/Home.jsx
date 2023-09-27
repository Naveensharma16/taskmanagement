import React, { useContext } from "react";
import "./home.scss";
import { DragDropContext } from "react-beautiful-dnd";
import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header";
import CreateNewStatus from "../components/CreateNewStatus";
import boardscontext from "../context/boardscontext";
import TaskStatus from "../components/TaskStatus";

export default function Home() {
  const Taksboard = useContext(boardscontext);
  // destructuring context
  const { updateTask, boards, taskStatus, currentBoard } = Taksboard;

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    updateTask({
      taskid: draggableId,
      updatedData: { statusid: destination.droppableId },
    });

    // setDragging(false);
  };

  // const onDragStart = () => {
  //   setDragging(true);
  // };

  return (
    <>
      <Header />
      <DragDropContext onDragEnd={onDragEnd}>
        <section className="home-container">
          <section className="boards-menu">
            <Sidebar />
          </section>

          {/* checking here if any board is added or not */}
          <main className="board-main-content-container">
            {boards.length > 0 ? (
              <section className="site-main-content">
                <div className="board-status-holder flex-layout">
                  {taskStatus &&
                    taskStatus
                      .filter((item) => item.board.id === currentBoard?.id)
                      .map((item) => (
                        <TaskStatus
                          key={item.id}
                          statusName={item.name}
                          id={item.id}
                        />
                      ))}

                  <CreateNewStatus />
                </div>
              </section>
            ) : (
              <div className="empty-board flex-layout">
                <h2>Please Create a Board First</h2>
              </div>
            )}
          </main>
        </section>
      </DragDropContext>
    </>
  );
}
