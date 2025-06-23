// src/store/useNoteStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';

export interface Note {
  id: string;
  body: string;      // Markdown 本文
  updatedAt: string; // ISO8601
}

interface NoteState {
  notes: Note[];
  add:    (body: string) => void;
  update: (id: string, body: string) => void;
  del:    (id: string) => void;
}

export const useNoteStore = create<NoteState>()(
  persist(
    (set) => ({
      notes: [],
      add: (body) =>
        set((s) => ({
          notes: [
            { id: nanoid(), body, updatedAt: new Date().toISOString() },
            ...s.notes,
          ],
        })),
      update: (id, body) =>
        set((s) => ({
          notes: s.notes.map((n) =>
            n.id === id ? { ...n, body, updatedAt: new Date().toISOString() } : n
          ),
        })),
      del: (id) => set((s) => ({ notes: s.notes.filter((n) => n.id !== id) })),
    }),
    { name: 'note-store' }
  )
);
