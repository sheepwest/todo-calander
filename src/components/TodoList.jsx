import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, onToggle }) {
  return (
    <div className="todolist">
      {todos.length === 0 && (
        <div className="text-gray-400 text-center" style={{marginTop: "1.5rem"}}>오늘 할 일이 없습니다.</div>
      )}
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </div>
  );
}
