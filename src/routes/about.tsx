import { createFileRoute } from "@tanstack/react-router";
import { WelcomePage } from "./index";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About The Collagen Checklist" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return <WelcomePage />;
}
