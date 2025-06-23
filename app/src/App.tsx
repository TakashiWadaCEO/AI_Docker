// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "@/components/NavBar";

import TodoPage from "@/pages/TodoPage";
import CalendarPage from "@/pages/CalendarPage";
import MemoPage from "@/pages/MemoPage";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {/* ルートに来たら /todo へリダイレクト */}
        <Route path="/" element={<Navigate to="/todo" replace />} />

        {/* 各ページ */}
        <Route path="/todo"     element={<TodoPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/memo"     element={<MemoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
