// src/components/NavBar.tsx
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NavBar() {
  /* ---------- ダークモード状態 ---------- */
  const [dark, setDark] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  /* ---------- NavLink 用クラス ---------- */
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    [
      "transition hover:text-accent",
      isActive && "underline font-semibold",
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <header className="bg-brand text-white px-6 py-3 shadow-md">
      <nav className="flex items-center gap-6">
        {/* ------- タイトル ------- */}
        <h1 className="text-xl font-bold">Vibecoding challenge!</h1>
        
        {/* ------- 左側のメニュー ------- */}
        <NavLink to="/todo"     className={linkClasses}>ToDo</NavLink>
        <NavLink to="/calendar" className={linkClasses}>カレンダー</NavLink>
        <NavLink to="/memo"     className={linkClasses}>メモ</NavLink>

        {/* ------- スペーサーで右寄せ ------- */}
        <span className="flex-1" />

        {/* ------- ダークモードトグル ------- */}
        <button
          onClick={() => setDark(!dark)}
          className="text-xl focus:outline-none hover:opacity-80 mr-4"
          aria-label="Toggle dark mode"
        >
          {dark ? "🌙" : "☀️"}
        </button>

        {/* ------- ロゴ画像（最右） ------- */}
        <img
          src="/sunelco_logo.png"   /* public/ に置いたファイルを参照 */
          alt="Sunelco logo"
          className="h-8 w-auto select-none"
        />
      </nav>
    </header>
  );
}
