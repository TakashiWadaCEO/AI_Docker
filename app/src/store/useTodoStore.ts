import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';

export type Todo = { id: string; text: string; done: boolean };

interface TodoState {
  todos: Todo[];
  add:    (text: string) => void;
  toggle: (id: string) => void;
  del:    (id: string) => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      add: (text) =>
        set((s) => ({
          todos: [{ id: nanoid(), text, done: false }, ...s.todos],
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
    { name: 'todo-store' }           // ← localStorage キー
  )
);
