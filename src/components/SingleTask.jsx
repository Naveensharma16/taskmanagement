import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { createPortal } from "react-dom";
import UpdateTaskModal from "../modal/UpdateTaskModal";

export default function SingleTask({ task, id, index }) {
  const [showUpdateModel, setShowUpdateModel] = useState(false);
  return (
    <>
      {/* draggle componet from react beautiful dnd */}
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <div
            className="draggabel-elem"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <h4
              onClick={() => setShowUpdateModel(!showUpdateModel)}
              aria-hidden="true"
            >
              {task}
            </h4>
          </div>
        )}
      </Draggable>

      {/* portal to popup for updating a particualr task */}
      {showUpdateModel &&
        createPortal(
          <UpdateTaskModal
            id={id}
            showUpdateModel={showUpdateModel}
            setShowUpdateModel={setShowUpdateModel}
          />,
          document.body
        )}
    </>
  );
}
