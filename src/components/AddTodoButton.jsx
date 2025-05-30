import React from "react";

export default function AddTodoButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="addtodo-btn"
      aria-label="할 일 추가"
    >
      +
    </button>
  );
}
