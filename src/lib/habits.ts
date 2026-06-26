export type SectionId = "hydration" | "food" | "skincare" | "movement" | "soul";

export type Habit = {
  id: string;
  section: SectionId;
  label: string;
  helper?: string;
  examples?: string[];
  tag?: string; // BUILD / ACTIVATE / etc.
};

export type Section = {
  id: SectionId;
  title: string;
  intro: string[];
};

export const SECTIONS: Section[] = [
  {
    id: "hydration",
    title: "Hydration",
    intro: ["Simple.", "Boring.", "Wildly underrated."],
  },
  {
    id: "food",
    title: "Collagen Food Day",
    intro: ["BUILD.", "ACTIVATE.", "SUPPORT.", "PROTECT."],
  },
  {
    id: "skincare",
    title: "Skincare",
    intro: ["Simple.", "Consistent.", "No bathroom chaos."],
  },
  {
    id: "movement",
    title: "Movement & Mind",
    intro: ["Support.", "Not punishment."],
  },
  {
    id: "soul",
    title: "Soul",
    intro: ["Glow isn't just skincare."],
  },
];

export const HABITS: Habit[] = [
  // Hydration (3)
  {
    id: "h-water-before-coffee",
    section: "hydration",
    label: "Water before coffee or first drink",
    helper: "A glass before caffeine. Nothing dramatic.",
  },
  {
    id: "h-1l-by-lunch",
    section: "hydration",
    label: "1 litre by lunch",
    helper: "Keep a bottle nearby so you're not trying to catch up at 9pm.",
  },
  {
    id: "h-2l-by-evening",
    section: "hydration",
    label: "2 litres by evening",
    helper: "Drink more if it's hot or you've been exercising.",
  },

  // Collagen Food Day (5)
  {
    id: "f-build",
    section: "food",
    tag: "BUILD",
    label: "2 protein sources today",
    examples: ["Eggs", "Greek yoghurt", "Chicken", "Fish", "Prawns", "Tofu", "Beans", "Lentils"],
  },
  {
    id: "f-activate",
    section: "food",
    tag: "ACTIVATE",
    label: "2 vitamin C foods today",
    examples: ["Berries", "Kiwi", "Citrus", "Red peppers", "Yellow peppers", "Broccoli"],
  },
  {
    id: "f-support",
    section: "food",
    tag: "SUPPORT",
    label: "1 healthy fat today",
    examples: ["Olive oil", "Avocado", "Eggs", "Salmon", "Walnuts", "Chia", "Flax"],
  },
  {
    id: "f-protect",
    section: "food",
    tag: "PROTECT",
    label: "3+ colours on my plate today",
    examples: ["Greens", "Reds", "Oranges", "Purples"],
  },
  {
    id: "f-fibre",
    section: "food",
    label: "Fibre or plants today",
    examples: ["Vegetables", "Fruit", "Beans", "Lentils", "Oats", "Seeds", "Wholegrains"],
  },

  // Skincare (5)
  { id: "s-am", section: "skincare", label: "AM routine completed" },
  {
    id: "s-spf",
    section: "skincare",
    label: "SPF 50 applied",
    helper:
      "If you're going to be outdoors today, pop it in your bag so it's there if you need to top up.",
  },
  { id: "s-pm-cleanse", section: "skincare", label: "PM cleanse completed" },
  { id: "s-pm-routine", section: "skincare", label: "PM routine completed" },
  {
    id: "s-no-impulse",
    section: "skincare",
    label: "No impulse skincare purchases today",
    helper:
      "Thinking about buying another trending product? Message me first. I genuinely read my messages and I'd much rather help you spend wisely than watch another expensive bottle end up at the back of the cupboard.",
  },

  // Movement & Mind (4)
  {
    id: "m-daylight",
    section: "movement",
    label: "10 minutes of morning daylight",
    helper: "A great way to support your body clock, mood and sleep rhythm.",
  },
  {
    id: "m-movement",
    section: "movement",
    label: "20–30 minutes of movement",
    helper: "Walking absolutely counts.",
  },
  {
    id: "m-slow",
    section: "movement",
    label: "5 minutes without rushing",
    helper: "Give your mind a few minutes to slow down. Even a quiet cup of tea counts.",
  },
  {
    id: "m-future-you",
    section: "movement",
    label: "Did one thing to lower tomorrow's stress",
    helper:
      "Packed the bag. Filled the water bottle. Made tomorrow's lunch. Sent the message. Anything that helps Future You.",
  },

  // Soul (3)
  { id: "so-gratitude", section: "soul", label: "Practised 5 minutes of gratitude" },
  {
    id: "so-kind",
    section: "soul",
    label: "Spoke kindly to myself",
    helper: "No skin or body bullying today. We're not doing that.",
  },
  {
    id: "so-me",
    section: "soul",
    label: "Did something that made me feel like me",
    examples: [
      "Music",
      "Reading",
      "Lipstick",
      "Fresh air",
      "Creating",
      "Laughing",
      "Coffee in peace",
      "Anything.",
    ],
  },
];

