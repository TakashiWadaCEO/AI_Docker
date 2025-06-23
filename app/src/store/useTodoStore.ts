// src/store/useTodoStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';

/* === 型定義を拡張 === */
export type Todo = {
  id: string;
  text: string;
  done: boolean;
  due?: string;        // 追加: ISO 8601 形式の日付（例 "2025-07-01"）
};

interface TodoState {
  todos: Todo[];
  add:    (text: string, due?: string) => void;  // due は省略可
  toggle: (id: string) => void;
  del:    (id: string) => void;
}

/* === ストア本体 === */
export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      add: (text, due) =>
        set((s) => ({
          todos: [
            { id: nanoid(), text, done: false, due: due || undefined },
            ...s.todos,
          ],
        })),
      toggle: (id) =>
        set((s) => ({
          todos: s.todos.map((t) =>
            t.id === id ? { ...t, done: !t.done } : t
          ),
        })),
      del: (id) =>
        set((s) => ({ todos: s.todos.filter((t) => t.id !== id) })),
    }),
    { name: 'todo-store' } // localStorage キー
  )
);
