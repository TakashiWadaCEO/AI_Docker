// src/components/NavBar.tsx
import { NavLink } from "react-router-dom";

export default function NavBar() {
  // NavLink に渡すクラス生成関数
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    [
      "transition",
      "hover:text-accent",              // ホバー時に差し色
      isActive && "underline font-semibold", // 現在ページ
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <header className="bg-brand text-white px-6 py-3 shadow-md">
      <nav className="flex gap-6">
        <NavLink to="/todo"     className={linkClasses}>
          ToDo
        </NavLink>
        <NavLink to="/calendar" className={linkClasses}>
          カレンダー
        </NavLink>
        <NavLink to="/memo"     className={linkClasses}>
          メモ
        </NavLink>
      </nav>
    </header>
  );
}
