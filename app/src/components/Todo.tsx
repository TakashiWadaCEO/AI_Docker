import { useState, useEffect, FormEvent } from "react";

type Todo = { id: string; text: string; done: boolean };

export default function Todo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("ai-todos");
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error("Failed to parse saved todos:", error);
      }
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("ai-todos", JSON.stringify(todos));
  }, [todos]);

  /** add a new todo */
  const add = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;
    setTodos([{ id: crypto.randomUUID(), text, done: false }, ...todos]);
    setText("");
  };

  /** toggle done/undone */
  const toggle = (id: string) =>
    setTodos(todos.map(t => (t.id === id ? { ...t, done: !t.done } : t)));

  /** delete a todo */
  const del = (id: string) => setTodos(todos.filter(t => t.id !== id));

  return (
    <div className="mx-auto max-w-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-center">AI ToDo3</h2>

      {/* add form */}
      <form onSubmit={add} className="flex gap-2 mb-6">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a task..."
          className="flex-grow border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      {/* list */}
      <ul className="space-y-2">
        {todos.map(t => (
          <li
            key={t.id}
            className="flex items-center justify-between bg-white rounded shadow p-3"
          >
            <span
              onClick={() => toggle(t.id)}
              className={`flex-grow cursor-pointer ${
                t.done ? "line-through text-gray-400" : ""
              }`}
            >
              {t.text}
            </span>
            <button
              onClick={() => del(t.id)}
              className="text-sm text-red-500 hover:underline"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
