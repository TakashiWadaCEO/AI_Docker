import { useState, FormEvent } from "react";

type Todo = { id: string; text: string; done: boolean };

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  const addTodo = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setTodos([{ id: crypto.randomUUID(), text, done: false }, ...todos]);
    setText("");
  };

  const toggle = (id: string) =>
    setTodos(todos.map(t => (t.id === id ? { ...t, done: !t.done } : t)));

  const remove = (id: string) =>
    setTodos(todos.filter(t => t.id !== id));

  return (
    <div className="mx-auto max-w-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">AI Todo</h1>

      <form onSubmit={addTodo} className="flex gap-2 mb-6">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-grow border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </form>

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
              onClick={() => remove(t.id)}
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