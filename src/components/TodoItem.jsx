import React from "react";

export default function TodoItem({ todo, onToggle }) {
  return (
    <div className="todoitem">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span style={todo.completed ? { textDecoration: "line-through", color: "#b3b3b3" } : {}}>
        {todo.title}
      </span>
      {/* 필요시 메모 표시 */}
      {todo.memo && (
        <span style={{marginLeft: "0.5rem", fontSize: "0.98rem", color: "#9aa"}}>{todo.memo}</span>
      )}
    </div>
  );
}
