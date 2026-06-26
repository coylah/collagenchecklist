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
const WINS_UNLOCK_AT = 15;

export const Route = createFileRoute("/wins")({
  head: () => ({
    meta: [
      { title: "Today's Glow Wins" },
      { name: "description", content: "Your daily glow wins — gentle reflection on the tiny habits you nailed today." },
    ],
  }),
  component: WinsPage,
});

function WinsPage() {
  const { hydrated, total, perSection, resetToday, streak, getStreakLabel } = useChecklist();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate();

  if (!hydrated) return <div className="h-screen" />;

  // Mid-day view — not enough ticked yet
  if (total < WINS_UNLOCK_AT) {
    return (
      <main className="px-6 pt-10 pb-24">
        <Header />
        <div
          className="mt-6 rounded-3xl px-6 py-10 text-center"
          style={{ backgroundColor: "var(--color-baby)" }}
        >
          <div
            className="text-[11px] uppercase tracking-[0.28em]"
            style={{ color: "var(--color-rose)" }}
          >
            Keep going
          </div>
          <h2 className="mt-3 text-[26px] leading-tight">You're on your way.</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-foreground">
            You've ticked {total} of {TOTAL_HABITS} habits so far today.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            Your full Glow Wins unlock at {WINS_UNLOCK_AT}. Come back at the end of the day for your results.
          </p>
        </div>
        <div className="mt-8 flex flex-col items-center gap-3">
          <Link
            to="/today"
            className="flex h-14 w-full items-center justify-center rounded-full text-[15px] font-medium tracking-wide text-primary-foreground shadow-[0_8px_24px_-12px_rgba(214,51,108,0.6)]"
            style={{ backgroundColor: "var(--color-rose)" }}
          >
            Back to Checklist
          </Link>
        </div>
      </main>
    );
  }

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

  // Normal results view
  const band = SCORE_BANDS.find((b) => total <= b.max) ?? SCORE_BANDS[SCORE_BANDS.length - 1];

  const sectionScores = TIE_BREAK_ORDER.map((id) => ({
    id,
    score: perSection[id],
    of: SECTION_TOTALS[id],
    ratio: perSection[id] / SECTION_TOTALS[id],
  }));

  // Top section — must have at least 1 tick, highest ratio wins
  const positive = sectionScores.filter((s) => s.score > 0);
  const topSection = positive.length
    ? positive.slice().sort((a, b) => b.ratio - a.ratio)[0]
    : null;

  // All sections at zero
  const zeroSections = sectionScores.filter((s) => s.score === 0);

  // Lowest section — lowest ratio, if tie pick the one earliest in TIE_BREAK_ORDER
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
              : `${topSection.score} out of ${topSection.of} in ${SECTION_TITLE[topSection.id]} — your strongest section today. ${NAILED_NOTE[topSection.id]}`}
          </p>
        </section>
      )}

      {/* Multiple zero sections callout */}
      {zeroSections.length > 1 && (
        <section className="mt-8">
          <div
            className="text-[11px] uppercase tracking-[0.28em]"
            style={{ color: "var(--color-rose)" }}
          >
            Didn't get a look in today
          </div>
          <p className="mt-2 text-[15px] leading-relaxed text-foreground">
            {zeroSections.map((s) => SECTION_TITLE[s.id]).join(", ")} — all at zero today. That's okay. Tomorrow, just pick one of these and start there.
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

      {/* Section breakdown with mini bars */}
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
