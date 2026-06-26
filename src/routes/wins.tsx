import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useChecklist } from "@/lib/useChecklist";
import {
  NAILED_NOTE,
  SCORE_BANDS,
  SECTION_TITLE,
  SECTION_TOTALS,
  TOMORROW_WIN,
  ZERO_PREFIX,
  TIE_BREAK_ORDER,
} from "@/lib/habits";
import { ResetDialog } from "@/components/ResetDialog";

const TOTAL_HABITS = 25;

export const Route = createFileRoute("/wins")({
  head: () => ({
    meta: [
      { title: "Today's Glow Wins" },
      { name: "description", content: "Your daily glow wins — gentle reflection on the tiny habits you nailed today." },
    ],
  }),
  component: WinsPage,
});

function getPersonalNote(ticked: number, filled: number): string {
  if (filled === 0) return "";
  if (ticked === 0) return "Your personal habits didn't get a look in today — that's okay. They'll be there tomorrow.";
  if (ticked === filled) return "Every single personal habit ticked. You really showed up for yourself today.";
  if (ticked / filled >= 0.6) return `${ticked} out of ${filled} personal habits done. That's a solid effort.`;
  return `${ticked} out of ${filled} personal habits ticked. Every one counts.`;
}

function WinsPage() {
  const {
    hydrated,
    total,
    perSection,
    resetToday,
    streak,
    getStreakLabel,
    filledPersonalSlots,
    tickedPersonalSlots,
  } = useChecklist();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate();

  if (!hydrated) return <div className="h-screen" />;

  // Perfect day
  if (total === TOTAL_HABITS) {
    return (
      <main className="px-6 pt-12 pb-24">
        <Header />
        <div
          className="mt-6 rounded-3xl px-6 py-10 text-center"
          style={{ backgroundColor: "var(--color-baby)" }}
        >
          <div
            className="text-[11px] uppercase tracking-[0.28em]"
            style={{ color: "var(--color-rose)" }}
          >
            {TOTAL_HABITS} / {TOTAL_HABITS}
          </div>
          <h2 className="mt-3 text-[30px] leading-[1.1]">Everything ticked today.</h2>
          <p className="mt-5 text-[15px] leading-relaxed text-foreground">
            Not because perfection matters…
            <br />
            …but because today you made time for yourself.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-foreground">
            I'm really proud of you.
          </p>
          {streak > 0 && (
            <p className="mt-4 text-[15px] font-medium" style={{ color: "var(--color-rose)" }}>
              {getStreakLabel(streak)}
            </p>
          )}
          <p className="mt-4 text-[15px] italic text-muted-foreground">
            See you tomorrow, my lovely.
          </p>
        </div>

        {filledPersonalSlots > 0 && (
          <div
            className="mt-6 rounded-2xl px-5 py-5"
            style={{ backgroundColor: "#FAF7F0" }}
          >
            <div
              className="text-[11px] uppercase tracking-[0.28em]"
              style={{ color: "var(--color-rose)" }}
            >
              Your Personal Wins
            </div>
            <p className="mt-2 text-[15px] leading-relaxed text-foreground">
              {getPersonalNote(tickedPersonalSlots, filledPersonalSlots)}
            </p>
          </div>
        )}

        <BottomButtons onReset={() => setConfirmOpen(true)} />
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

  // Normal results — honest at any score
  const band = SCORE_BANDS.find((b) => total <= b.max) ?? SCORE_BANDS[SCORE_BANDS.length - 1];

  const sectionScores = TIE_BREAK_ORDER.map((id) => ({
    id,
    score: perSection[id],
    of: SECTION_TOTALS[id],
    ratio: perSection[id] / SECTION_TOTALS[id],
  }));

  const positive = sectionScores.filter((s) => s.score > 0);
  const topSection = positive.length
    ? positive.slice().sort((a, b) => b.ratio - a.ratio)[0]
    : null;

  const zeroSections = sectionScores.filter((s) => s.score === 0);

  const lowestSection = sectionScores.slice().sort((a, b) => {
    if (a.ratio !== b.ratio) return a.ratio - b.ratio;
    return TIE_BREAK_ORDER.indexOf(a.id) - TIE_BREAK_ORDER.indexOf(b.id);
  })[0];

  return (
    <main className="px-6 pt-10 pb-24">
      <Header />

      {/* Streak banner */}
      {streak > 0 && (
        <div
          className="mt-4 rounded-2xl px-5 py-3 text-center text-[13px] font-medium"
          style={{ backgroundColor: "var(--color-baby)", color: "var(--color-rose)" }}
        >
          {getStreakLabel(streak)}
        </div>
      )}

      {/* Score summary */}
      <div
        className="mt-6 rounded-3xl px-5 py-6"
        style={{ backgroundColor: "var(--color-baby)" }}
      >
        <div
          className="text-[11px] uppercase tracking-[0.28em]"
          style={{ color: "var(--color-rose)" }}
        >
          Today's score
        </div>
        <h2 className="mt-2 text-[26px] leading-tight">{band.headline}</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-foreground">{band.note}</p>
        <div className="mt-4 text-[13px] text-muted-foreground">
          {total} of {TOTAL_HABITS} habits completed today
        </div>
      </div>

      {/* What you nailed */}
      {topSection && (
        <section className="mt-10">
          <div
            className="text-[11px] uppercase tracking-[0.28em]"
            style={{ color: "var(--color-rose)" }}
          >
            What you nailed today
          </div>
          <h3 className="mt-2 text-[22px]">{SECTION_TITLE[topSection.id]}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-foreground">
            {topSection.score === topSection.of
              ? NAILED_NOTE[topSection.id]
              : `${topSection.score} out of ${topSection.of} in ${SECTION_TITLE[topSection.id]} — your strongest section today. Keep building on it.`}
          </p>
        </section>
      )}

      {/* Multiple zeros callout */}
      {zeroSections.length > 1 && (
        <section className="mt-8">
          <div
            className="text-[11px] uppercase tracking-[0.28em]"
            style={{ color: "var(--color-rose)" }}
          >
            Didn't get a look in today
          </div>
          <p className="mt-2 text-[15px] leading-relaxed text-foreground">
            {zeroSections.map((s) => SECTION_TITLE[s.id]).join(", ")} — all at zero today. That's okay. Tomorrow, just pick one and start there.
          </p>
        </section>
      )}

      {/* Tomorrow's easiest win */}
      <section className="mt-10">
        <div
          className="text-[11px] uppercase tracking-[0.28em]"
          style={{ color: "var(--color-rose)" }}
        >
          Your easiest win tomorrow
        </div>
        <h3 className="mt-2 text-[22px]">{SECTION_TITLE[lowestSection.id]}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-foreground">
          {lowestSection.score === 0
            ? `${ZERO_PREFIX[lowestSection.id]} ${TOMORROW_WIN[lowestSection.id]}`
            : TOMORROW_WIN[lowestSection.id]}
        </p>
      </section>

      {/* Personal Wins — separate section, doesn't affect main score */}
      {filledPersonalSlots > 0 && (
        <section className="mt-10">
          <div
            className="rounded-2xl px-5 py-5"
            style={{ backgroundColor: "#FAF7F0" }}
          >
            <div
              className="text-[11px] uppercase tracking-[0.28em]"
              style={{ color: "var(--color-rose)" }}
            >
              Your Personal Wins
            </div>
            <div className="mt-1 font-display text-[22px]">
              {tickedPersonalSlots}
              <span className="text-base text-muted-foreground">/{filledPersonalSlots}</span>
            </div>
            <p className="mt-2 text-[15px] leading-relaxed text-foreground">
              {getPersonalNote(tickedPersonalSlots, filledPersonalSlots)}
            </p>
          </div>
        </section>
      )}

      {/* Full breakdown */}
      <section className="mt-10">
        <div
          className="text-[11px] uppercase tracking-[0.28em]"
          style={{ color: "var(--color-rose)" }}
        >
          Full breakdown
        </div>
        <ul className="mt-3 divide-y divide-border">
          {TIE_BREAK_ORDER.map((id) => {
            const score = perSection[id];
            const of = SECTION_TOTALS[id];
            const pct = Math.round((score / of) * 100);
            return (
              <li key={id} className="py-3">
                <div className="flex items-center justify-between">
                  <span className="text-[15px]">{SECTION_TITLE[id]}</span>
                  <span className="font-display text-lg">
                    {score}
                    <span className="text-muted-foreground">/{of}</span>
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      backgroundColor:
                        pct === 100 ? "var(--color-rose)" : "var(--color-rose-soft)",
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <BottomButtons onReset={() => setConfirmOpen(true)} />

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

function Header() {
  return (
    <>
      <div
        className="text-[11px] uppercase tracking-[0.28em]"
        style={{ color: "var(--color-rose)" }}
      >
        Glow Wins
      </div>
      <h1 className="mt-2 text-[34px] leading-[1.05]">Today's Glow Wins</h1>
    </>
  );
}

function BottomButtons({ onReset }: { onReset: () => void }) {
  return (
    <div className="mt-12 flex flex-col items-center gap-3">
      <Link
        to="/today"
        className="flex h-14 w-full items-center justify-center rounded-full text-[15px] font-medium tracking-wide text-primary-foreground shadow-[0_8px_24px_-12px_rgba(214,51,108,0.6)]"
        style={{ backgroundColor: "var(--color-rose)" }}
      >
        Back to Checklist
      </Link>
      <button
        type="button"
        onClick={onReset}
        className="h-12 text-sm text-muted-foreground underline-offset-4 hover:underline"
      >
        Start New Day
      </button>
    </div>
  );
}
