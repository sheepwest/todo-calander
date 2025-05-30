import React from "react";

export default function SelectRepeatTodoModal({ open, todos, onSelect, onShowAll, onClose }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
        background: "rgba(0,0,0,0.23)", zIndex: 2000,
        display: "flex", justifyContent: "center", alignItems: "center"
      }}
    >
      <div
        style={{
          width: "85vw", maxWidth: 340, background: "#fff", borderRadius: 15,
          padding: "2rem 1.3rem 1.5rem 1.3rem", boxShadow: "0 2px 16px #bbb9",
          position: "relative"
        }}
      >
        <div style={{ fontWeight: 700, fontSize: "1.16rem", color: "#388e3c", marginBottom: "1.1rem" }}>
          반복 할일 선택
        </div>
        {todos.length === 0 ? (
          <div style={{ color: "#aaa", textAlign: "center", margin: "1.6rem 0" }}>
            반복 설정된 할일이 없습니다.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.6rem" }}>
            {todos.map(todo => (
              <button
                key={todo.id}
                onClick={() => onSelect(todo)}
                style={{
                  background: "#e9f6e6",
                  color: "#388e3c",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: "1.07rem",
                  padding: "0.65rem 0.7rem",
                  cursor: "pointer",
                  textAlign: "center"
                }}
              >
                {todo.title}
              </button>
            ))}
            {/* 전체 할일 보기 버튼 */}
            <button
              onClick={onShowAll}
              style={{
                background: "#388e3c",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: "1.07rem",
                padding: "0.65rem 0.7rem",
                cursor: "pointer",
                textAlign: "center"
              }}
            >
              전체 할일 보기
            </button>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{
              background: "#eee", color: "#388e3c", border: "none",
              borderRadius: 7, padding: "0.7rem 1.4rem", fontWeight: 600, fontSize: "1.04rem"
            }}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
