import React, { useMemo } from "react";
import "./styles/theme.css";
import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import Filters from "./components/Filters";
import TodoList from "./components/TodoList";
import { useLocalStorage } from "./hooks/useLocalStorage";

/**
 * PUBLIC_INTERFACE
 * App is the main entry for the Todo UI.
 * Features:
 * - Add, Edit, Delete, Toggle complete
 * - Filter: All/Active/Completed
 * - Persist to localStorage
 */
export default function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [filter, setFilter] = useLocalStorage("filter", "all");

  const addTodo = (title) => {
    const id = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
    setTodos(prev => [{ id, title, completed: false }, ...prev]);
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const updateTodo = (id, title) => {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, title } : t)));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const filtered = useMemo(() => {
    if (filter === "active") return todos.filter(t => !t.completed);
    if (filter === "completed") return todos.filter(t => t.completed);
    return todos;
  }, [todos, filter]);

  return (
    <main>
      <div className="container">
        <Header />
        <div className="card" style={{ padding: 16, marginTop: 16 }}>
          <TodoInput onAdd={addTodo} />
          <div style={{ marginTop: 14 }}>
            <Filters current={filter} onChange={setFilter} />
          </div>
        </div>
        <TodoList
          todos={filtered}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />
      </div>
    </main>
  );
}
