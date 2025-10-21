import React from "react";
import TodoItem from "./TodoItem";

/**
 * PUBLIC_INTERFACE
 * TodoList renders a list of todos with provided handlers.
 */
export default function TodoList({ todos, onToggle, onUpdate, onDelete }) {
  return (
    <div className="todo-card card" role="region" aria-label="Todo list">
      {todos.length === 0 ? (
        <div style={{ padding: 18 }}>
          <p className="muted" style={{ margin: 0 }}>
            No tasks here yet. Add your first task above!
          </p>
        </div>
      ) : (
        <ul className="todo-list" role="list">
          {todos.map((t) => (
            <TodoItem
              key={t.id}
              todo={t}
              onToggle={onToggle}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
      <div className="footer-row">
        <span className="muted">{todos.filter(t => !t.completed).length} remaining</span>
        <span className="muted">{todos.filter(t => t.completed).length} completed</span>
      </div>
    </div>
  );
}
