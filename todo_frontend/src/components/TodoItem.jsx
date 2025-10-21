import React, { useState, useRef, useEffect } from "react";

/**
 * PUBLIC_INTERFACE
 * TodoItem renders a single todo with controls:
 * - toggle complete
 * - edit inline (Enter to save, Escape to cancel)
 * - delete
 */
export default function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const startEdit = () => {
    setDraft(todo.title);
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setDraft(todo.title);
  };

  const saveEdit = () => {
    const trimmed = draft.trim();
    if (!trimmed) {
      // If empty after trim, do not update and keep editing for user to correct
      return;
    }
    if (trimmed !== todo.title) {
      onUpdate(todo.id, trimmed);
    }
    setEditing(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") cancelEdit();
  };

  return (
    <li className="todo-item" role="listitem">
      <input
        className="checkbox"
        type="checkbox"
        checked={todo.completed}
        aria-label={`Mark ${todo.title} ${todo.completed ? "active" : "completed"}`}
        onChange={() => onToggle(todo.id)}
      />
      {!editing ? (
        <p className={`todo-title ${todo.completed ? "completed" : ""}`}>{todo.title}</p>
      ) : (
        <div className="inline-edit" style={{ width: "100%" }}>
          <input
            ref={inputRef}
            className="inline-input"
            aria-label="Edit todo"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <button className="btn success" type="button" onClick={saveEdit} aria-label="Save">
            Save
          </button>
          <button className="btn secondary" type="button" onClick={cancelEdit} aria-label="Cancel">
            Cancel
          </button>
        </div>
      )}
      <div className="todo-actions">
        {!editing && (
          <button className="icon-btn edit" type="button" onClick={startEdit} aria-label="Edit todo">
            Edit
          </button>
        )}
        <button
          className="icon-btn delete"
          type="button"
          onClick={() => onDelete(todo.id)}
          aria-label="Delete todo"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
