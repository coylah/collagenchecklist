import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { BottomNav } from "../components/BottomNav";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <h1 className="text-6xl">404</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Nothing to see here, my lovely.
        </p>
        <div className="mt-6">
          <Link
            to="/today"
            className="inline-flex h-12 items-center justify-center rounded-full px-6 text-sm text-primary-foreground"
            style={{ backgroundColor: "var(--color-rose)" }}
          >
            Back to today
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Don't panic — try again.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="h-12 rounded-full px-6 text-sm text-primary-foreground"
            style={{ backgroundColor: "var(--color-rose)" }}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1",
      },
      { title: "The Collagen Checklist™ — Tiny habits. Big difference." },
      {
        name: "description",
        content:
          "A daily checklist of tiny habits that quietly support your skin, collagen and glow.",
      },
      { name: "theme-color", content: "#ffffff" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-title", content: "Collagen" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { property: "og:title", content: "The Collagen Checklist™ — Tiny habits. Big difference." },
      { property: "og:description", content: "The Collagen Checklist™ is a mobile-first web app for tracking daily habits that support healthy collagen and skin." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "The Collagen Checklist™ — Tiny habits. Big difference." },
      { name: "description", content: "The Collagen Checklist™ is a mobile-first web app for tracking daily habits that support healthy collagen and skin." },
      { name: "twitter:description", content: "The Collagen Checklist™ is a mobile-first web app for tracking daily habits that support healthy collagen and skin." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/aac3e4bb-e8ec-4480-8235-6b716e74528d/id-preview-7788fad8--0bc19b37-ac09-461e-a547-8da5c021904b.lovable.app-1782476288470.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/aac3e4bb-e8ec-4480-8235-6b716e74528d/id-preview-7788fad8--0bc19b37-ac09-461e-a547-8da5c021904b.lovable.app-1782476288470.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/icon-512.png" },
      { rel: "icon", type: "image/png", href: "/icon-512.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=Inter+Tight:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="mx-auto min-h-screen max-w-md bg-background pb-24">
        <Outlet />
      </div>
      <BottomNav />
    </QueryClientProvider>
  );
}
