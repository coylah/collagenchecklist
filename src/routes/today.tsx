import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useChecklist } from "@/lib/useChecklist";
import { HABITS, SECTIONS, dailyMessageFor } from "@/lib/habits";
import { HabitRow } from "@/components/HabitRow";
import { ProgressBar } from "@/components/ProgressBar";
import { ResetDialog } from "@/components/ResetDialog";

export const Route = createFileRoute("/today")({
  head: () => ({
    meta: [
      { title: "Today's Collagen Checklist" },
      { name: "description", content: "Today's tiny habits to protect, support and build healthy collagen." },
    ],
  }),
  component: TodayPage,
});

function TodayPage() {
  const { hydrated, state, toggle, total, resetToday } = useChecklist();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const message = useMemo(() => dailyMessageFor(), []);

  if (!hydrated) {
    return <div className="h-screen" />;
  }

  return (
    <main className="px-6 pt-10">
      <div
        className="text-[11px] uppercase tracking-[0.28em]"
        style={{ color: "var(--color-rose)" }}
      >
        Today
      </div>
      <h1 className="mt-2 text-[34px] leading-[1.05]">Today's Collagen Checklist</h1>
      <p className="mt-3 text-[15px] italic text-muted-foreground">{message}</p>

      <div className="mt-7 rounded-2xl bg-baby px-5 py-4">
        <div className="flex items-baseline justify-between">
          <span className="font-display text-2xl">
            {total} <span className="text-base text-muted-foreground">of 20</span>
          </span>
          <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            completed today
          </span>
        </div>
        <div className="mt-3">
          <ProgressBar value={total} max={20} />
        </div>
      </div>

      <div className="mt-10 space-y-10">
        {SECTIONS.map((section, i) => {
          const items = HABITS.filter((h) => h.section === section.id);
          return (
            <section key={section.id}>
              <div
                className="text-[11px] uppercase tracking-[0.28em]"
                style={{ color: "var(--color-rose)" }}
              >
                Section {i + 1}
              </div>
              <h2 className="mt-1 text-[26px]">{section.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {section.intro.join(" ")}
              </p>
              <ul className="mt-4">
                {items.map((h) => (
                  <HabitRow
                    key={h.id}
                    habit={h}
                    checked={!!state.ticks[h.id]}
                    onToggle={() => toggle(h.id)}
                  />
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <div className="mt-12 flex flex-col items-center gap-3 pb-4">
        <Link
          to="/wins"
          className="flex h-14 w-full items-center justify-center rounded-full text-[15px] font-medium tracking-wide text-primary-foreground shadow-[0_8px_24px_-12px_rgba(214,51,108,0.6)]"
          style={{ backgroundColor: "var(--color-rose)" }}
        >
          Show Today's Glow Wins
        </Link>
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          className="h-12 text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          Start New Day
        </button>
      </div>

      <ResetDialog
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          resetToday();
          setConfirmOpen(false);
          navigate({ to: "/today" });
        }}
      />
    </main>
  );
}
