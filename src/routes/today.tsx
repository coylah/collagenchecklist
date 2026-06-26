import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useChecklist } from "@/lib/useChecklist";
import { HABITS, SECTIONS, dailyMessageFor } from "@/lib/habits";
import { HabitRow } from "@/components/HabitRow";
import { ProgressBar } from "@/components/ProgressBar";
import { ResetDialog } from "@/components/ResetDialog";

const SECTION_ICONS: Record<string, string> = {
  hydration: "💧",
  food: "🥗",
  skincare: "✨",
  movement: "🌿",
  soul: "🤍",
};

const SECTION_COLORS: Record<string, string> = {
  hydration: "#E8F4FD",
  food: "#F0F7EE",
  skincare: "#FDF0F5",
  movement: "#F5F0FB",
  soul: "#FDF5F0",
};

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
  const { hydrated, state, toggle, total, resetToday, streak, getStreakLabel } = useChecklist();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const message = useMemo(() => dailyMessageFor(), []);

  const TOTAL_HABITS = 25;

  if (!hydrated) {
    return <div className="h-screen" />;
  }

  return (
    <main className="px-6 pt-10 pb-24">

      {/* Header */}
      <div
        className="text-[11px] uppercase tracking-[0.28em]"
        style={{ color: "var(--color-rose)" }}
      >
        Today
      </div>
      <h1 className="mt-2 text-[34px] leading-[1.05]">Today's Collagen Checklist</h1>
      <p className="mt-3 text-[15px] italic text-muted-foreground">{message}</p>

      {/* Streak banner */}
      {streak > 0 && (
        <div
          className="mt-5 rounded-2xl px-5 py-3 text-center text-[13px] font-medium"
          style={{ backgroundColor: "var(--color-baby)", color: "var(--color-rose)" }}
        >
          {getStreakLabel(streak)}
        </div>
      )}

      {/* Progress card */}
      <div className="mt-5 rounded-2xl bg-baby px-5 py-4">
        <div className="flex items-baseline justify-between">
          <span className="font-display text-2xl">
            {total} <span className="text-base text-muted-foreground">of {TOTAL_HABITS}</span>
          </span>
          <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            completed today
          </span>
        </div>
        <div className="mt-3">
          <ProgressBar value={total} max={TOTAL_HABITS} />
        </div>
      </div>

      {/* Sections */}
      <div className="mt-10 space-y-8">
        {SECTIONS.map((section, i) => {
          const items = HABITS.filter((h) => h.section === section.id);
          const sectionTotal = items.filter((h) => state.ticks[h.id]).length;
          const complete = sectionTotal === items.length;

          return (
            <section key={section.id}>
              {/* Section header card */}
              <div
                className="rounded-2xl px-5 py-4 mb-1"
                style={{ backgroundColor: SECTION_COLORS[section.id] }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{SECTION_ICONS[section.id]}</span>
                    <div>
                      <div
                        className="text-[10px] uppercase tracking-[0.28em]"
                        style={{ color: "var(--color-rose)" }}
                      >
                        Section {i + 1}
                      </div>
                      <h2 className="text-[22px] leading-tight">{section.title}</h2>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className="font-display text-2xl"
                      style={{ color: complete ? "var(--color-rose)" : "var(--color-foreground)" }}
                    >
                      {sectionTotal}
                      <span className="text-base text-muted-foreground">/{items.length}</span>
                    </span>
                    {complete && (
                      <div
                        className="text-[10px] uppercase tracking-[0.18em] mt-0.5"
                        style={{ color: "var(--color-rose)" }}
                      >
                        nailed it
                      </div>
                    )}
                  </div>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {section.intro.join(" ")}
                </p>
              </div>

              {/* Habit list */}
              <ul className="rounded-2xl bg-white border border-border/50 overflow-hidden">
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

      {/* Bottom actions */}
      <div className="mt-12 flex flex-col items-center gap-3">
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
