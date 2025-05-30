import React from "react";

export default function AllTodoItem({ item, onToggle }) {
  return (
    <div className="todoitem">
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => onToggle(item.id)}
        style={{ width: 20, height: 20, accentColor: "#388E3C" }}
      />
      <span style={{ marginLeft: 12, fontSize: "1.08rem" }}>
        {item.title}
      </span>
      {item.memo && (
        <span style={{ marginLeft: "0.7rem", color: "#9bb", fontSize: "0.98rem" }}>{item.memo}</span>
      )}
    </div>
  );
}
