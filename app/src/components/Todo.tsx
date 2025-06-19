// src/components/Todo.tsx
import { useState, FormEvent } from "react";

type Todo = { id: string; text: string; done: boolean };

export default function Todo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);  // ★ 追加

  /* ---------------- Todo 基本ロジック ---------------- */

  const add = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setTodos([{ id: crypto.randomUUID(), text, done: false }, ...todos]);
    setText("");
  };

  const toggle = (id: string) =>
    setTodos(todos.map(t => (t.id === id ? { ...t, done: !t.done } : t)));

  const del = (id: string) => setTodos(todos.filter(t => t.id !== id));

  /* ---------------- 画像フェッチ ---------------- */

  // src/components/Todo.tsx  抜粋（surprise 関数を書き換え）
  const surprise = () => {
    // Date.now() をシードにして毎回違う画像
    const url = `https://picsum.photos/seed/${Date.now()}/400/300`;
    setImageUrl(url);
  };

  return (
    <div className="mx-auto max-w-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-center">Todo List</h2>

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

      {/* Surprise me ボタン */}
      <button
        onClick={surprise}
        className="mb-6 block bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
      >
        Surprise me
      </button>

      {/* ランダム画像の表示 */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Surprise!"
          className="mb-6 w-full rounded shadow"
        />
      )}

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
