import { useEffect } from "react";

// a custom hook to listen for esc ket and enter ket to call add and close function for particular popup
export default function useEscEnter({ handleAdd, handleClose }) {
  useEffect(() => {
    const listner = (e) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "Enter") {
        handleAdd();
      }
    };
    document.addEventListener("keydown", listner);

    return () => {
      document.removeEventListener("keydown", listner);
    };
  }, [handleClose, handleAdd]);
}
