// src/components/Todo.tsx
import { FormEvent, useState } from "react";
import { useTodoStore } from "@/store/useTodoStore";

export default function Todo() {
  /* ===== Zustand store ===== */
  const { todos, add, toggle, del } = useTodoStore();

  /* ===== ローカル入力状態 ===== */
  const [text, setText] = useState("");
  const [due,  setDue]  = useState("");          // ← 期日用
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  /* ===== 追加処理 ===== */
  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    add(text, due || undefined);   // 期日が空なら undefined
    setText("");
    setDue("");
  };

  /* ===== 画像フェッチ ===== */
  const surprise = () => {
    const url = `https://picsum.photos/seed/${Date.now()}/400/300`;
    setImageUrl(url);
  };

  return (
    <div className="mx-auto max-w-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-center">Todo List</h2>

      {/* ---------- add form ---------- */}
      <form
        onSubmit={handleAdd}
        className="flex flex-col sm:flex-row gap-2 mb-6"
      >
        {/* タスク内容 */}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task..."
          className="flex-grow border rounded px-3 py-2"
        />

        {/* 期日入力（省略可） */}
        <input
          type="date"
          value={due}
          onChange={(e) => setDue(e.target.value)}
          className="border rounded px-3 py-2"
        />

        {/* 追加ボタン */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      {/* ---------- Surprise me ボタン ---------- */}
      <button
        onClick={surprise}
        className="mb-6 block bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
      >
        Surprise me
      </button>

      {/* ランダム画像 */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Surprise!"
          className="mb-6 w-full rounded shadow"
        />
      )}

      {/* ---------- Todo list ---------- */}
      <ul className="space-y-2">
        {todos.map((t) => (
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
              {t.due && (
                <span className="ml-2 text-sm text-gray-500">({t.due})</span>
              )}
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
