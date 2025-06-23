// src/components/Todo.tsx
import { FormEvent, useState } from "react";
import { useTodoStore } from "@/store/useTodoStore";
import clsx from "classnames";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Todo() {
  const { todos, add, toggle, del } = useTodoStore();

  const [text, setText] = useState("");
  const [due,  setDue]  = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    add(text, due || undefined);
    setText("");
    setDue("");
  };

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
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task..."
          className="flex-grow border rounded px-3 py-2"
        />
        <input
          type="date"
          value={due}
          onChange={(e) => setDue(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <Button type="submit" className="w-full sm:w-auto">
          Add
        </Button>
      </form>

      {/* ---------- Surprise me ---------- */}
      <Button onClick={surprise} variant="secondary" className="mb-6">
        Surprise me
      </Button>

      {imageUrl && (
        <img src={imageUrl} alt="Surprise!" className="mb-6 w-full rounded shadow" />
      )}

      {/* ---------- Todo list ---------- */}
      <ul className="space-y-3">
        {todos.map((t) => (
          <Card key={t.id} className={t.done ? "opacity-60" : ""}>
            <CardContent className="flex items-center justify-between py-3">
              <span
                onClick={() => toggle(t.id)}
                className={clsx(
                  "cursor-pointer flex-grow",
                  t.done && "line-through text-gray-400"
                )}
              >
                {t.text}
                {t.due && (
                  <span className="ml-2 text-sm text-gray-500">({t.due})</span>
                )}
              </span>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => del(t.id)}
              >
                ×
              </Button>
            </CardContent>
          </Card>
        ))}
      </ul>
    </div>
  );
}
