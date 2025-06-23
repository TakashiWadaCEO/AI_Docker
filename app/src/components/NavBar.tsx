// src/components/NavBar.tsx
import { NavLink } from "react-router-dom";

export default function NavBar() {
  // isActive を受け取って動的クラスを返す関数
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg transition hover:bg-slate-200 ${
      isActive ? "bg-slate-300 font-bold" : ""
    }`;

  return (
    <header className="flex gap-2 p-4 shadow">
      <NavLink to="/todo"     className={linkClasses}>
        ToDo
      </NavLink>
      <NavLink to="/calendar" className={linkClasses}>
        カレンダー
      </NavLink>
      <NavLink to="/memo"     className={linkClasses}>
        メモ
      </NavLink>
    </header>
  );
}
