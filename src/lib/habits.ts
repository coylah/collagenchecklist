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
    intro: ["The bit that makes everything else work."],
  },
];

export const HABITS: Habit[] = [
  // Hydration (5)
  {
    id: "h-water-before-coffee",
    section: "hydration",
    label: "Water before coffee or first drink",
    helper: "A glass before caffeine. Nothing dramatic. Just starts the day right.",
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
    helper: "Drink a little more if it's hot or you've been moving. Your skin will notice.",
  },
  {
    id: "h-no-alcohol",
    section: "hydration",
    label: "Kept alcohol in check today",
    helper: "Alcohol dehydrates skin from the inside out — it's one of the fastest ways to dull your glow. If you did have a drink, alternating with water helps more than you'd think.",
  },
  {
    id: "h-herbal-tea",
    section: "hydration",
    label: "Had a warm drink that wasn't coffee",
    helper: "Herbal teas, warm water with lemon, even a mug of hot water — all count. A lovely way to top up hydration without really trying.",
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
    helper: "Your gut and your skin are more connected than most people realise. A happy gut tends to mean calmer, clearer skin over time.",
    examples: ["Vegetables", "Fruit", "Beans", "Lentils", "Oats", "Seeds", "Wholegrains"],
  },

  // Skincare (5)
  {
    id: "s-am",
    section: "skincare",
    label: "AM routine completed",
    helper: "Cleanse, treat, moisturise. In that order. Doesn't need to be complicated to work.",
  },
  {
    id: "s-spf",
    section: "skincare",
    label: "SPF 50 applied",
    helper: "If you're going to be outdoors today, pop it in your bag so it's there if you need to top up. SPF 50 — not 30, not 'factor 50 moisturiser'. The real thing.",
  },
  {
    id: "s-pm",
    section: "skincare",
    label: "PM routine completed",
    helper: "Cleanse first — always — then your evening actives and moisturiser. This is when your skin does its best repair work, so don't skip it.",
  },
  {
    id: "s-hands-off",
    section: "skincare",
    label: "Kept my hands off my face",
    helper: "Picking, prodding and resting your chin on your hand all add up. Give your skin a quiet day.",
  },
  {
    id: "s-no-impulse",
    section: "skincare",
    label: "No impulse skincare purchases today",
    helper: "Thinking about buying another trending product? Message me first. I genuinely read my messages and I'd much rather help you spend wisely than watch another expensive bottle end up at the back of the cupboard.",
  },

  // Movement & Mind (5)
  {
    id: "m-daylight",
    section: "movement",
    label: "10 minutes of morning daylight",
    helper: "Natural light in the morning helps regulate your body clock, lifts your mood and supports better sleep at night. Even a cloudy ten minutes outside counts.",
  },
  {
    id: "m-movement",
    section: "movement",
    label: "20–30 minutes of movement",
    helper: "Walking absolutely counts. So does dancing in your kitchen. The goal is to move — not to punish yourself.",
  },
  {
    id: "m-slow",
    section: "movement",
    label: "5 minutes without rushing",
    helper: "Give your mind a few minutes to slow down. A quiet cup of tea. A few deep breaths. Sitting in the garden. Whatever works — just stop for five minutes.",
  },
  {
    id: "m-sleep",
    section: "movement",
    label: "In bed at a reasonable time",
    helper: "Sleep is when your skin regenerates collagen, repairs damage and resets. Getting to bed by 10:30 or 11 is genuinely one of the most powerful things you can do for your skin.",
  },
  {
    id: "m-future-you",
    section: "movement",
    label: "Did one thing to lower tomorrow's stress",
    helper: "Packed the bag. Filled the water bottle. Made tomorrow's lunch. Sent the message. Anything that helps Future You — she's worth it.",
  },

  // Soul (5)
  {
    id: "so-gratitude",
    section: "soul",
    label: "Practised 5 minutes of gratitude",
    helper: "Three things you're genuinely grateful for. Doesn't need to be deep — your coffee, the sunshine, a good conversation. Noticing what's good quietly changes everything.",
  },
  {
    id: "so-kind",
    section: "soul",
    label: "Spoke kindly to myself",
    helper: "No skin or body bullying today. We're not doing that. You wouldn't say it to a friend — don't say it to yourself.",
  },
  {
    id: "so-me",
    section: "soul",
    label: "Did something that made me feel like me",
    helper: "Whatever makes you feel like yourself. Even five minutes of it counts.",
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
  {
    id: "so-connect",
    section: "soul",
    label: "Connected with someone I care about",
    helper: "A message, a call, a hug, a coffee. Real connection — not scrolling through someone's feed. Your nervous system knows the difference.",
  },
  {
    id: "so-screen",
    section: "soul",
    label: "Had some time away from my screen",
    helper: "Even 20 minutes without a phone or laptop does something. Your brain needs quiet as much as your skin needs SPF.",
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
  "You don't need to be perfect. You just need to show up.",
  "Small wins stack up faster than you think.",
  "Your skin is paying attention even when you're not.",
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
    note: "Today clearly threw a few curveballs. That's life. Tomorrow doesn't need to be perfect — just choose one easy win and build from there.",
  },
  {
    max: 10,
    headline: "A steady start.",
    note: "You're already doing more than you probably give yourself credit for. These habits compound quietly. Let's build on it tomorrow.",
  },
  {
    max: 15,
    headline: "You're building something real here.",
    note: "This is where the long game lives — not in expensive serums, but in days like today. Keep going.",
  },
  {
    max: 25,
    headline: "Glow foundations nailed.",
    note: "Look at you quietly getting your life together. No detox teas. No 5am ice baths. Just a lot of sensible little habits adding up. This is it.",
  },
];

export const NAILED_NOTE: Record<SectionId, string> = {
  hydration:
    "Hydration was your strongest today. It sounds boring until your skin starts to glow — then you understand why I go on about it.",
  food: "Your plate did the work today. Build, activate, support and protect — all showing up. That's the Collagen Food Day working exactly as it should.",
  skincare:
    "Skincare consistency was on point. This is exactly where the long-term glow lives — not in the expensive bottles, but in the boring daily routine.",
  movement:
    "You moved your body and gave your mind some space today. That combination does more for your skin than most people realise.",
  soul: "You looked after the bit no one sees today. Your nervous system, your mood, your sense of self. That matters more than any serum.",
};

export const TOMORROW_WIN: Record<SectionId, string> = {
  hydration:
    "Start tomorrow with water before coffee. Put a glass by the kettle tonight so it's already there waiting for you.",
  food: "Tomorrow, try building your plate using Build, Activate, Support, Protect. Your collagen likes a team — not one lonely scoop of powder.",
  skincare:
    "Tomorrow, keep skincare boring. AM routine. SPF 50. PM routine. That's where consistency wins. And if you're hovering over another trending serum, message me first.",
  movement:
    "Tomorrow, aim for ten minutes of daylight and one gentle walk. That's it. No marathon required.",
  soul: "Tomorrow, do one small thing just for you. Not for anyone else. Five minutes of feeling like yourself is enough to start.",
};

export const ZERO_PREFIX: Record<SectionId, string> = {
  hydration: "Hydration got away from you today — it happens.",
  food: "Collagen Food Day didn't quite land today — no judgement.",
  skincare: "Skincare took a back seat today — tomorrow is a fresh start.",
  movement: "Movement & Mind didn't get a look in today — that's okay.",
  soul: "Soul got squeezed out today — you're only human.",
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
