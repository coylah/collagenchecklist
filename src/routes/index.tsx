import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useChecklist } from "@/lib/useChecklist";
import { InstallInstructions } from "@/components/InstallInstructions";

export const Route = createFileRoute("/")({
  component: Welcome,
});

const SECTIONS_PREVIEW = [
  { icon: "💧", title: "Hydration", description: "The boring basic that quietly does the most." },
  { icon: "🥗", title: "Collagen Food Day", description: "Build, activate, support and protect — from your plate." },
  { icon: "✨", title: "Skincare", description: "Consistent beats expensive. Every time." },
  { icon: "🌿", title: "Movement & Mind", description: "Support your body. Give your mind some space." },
  { icon: "🤍", title: "Soul", description: "The bit that makes everything else work." },
];

const SECTION_COLORS: Record<string, string> = {
  "💧": "#E8F4FD",
  "🥗": "#F0F7EE",
  "✨": "#FDF0F5",
  "🌿": "#F5F0FB",
  "🤍": "#FDF5F0",
};

export function WelcomePage() {
  return (
    <main className="px-6 pt-12 pb-24">
      <div
        className="text-[11px] uppercase tracking-[0.28em]"
        style={{ color: "var(--color-rose)" }}
      >
        A daily ritual
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

      {/* Section preview cards */}
      <div className="mt-8 space-y-3">
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

      {/* Glow Run explanation */}
      <div
        className="mt-8 rounded-2xl px-5 py-5"
        style={{ backgroundColor: "var(--color-baby)" }}
      >
        <div
          className="text-[11px] uppercase tracking-[0.28em]"
          style={{ color: "var(--color-rose)" }}
        >
          Your Glow Run
        </div>
        <p className="mt-2 text-[15px] leading-relaxed text-foreground">
          Every day you show up and tick your habits, your Glow Run grows.
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
          Day 1 starts today. Miss a day? Your glow doesn't disappear overnight — just pick back up and keep going.
        </p>
        <p className="mt-3 text-[13px] italic text-muted-foreground">
          Some days you'll tick loads. Some days life will happen. Both are completely normal, my lovely.
        </p>
      </div>

      {/* Install instructions */}
      <div className="mt-10">
        <h2 className="text-2xl">Save to Home Screen</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
          This works best saved like an app — that way you'll actually see it every day
          instead of losing it in your browser tabs.
        </p>
        <div className="mt-6">
          <InstallInstructions />
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("welcome-dismiss"));
            }
          }}
          className="h-14 w-full rounded-full text-[15px] font-medium tracking-wide text-primary-foreground shadow-[0_8px_24px_-12px_rgba(214,51,108,0.6)]"
          style={{ backgroundColor: "var(--color-rose)" }}
        >
          I've saved it. Start today's checklist.
        </button>
        <button
          type="button"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("welcome-dismiss"));
            }
          }}
          className="text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          Skip for now
        </button>
      </div>
    </main>
  );
}

function Welcome() {
  const navigate = useNavigate();
  const { hydrated, state, markWelcomed } = useChecklist();
  const [forceShow, setForceShow] = useState(false);

  useEffect(() => {
    if (hydrated && state.welcomed && !forceShow) {
      navigate({ to: "/today", replace: true });
    }
  }, [hydrated, state.welcomed, navigate, forceShow]);

  useEffect(() => {
    const handler = () => {
      markWelcomed();
      navigate({ to: "/today" });
    };
    window.addEventListener("welcome-dismiss", handler);
    return () => window.removeEventListener("welcome-dismiss", handler);
  }, [markWelcomed, navigate]);

  const dismiss = () => {
    markWelcomed();
    navigate({ to: "/today" });
  };

  if (!hydrated) return null;
  if (state.welcomed && !forceShow) return null;

  return (
    <main className="px-6 pt-12 pb-24">
      <div
        className="text-[11px] uppercase tracking-[0.28em]"
        style={{ color: "var(--color-rose)" }}
      >
        A daily ritual
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

      {/* Section preview cards */}
      <div className="mt-8 space-y-3">
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

      {/* Glow Run explanation */}
      <div
        className="mt-8 rounded-2xl px-5 py-5"
        style={{ backgroundColor: "var(--color-baby)" }}
      >
        <div
          className="text-[11px] uppercase tracking-[0.28em]"
          style={{ color: "var(--color-rose)" }}
        >
          Your Glow Run
        </div>
        <p className="mt-2 text-[15px] leading-relaxed text-foreground">
          Every day you show up and tick your habits, your Glow Run grows.
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
          Day 1 starts today. Miss a day? Your glow doesn't disappear overnight — just pick back up and keep going.
        </p>
        <p className="mt-3 text-[13px] italic text-muted-foreground">
          Some days you'll tick loads. Some days life will happen. Both are completely normal, my lovely.
        </p>
      </div>

      {/* Install instructions */}
      <div className="mt-10">
        <h2 className="text-2xl">Save to Home Screen</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
          This works best saved like an app — that way you'll actually see it every day
          instead of losing it in your browser tabs.
        </p>
        <div className="mt-6">
          <InstallInstructions />
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={dismiss}
          className="h-14 w-full rounded-full text-[15px] font-medium tracking-wide text-primary-foreground shadow-[0_8px_24px_-12px_rgba(214,51,108,0.6)]"
          style={{ backgroundColor: "var(--color-rose)" }}
        >
          I've saved it. Start today's checklist.
        </button>
        <button
          type="button"
          onClick={dismiss}
          className="text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          Skip for now
        </button>
      </div>
    </main>
  );
}
