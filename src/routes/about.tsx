import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About The Collagen Checklist" },
    ],
  }),
  component: AboutPage,
});

const SECTIONS_PREVIEW = [
  { icon: "💧", title: "Hydration", description: "The boring basic that quietly does the most." },
  { icon: "🥗", title: "Collagen Food Day", description: "Build, activate, support and protect — from your plate." },
  { icon: "✨", title: "Skincare", description: "Consistent beats expensive. Every time." },
  { icon: "🌿", title: "Movement & Mind", description: "Support your body. Give your mind some space." },
  { icon: "🤍", title: "Soul", description: "The bit that makes everything else work." },
  { icon: "⭐", title: "Your Personal Wins", description: "Up to 5 habits you choose yourself. Just for you." },
];

const SECTION_COLORS: Record<string, string> = {
  "💧": "#E8F4FD",
  "🥗": "#F0F7EE",
  "✨": "#FDF0F5",
  "🌿": "#F5F0FB",
  "🤍": "#FDF5F0",
  "⭐": "#FAF7F0",
};

function AboutPage() {
  return (
    <main className="px-6 pt-12 pb-24">

      {/* Header */}
      <div
        className="text-[11px] uppercase tracking-[0.28em]"
        style={{ color: "var(--color-rose)" }}
      >
        About
      </div>
      <h1 className="mt-3 text-4xl leading-[1.05]">
        The Collagen
        <br />
        Checklist
        <span className="align-top text-base">™</span>
      </h1>
      <p className="mt-4 text-lg italic text-muted-foreground">
        Tiny habits. Big difference.
      </p>

      {/* Intro */}
      <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-foreground">
        <p>
          Most of us don't need another £80 serum. We need the simple daily habits that
          actually support our skin, collagen, energy and confidence.
        </p>
        <p>
          This checklist isn't about perfection. It's about helping you remember the boring
          basics that quietly make the biggest difference.
        </p>
      </div>

      {/* How it works */}
      <div className="mt-10">
        <div
          className="text-[11px] uppercase tracking-[0.28em]"
          style={{ color: "var(--color-rose)" }}
        >
          How it works
        </div>
        <h2 className="mt-2 text-[26px]">Five sections. Five habits each.</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          Every day you get 25 habits across five areas that genuinely support your skin, collagen and wellbeing. Tick what you've done. No judgement on what you haven't.
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          The checklist resets automatically at midnight every day — you don't need to do anything. Just come back tomorrow and start fresh.
        </p>
      </div>

      {/* Section preview cards */}
      <div className="mt-6 space-y-3">
        {SECTIONS_PREVIEW.map((s) => (
          <div
            key={s.title}
            className="flex items-center gap-4 rounded-2xl px-5 py-4"
            style={{ backgroundColor: SECTION_COLORS[s.icon] }}
          >
            <span className="text-2xl">{s.icon}</span>
            <div>
              <div className="text-[13px] font-medium text-foreground">{s.title}</div>
              <div className="text-[12px] text-muted-foreground mt-0.5">{s.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Personal Wins explained */}
      <div className="mt-10">
        <div
          className="text-[11px] uppercase tracking-[0.28em]"
          style={{ color: "var(--color-rose)" }}
        >
          Your Personal Wins
        </div>
        <h2 className="mt-2 text-[26px]">Make it yours</h2>
        <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-foreground">
          <p>
            At the bottom of the checklist you'll find five blank habit slots. Tap the pencil icon next to any slot and write in a habit that matters to you personally.
          </p>
          <p>
            Want to change them? Just tap the pencil again anytime. Your habits don't have to stay the same — swap them out whenever you like.
          </p>
          <p>
            These don't affect your main score — they're completely separate and just for you. Your labels save automatically and carry over each day.
          </p>
        </div>
      </div>

      {/* Glow Run explained */}
      <div
        className="mt-10 rounded-2xl px-5 py-5"
        style={{ backgroundColor: "var(--color-baby)" }}
      >
        <div
          className="text-[11px] uppercase tracking-[0.28em]"
          style={{ color: "var(--color-rose)" }}
        >
          Your Glow Run
        </div>
        <h2 className="mt-2 text-[22px]">Show up every day. Watch it grow.</h2>
        <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-foreground">
          <p>
            Every day you tick at least one habit, your Glow Run grows. Day 1 starts the moment you begin.
          </p>
          <p>
            The checklist resets at midnight automatically — so your Glow Run is measured by how many days in a row you come back and tick something. You don't need to do anything to move to the next day.
          </p>
          <p>
            Miss a day? Your glow doesn't disappear overnight. Just pick back up and keep going. The streak is there to encourage you, not shame you.
          </p>
          <p className="italic text-muted-foreground">
            Some days you'll tick loads. Some days life will happen. Both are completely normal, my lovely.
          </p>
        </div>
      </div>

      {/* Glow Wins explained */}
      <div className="mt-10">
        <div
          className="text-[11px] uppercase tracking-[0.28em]"
          style={{ color: "var(--color-rose)" }}
        >
          Glow Wins
        </div>
        <h2 className="mt-2 text-[26px]">Your daily results</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-foreground">
          Tap Glow Wins at the end of the day to see what you nailed, where you can focus tomorrow, and your full section breakdown. Your results are honest and encouraging whatever your score.
        </p>
      </div>

      {/* Save to phone */}
      <div className="mt-10">
        <div
          className="text-[11px] uppercase tracking-[0.28em]"
          style={{ color: "var(--color-rose)" }}
        >
          Save to Home Screen
        </div>
        <h2 className="mt-2 text-[26px]">Use it like an app</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          This works best when it's saved to your home screen — that way you'll actually see it every day instead of losing it in your browser tabs.
        </p>

        <div className="mt-6 space-y-4">
          <div
            className="rounded-2xl px-5 py-5"
            style={{ backgroundColor: "var(--color-baby)" }}
          >
            <div className="text-[13px] font-medium text-foreground mb-3">
              On iPhone (Safari)
            </div>
            <ol className="space-y-2 text-[14px] text-muted-foreground">
              <li>1. Open this page in Safari</li>
              <li>2. Tap the Share button at the bottom of the screen</li>
              <li>3. Scroll down and tap <span className="text-foreground font-medium">"Add to Home Screen"</span></li>
              <li>4. Tap <span className="text-foreground font-medium">Add</span> in the top right</li>
            </ol>
          </div>

          <div
            className="rounded-2xl px-5 py-5"
            style={{ backgroundColor: "var(--color-baby)" }}
          >
            <div className="text-[13px] font-medium text-foreground mb-3">
              On Android (Chrome)
            </div>
            <ol className="space-y-2 text-[14px] text-muted-foreground">
              <li>1. Open this page in Chrome</li>
              <li>2. Tap the three dots menu in the top right</li>
              <li>3. Tap <span className="text-foreground font-medium">"Add to Home Screen"</span></li>
              <li>4. Tap <span className="text-foreground font-medium">Add</span></li>
            </ol>
          </div>
        </div>
      </div>

      {/* Sign off */}
      <div className="mt-10 text-[15px] leading-relaxed text-muted-foreground italic">
        <p>Remember — consistency beats expensive. Every single time.</p>
        <p
          className="mt-3"
          style={{
            fontFamily: "Dancing Script, cursive",
            fontSize: "20px",
            color: "var(--color-rose)",
          }}
        >
          Love Coylah x
        </p>
      </div>

    </main>
  );
}
