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

const TOTAL_HABITS = 25;
const WINS_UNLOCK_AT = 15;

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
  const [showReset, setShowReset] = useState(false);
  const message = useMemo(() => dailyMessageFor(), []);

  if (!hydrated) {
    return <div className="h-screen" />;
  }

  const winsUnlocked = total >= WINS_UNLOCK_AT;

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

      {/* Glow Run banner — shows from day 1 */}
      <div
        className="mt-5 rounded-2xl px-5 py-3"
        style={{ backgroundColor: "var(--color-baby)" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div
              className="text-[10px] uppercase tracking-[0.28em]"
              style={{ color: "var(--color-rose)" }}
            >
              Your Glow Run
            </div>
            <p className="mt-0.5 text-[14px] text-foreground">
              {streak === 0
                ? "Tick at least one habit today to start your Glow Run."
                : getStreakLabel(streak)}
            </p>
          </div>
          <div
            className="font-display text-3xl ml-4"
            style={{ color: streak > 0 ? "var(--color-rose)" : "var(--color-border)" }}
          >
            {streak > 0 ? streak : "—"}
          </div>
        </div>
        {streak === 0 && (
          <p className="mt-2 text-[12px] text-muted-foreground">
            Come back every day and your Glow Run grows. Miss a day? Your glow doesn't disappear — just start again.
          </p>
        )}
      </div>

      {/* Progress card */}
      <div className="mt-4 rounded-2xl bg-baby px-5 py-4">
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
        {!winsUnlocked && total > 0 && (
          <p className="mt-2 text-[12px] text-muted-foreground">
            {WINS_UNLOCK_AT - total} more to unlock today's Glow Wins
          </p>
        )}
      </div>

      {/* Sections */}
      <div className="mt-8 space-y-8">
        {SECTIONS.map((section, i) => {
          const items = HABITS.filter((h) => h.section === section.id);
          const sectionTotal = items.filter((h) => state.ticks[h.id]).length;
          const complete = sectionTotal === items.length;

          return (
            <section key={section.id}>
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
        {winsUnlocked ? (
          <Link
            to="/wins"
            className="flex h-14 w-full items-center justify-center rounded-full text-[15px] font-medium tracking-wide text-primary-foreground shadow-[0_8px_24px_-12px_rgba(214,51,108,0.6)]"
            style={{ backgroundColor: "var(--color-rose)" }}
          >
            Show Today's Glow Wins
          </Link>
        ) : (
          <div
            className="flex h-14 w-full items-center justify-center rounded-full text-[15px] font-medium tracking-wide text-muted-foreground"
            style={{ backgroundColor: "var(--color-baby)" }}
          >
            Keep going — Glow Wins unlock at 15
          </div>
        )}

        {/* Safe reset — tucked away, clearly labelled */}
        <div className="mt-4 w-full border-t border-border/50 pt-4">
          {!showReset ? (
            <button
              type="button"
              onClick={() => setShowReset(true)}
              className="w-full text-center text-xs text-muted-foreground/60 underline-offset-4 hover:underline"
            >
              Need to reset today?
            </button>
          ) : (
            <div className="rounded-2xl border border-border/50 px-5 py-4 text-center">
              <p className="text-[13px] text-muted-foreground">
                This will clear today's ticks. Your Glow Run history is safe.
              </p>
              <div className="mt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowReset(false)}
                  className="flex-1 h-10 rounded-full border border-border text-sm text-muted-foreground"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmOpen(true)}
                  className="flex-1 h-10 rounded-full text-sm text-white"
                  style={{ backgroundColor: "var(--color-rose)" }}
                >
                  Yes, reset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ResetDialog
        open={confirmOpen}
        onCancel={() => {
          setConfirmOpen(false);
          setShowReset(false);
        }}
        onConfirm={() => {
          resetToday();
          setConfirmOpen(false);
          setShowReset(false);
          navigate({ to: "/today" });
        }}
      />
    </main>
  );
}