export const SECTION_TOTALS: Record<SectionId, number> = HABITS.reduce(
  (acc, h) => {
    acc[h.section] = (acc[h.section] ?? 0) + 1;
    return acc;
  },
  { hydration: 0, food: 0, skincare: 0, movement: 0, soul: 0 } as Record<SectionId, number>,
);

export const DAILY_MESSAGES = [
  "Morning, my lovely. Let's build your glow.",
  "Water before coffee.",
  "Tiny habits. Big difference.",
  "SPF first. Everything else second.",
  "One good choice still counts.",
  "Consistency beats expensive.",
  "No judgement. Just tick what you've done.",
  "Your collagen likes a team, not one lonely scoop.",
  "The boring basics are usually the magic bit.",
];

export const SECTION_TITLE: Record<SectionId, string> = {
  hydration: "Hydration",
  food: "Collagen Food Day",
  skincare: "Skincare",
  movement: "Movement & Mind",
  soul: "Soul",
};

export const TIE_BREAK_ORDER: SectionId[] = [
  "hydration",
  "food",
  "skincare",
  "movement",
  "soul",
];

export const SCORE_BANDS = [
  {
    max: 5,
    headline: "You showed up. That counts.",
    note: "Today clearly threw a few curveballs. That's life. Tomorrow doesn't need to be perfect. Just choose one easy win.",
  },
  {
    max: 10,
    headline: "A steady start.",
    note: "You're already doing more than you probably give yourself credit for. Let's build on it tomorrow.",
  },
  {
    max: 15,
    headline: "You're building strong habits.",
    note: "These are the little habits that quietly add up over time. Keep going.",
  },
  {
    max: 20,
    headline: "Glow foundations nailed.",
    note: "Look at you quietly getting your life together. No detox teas. No 5am ice baths. Just lots of sensible little habits adding up.",
  },
];

export const NAILED_NOTE: Record<SectionId, string> = {
  hydration:
    "Hydration was your strongest today. The boring basics quietly doing the heavy lifting.",
  food: "Your plate did the work today. Build, activate, support and protect — all showing up.",
  skincare:
    "Skincare consistency was on point. This is exactly where the long-term glow lives.",
  movement:
    "You moved your body and gave your mind a moment. That's the good stuff.",
  soul: "You looked after the bit no one sees today. That matters more than any serum.",
};

export const TOMORROW_WIN: Record<SectionId, string> = {
  hydration:
    "Start with water before coffee tomorrow. One simple habit often makes the rest of the day easier.",
  food: "Tomorrow, try building your plate using Build • Activate • Support • Protect. Your collagen likes a team, not one lonely scoop of powder.",
  skincare:
    "Tomorrow, keep skincare boring. AM routine. SPF 50. PM cleanse. PM routine. That's where consistency wins. And if you're hovering over another trending serum… message me first.",
  movement:
    "Tomorrow, aim for ten minutes of daylight and one gentle walk. No marathon required.",
  soul: "Tomorrow, be a little kinder to yourself. Do one thing that makes you feel like you again.",
};

export const ZERO_PREFIX: Record<SectionId, string> = {
  hydration:
    "Hydration looked like it got away from you today.",
  food: "Collagen Food Day didn't quite happen today.",
  skincare: "Skincare took a back seat today.",
  movement: "Movement & Mind didn't get a look in today.",
  soul: "Soul got squeezed out today.",
};

export function todayKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function dailyMessageFor(date = new Date()): string {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / 86400000);
  return DAILY_MESSAGES[dayOfYear % DAILY_MESSAGES.length];
}
