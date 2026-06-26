import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useChecklist } from "@/lib/useChecklist";
import { InstallInstructions } from "@/components/InstallInstructions";

export const Route = createFileRoute("/")({
  component: Welcome,
});

function Welcome() {
  const navigate = useNavigate();
  const { hydrated, state, markWelcomed } = useChecklist();

  useEffect(() => {
    if (hydrated && state.welcomed) {
      navigate({ to: "/today", replace: true });
    }
  }, [hydrated, state.welcomed, navigate]);

  const dismiss = () => {
    markWelcomed();
    navigate({ to: "/today" });
  };

  if (!hydrated || state.welcomed) return null;

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
        <p>
          Some days you'll tick loads. Some days life will happen. Both are completely
          normal, my lovely.
        </p>
        <p>
          Every day you show up, your Glow Run grows. Miss a day? Your glow doesn't
          disappear overnight. Just start again.
        </p>
      </div>

      <div
        className="my-10 rounded-2xl px-5 py-5 text-[15px] leading-relaxed"
        style={{ backgroundColor: "var(--color-baby)" }}
      >
        <p className="font-medium">Five areas. Five habits each. Twenty-five tiny wins a day.</p>
        <ul className="mt-3 space-y-1.5 text-muted-foreground">
          <li>💧 Hydration</li>
          <li>🥗 Collagen Food Day</li>
          <li>✨ Skincare</li>
          <li>🌿 Movement & Mind</li>
          <li>🤍 Soul</li>
        </ul>
      </div>

      <h2 className="text-2xl">Save to Home Screen</h2>
      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
        This works best when it's saved like an app. That way you'll actually see it every
        day instead of losing it in your browser tabs.
      </p>

      <div className="mt-6">
        <InstallInstructions />
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
