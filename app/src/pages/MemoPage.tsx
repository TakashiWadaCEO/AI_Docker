// src/pages/MemoPage.tsx
import { useState } from "react";
import { useNoteStore } from "@/store/useNoteStore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MemoPage() {
  const { notes, add, update, del } = useNoteStore();
  const [draft, setDraft] = useState("");

  /* 新規追加 */
  const handleAdd = () => {
    if (!draft.trim()) return;
    add(draft.trim());
    setDraft("");
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">メモ</h1>

      {/* ---------- 入力欄 ---------- */}
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Markdown でメモを書いて Enter+Ctrl で追加"
        className="w-full h-32 border rounded p-3 mb-2"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.ctrlKey) {
            e.preventDefault();
            handleAdd();
          }
        }}
      />
      <button
        onClick={handleAdd}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add
      </button>

      {/* ---------- メモ一覧 ---------- */}
      <ul className="space-y-4">
        {notes.map((n) => (
          <li key={n.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">
                {new Date(n.updatedAt).toLocaleString()}
              </span>
              <button
                onClick={() => del(n.id)}
                className="text-red-500 text-sm hover:underline"
              >
                ×
              </button>
            </div>

            {/* 表示パネル（クリックで編集） */}
            <div
              onClick={() => setDraft(n.body)}
              className="prose max-w-none cursor-pointer"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{n.body}</ReactMarkdown>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
