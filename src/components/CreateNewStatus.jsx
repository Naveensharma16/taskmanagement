import React, { useState } from "react";
import { createPortal } from "react-dom";
import NewStatusModal from "../modal/NewStatusModal";

export default function CreateNewStatus() {
  // state to show or hide portal
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div
        className="flex-layout add-new-status cursor"
        onClick={() => setShowModal(!showModal)}
        aria-hidden="true"
      >
        <p>+New Column</p>
      </div>
      {/* portal for adding new column in a board */}
      {showModal &&
        createPortal(
          <NewStatusModal show={showModal} setShow={setShowModal} />,
          document.body
        )}
      {/* portal for adding new column in a board */}
    </>
  );
}
