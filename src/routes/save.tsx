import { createFileRoute } from "@tanstack/react-router";
import { InstallInstructions } from "@/components/InstallInstructions";

export const Route = createFileRoute("/save")({
  head: () => ({
    meta: [
      { title: "Save to Phone — The Collagen Checklist" },
      { name: "description", content: "Save the checklist to your home screen so it opens like an app." },
    ],
  }),
  component: SavePage,
});

function SavePage() {
  return (
    <main className="px-6 pt-10">
      <div
        className="text-[11px] uppercase tracking-[0.28em]"
        style={{ color: "var(--color-rose)" }}
      >
        Save to Phone
      </div>
      <h1 className="mt-2 text-[34px] leading-[1.05]">Save to Home Screen</h1>
      <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
        This works best when it's saved like an app. That way you'll actually see it every
        day instead of losing it in your browser tabs.
      </p>
      <div className="mt-8">
        <InstallInstructions />
      </div>
    </main>
  );
}
