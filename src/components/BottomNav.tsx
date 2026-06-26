import { Link, useRouterState } from "@tanstack/react-router";

const items = [
  { to: "/today", label: "Today" },
  { to: "/wins", label: "Glow Wins" },
  { to: "/save", label: "Save to Phone" },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // Hide on welcome (root) when not yet welcomed — root handles redirect itself.
  if (pathname === "/") return null;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-md items-stretch justify-between px-2 pb-[env(safe-area-inset-bottom)] pt-1">
        {items.map((it) => {
          const active = pathname === it.to;
          return (
            <Link
              key={it.to}
              to={it.to}
              className="flex-1 py-3 text-center text-[11px] uppercase tracking-[0.18em] transition-colors"
              style={{
                color: active ? "var(--color-rose)" : "var(--color-foreground)",
                fontWeight: active ? 600 : 400,
              }}
            >
              {it.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
