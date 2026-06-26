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
  const { hydrated, total, perSection, highest, lowest, resetToday } = useChecklist();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate();

  if (!hydrated) return <div className="h-screen" />;

  if (total === 20) {
    return (
      <main className="px-6 pt-12">
        <Header />
        <div
          className="mt-6 rounded-3xl px-6 py-10 text-center"
          style={{ backgroundColor: "var(--color-baby)" }}
        >
          <div
            className="text-[11px] uppercase tracking-[0.28em]"
            style={{ color: "var(--color-rose)" }}
          >
            20 / 20
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
          <p className="mt-4 text-[15px] italic text-muted-foreground">
            See you tomorrow, my lovely.
          </p>
        </div>
        <BottomButtons
          onReset={() => setConfirmOpen(true)}
        />
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

  const band = SCORE_BANDS.find((b) => total <= b.max)!;

  // Re-derive highest/lowest with sensible behaviour:
  // - highest: must have at least 1 tick, else null
  // - lowest with tie-break: order from spec
  const sectionScores = TIE_BREAK_ORDER.map((id) => ({
    id,
    score: perSection[id],
    of: SECTION_TOTALS[id],
    ratio: perSection[id] / SECTION_TOTALS[id],
  }));

  const positive = sectionScores.filter((s) => s.score > 0);
  const topId = positive.length
    ? positive.slice().sort((a, b) => b.ratio - a.ratio || a.id.localeCompare(b.id))[0].id
    : null;

  // lowest: lowest ratio; tie-break by TIE_BREAK_ORDER (already sorted that way)
  let lowestSection = sectionScores[0];
  for (const s of sectionScores) {
    if (s.ratio < lowestSection.ratio) lowestSection = s;
  }
  const lowId = lowestSection.id;
  const lowZero = lowestSection.score === 0;

  void highest;
  void lowest;

  return (
    <main className="px-6 pt-10">
      <Header />

      <div className="mt-4 text-[15px] text-muted-foreground">
        You completed{" "}
        <span className="font-medium text-foreground">{total} of 20</span> habits today.
      </div>

      <div className="mt-6 rounded-3xl bg-baby px-5 py-6">
        <h2 className="text-[26px] leading-tight">{band.headline}</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-foreground">{band.note}</p>
      </div>

      <section className="mt-10">
        <h3
          className="text-[11px] uppercase tracking-[0.28em]"
          style={{ color: "var(--color-rose)" }}
        >
          Section breakdown
        </h3>
        <ul className="mt-3 divide-y divide-border">
          {TIE_BREAK_ORDER.map((id) => (
            <li key={id} className="flex items-center justify-between py-3">
              <span className="text-[15px]">{SECTION_TITLE[id]}</span>
              <span className="font-display text-lg">
                {perSection[id]}
                <span className="text-muted-foreground">/{SECTION_TOTALS[id]}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {topId && (
        <section className="mt-10">
          <h3
            className="text-[11px] uppercase tracking-[0.28em]"
            style={{ color: "var(--color-rose)" }}
          >
            What you nailed today
          </h3>
          <h4 className="mt-2 text-[22px]">{SECTION_TITLE[topId]}</h4>
          <p className="mt-2 text-[15px] leading-relaxed text-foreground">
            {NAILED_NOTE[topId]}
          </p>
        </section>
      )}

      <section className="mt-10">
        <h3
          className="text-[11px] uppercase tracking-[0.28em]"
          style={{ color: "var(--color-rose)" }}
        >
          Tomorrow's easiest win
        </h3>
        <h4 className="mt-2 text-[22px]">{SECTION_TITLE[lowId]}</h4>
        <p className="mt-2 text-[15px] leading-relaxed text-foreground">
          {lowZero ? `${ZERO_PREFIX[lowId]} ` : ""}
          {TOMORROW_WIN[lowId]}
        </p>
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
    <div className="mt-12 flex flex-col items-center gap-3 pb-4">
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
