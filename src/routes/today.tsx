import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useChecklist } from "@/lib/useChecklist";
import { HABITS, SECTIONS, dailyMessageFor } from "@/lib/habits";
import { HabitRow } from "@/components/HabitRow";
import { ProgressBar } from "@/components/ProgressBar";

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
  const {
    hydrated,
    state,
    toggle,
    togglePersonal,
    total,
    streak,
    getStreakLabel,
    personalLabels,
    updatePersonalLabel,
    PERSONAL_WIN_COUNT,
  } = useChecklist();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const message = useMemo(() => dailyMessageFor(), []);

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

      {/* Glow Run banner */}
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
      </div>

      {/* Main sections */}
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

      {/* Personal Wins section */}
      <section className="mt-8">
        <div
          className="rounded-2xl px-5 py-4 mb-1"
          style={{ backgroundColor: "#FAF7F0" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">⭐</span>
            <div>
              <div
                className="text-[10px] uppercase tracking-[0.28em]"
                style={{ color: "var(--color-rose)" }}
              >
                Your Personal Wins
              </div>
              <h2 className="text-[22px] leading-tight">Make it yours</h2>
            </div>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Add up to 5 habits that matter to you. Tap the pencil to write them in — or change them anytime. These don't affect your main score, they're just for you.
          </p>
        </div>

        <ul className="rounded-2xl bg-white border border-border/50 overflow-hidden">
          {Array.from({ length: PERSONAL_WIN_COUNT }).map((_, i) => {
            const label = personalLabels[i] ?? "";
            const ticked = !!state.personalTicks[i];
            const isEditing = editingIndex === i;

            return (
              <li key={i} className="border-b border-border/70 last:border-b-0">
                <div className="flex items-center gap-3 py-4 px-4">
                  {label.trim() !== "" && (
                    <button
                      type="button"
                      onClick={() => togglePersonal(i)}
                      aria-pressed={ticked}
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all"
                      style={{
                        borderColor: ticked ? "var(--color-rose)" : "var(--color-border)",
                        backgroundColor: ticked ? "var(--color-rose)" : "transparent",
                      }}
                    >
                      {ticked && (
                        <svg
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
                  )}

                  <div className="flex-1">
                    {isEditing ? (
                      <input
                        autoFocus
                        type="text"
                        value={label}
                        onChange={(e) => updatePersonalLabel(i, e.target.value)}
                        onBlur={() => setEditingIndex(null)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") setEditingIndex(null);
                        }}
                        placeholder={`Personal habit ${i + 1}…`}
                        className="w-full text-[15px] outline-none bg-transparent"
                        style={{ color: "var(--color-foreground)" }}
                        maxLength={60}
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setEditingIndex(i)}
                        className="w-full text-left"
                        style={{
                          opacity: ticked ? 0.55 : 1,
                          textDecoration: ticked ? "line-through" : "none",
                        }}
                      >
                        <span
                          className="text-[15px]"
                          style={{
                            color: label.trim()
                              ? "var(--color-foreground)"
                              : "var(--color-muted-foreground)",
                          }}
                        >
                          {label.trim() || `Tap to add habit ${i + 1}…`}
                        </span>
                      </button>
                    )}
                  </div>

                  {!isEditing && (
                    <button
                      type="button"
                      onClick={() => setEditingIndex(i)}
                      className="shrink-0 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                      aria-label="Edit habit"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Glow Wins button */}
      <div className="mt-12 flex flex-col items-center">
        <Link
          to="/wins"
          className="flex h-14 w-full items-center justify-center rounded-full text-[15px] font-medium tracking-wide text-primary-foreground shadow-[0_8px_24px_-12px_rgba(214,51,108,0.6)]"
          style={{ backgroundColor: "var(--color-rose)" }}
        >
          Show Today's Glow Wins
        </Link>
      </div>

    </main>
  );
}
