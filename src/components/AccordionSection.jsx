import React from "react";

export default function AccordionSection({ title, isOpen, onToggle, items, onToggleItem }) {
  const formatDate = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${month}/${day}`;
  };

  return (
    <section className="accordion-section" style={{ marginBottom: "1.2rem" }}>
      <div
        className="accordion-title"
        onClick={onToggle}
        style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 700,
          fontSize: "1.11rem",
          cursor: "pointer",
          color: "#fff",
          padding: "0.85rem 0.9rem",
          background: "#388e3c",
          borderRadius: 11,
          marginBottom: "0.12rem",
          boxShadow: "0 2px 8px #e9f6e6a0"
        }}
      >
        <span style={{ flex: 1 }}>{title}</span>
        <span style={{
          marginLeft: "0.9rem",
          fontSize: "1.22rem",
          color: "#fff",
          fontWeight: 500,
          lineHeight: 1
        }}>
          {isOpen ? "˄" : "˅"}
        </span>
      </div>
      {isOpen && (
        <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
          {items.length === 0 ? (
            <li style={{ color: "#bbb", padding: "0.8rem 1.1rem" }}>할일이 없습니다.</li>
          ) : (
            items.map((item) => {
              let subinfo = [];
              if (title === "일정" && item.date) subinfo.push(formatDate(item.date));
              if (item.memo && item.memo.trim() !== "") subinfo.push(item.memo);

              return (
                <li
                  key={item.id}
                  style={{
                    padding: "0.75rem 1.2rem",
                    borderBottom: "1px solid #f2f2f2",
                    color: item.completed ? "#b6b6b6" : "#424242",
                    fontSize: "1.07rem",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => onToggleItem(item.id)}
                    style={{ marginRight: "1rem" }}
                  />
                  <span style={{
                    textDecoration: item.completed ? "line-through" : "none",
                  }}>
                    {item.title}
                    {subinfo.length > 0 && (
                      <span style={{
                        color: "#aaa",
                        fontSize: "0.97rem",
                        fontWeight: 400,
                        marginLeft: "0.5em"
                      }}>
                        {subinfo.join(" ")}
                      </span>
                    )}
                  </span>
                </li>
              );
            })
          )}
        </ul>
      )}
    </section>
  );
}
