import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * TodoInput allows adding a new todo. Calls onAdd(title) when submitted.
 */
export default function TodoInput({ onAdd }) {
  const [title, setTitle] = useState("");

  const submit = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setTitle("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") submit();
  };

  return (
    <div className="input-row" role="form" aria-label="Add todo">
      <input
        className="input"
        aria-label="New todo"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button className="btn" type="button" onClick={submit} aria-label="Add todo">
        Add
      </button>
    </div>
  );
}
