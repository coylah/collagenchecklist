import { useState } from "react";
import type { Habit } from "@/lib/habits";

export function HabitRow({
  habit,
  checked,
  onToggle,
}: {
  habit: Habit;
  checked: boolean;
  onToggle: () => void;
}) {
  const [open, setOpen] = useState(false);
  const hasMore = !!habit.helper || (habit.examples && habit.examples.length > 0);

  return (
    <li className="border-b border-border/70 last:border-b-0">
      <div className="flex items-start gap-3 py-4">
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={checked}
          aria-label={habit.label}
          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all"
          style={{
            borderColor: checked ? "var(--color-rose)" : "var(--color-border)",
            backgroundColor: checked ? "var(--color-rose)" : "transparent",
          }}
        >
          {checked && (
            <svg
              key="check"
              className="tick-pop"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </button>

        <button
          type="button"
          onClick={onToggle}
          className="flex-1 text-left transition-opacity"
          style={{ opacity: checked ? 0.55 : 1 }}
        >
          {habit.tag && (
            <div
              className="mb-1 text-[10px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: "var(--color-rose)" }}
            >
              {habit.tag}
            </div>
          )}
          <div
            className="text-[15px] leading-snug"
            style={{ textDecoration: checked ? "line-through" : "none" }}
          >
            {habit.label}
          </div>
        </button>

        {hasMore && (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Hide details" : "Show details"}
            className="mt-0.5 shrink-0 text-xs uppercase tracking-[0.18em] text-muted-foreground"
          >
            {open ? "Less" : "More"}
          </button>
        )}
      </div>

      {open && hasMore && (
        <div className="pb-4 pl-9 pr-1 text-sm leading-relaxed text-muted-foreground">
          {habit.helper && <p className="mb-2">{habit.helper}</p>}
          {habit.examples && (
            <div className="flex flex-wrap gap-1.5">
              {habit.examples.map((e) => (
                <span
                  key={e}
                  className="rounded-full bg-baby px-2.5 py-1 text-xs text-foreground"
                >
                  {e}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </li>
  );
}
