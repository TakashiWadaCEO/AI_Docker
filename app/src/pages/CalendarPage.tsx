import { useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useTodoStore } from "@/store/useTodoStore";

export default function CalendarPage() {
  const tasks = useTodoStore((s) => s.todos);

  // due があるタスクを FullCalendar の events 形式へ変換
  const events = useMemo(
    () =>
      tasks
        .filter((t) => t.due)
        .map((t) => ({
          id: t.id,
          title: t.text,
          start: t.due,                    // ISO 8601
          color: t.done ? "#9ca3af" : "#2563eb",
        })),
    [tasks]
  );

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">カレンダー</h1>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale="ja"
        height="auto"
        events={events}
      />
    </div>
  );
}
