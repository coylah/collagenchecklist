export type SectionId = "hydration" | "food" | "skincare" | "movement" | "soul";

export type Habit = {
  id: string;
  section: SectionId;
  label: string;
  helper?: string;
  examples?: string[];
  tag?: string;
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
    id: "h-hydrating-food",
    section: "hydration",
    label: "Ate something hydrating today",
    helper: "Hydration isn't just about water. Cucumber, watermelon, oranges, berries, soups — all count. A simple way to top up without even thinking about it.",
    examples: ["Cucumber", "Watermelon", "Oranges", "Berries", "Celery", "Soup", "Melon"],
  },
  {
    id: "h-avoid-dehydrators",
    section: "hydration",
    label: "Stayed mindful of things that dehydrate me",
    helper: "Excess caffeine, alcohol, salty snacks and sugary drinks all pull hydration out of your skin. No guilt here — just awareness. If you had any, a little extra water helps balance things out.",
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
    id: "s-ritual",
    section: "skincare",
    label: "Treated my skincare like a ritual, not a rush",
    helper: "Took an extra minute. Massaged it in. Noticed how your skin felt. It sounds small but the intention behind what you do matters as much as what you use.",
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
    id: "m-pause",
    section: "movement",
    label: "Took an intentional pause today",
    helper: "Not just collapsing on the sofa — but actually choosing to stop. A few slow breaths. A quiet cup of tea with your phone face down. Five minutes of not being needed by anyone. That's the one.",
  },
  {
    id: "m-sleep",
    section: "movement",
    label: "Followed a healthy sleep routine tonight",
    helper: "Same-ish bedtime most nights. Phone down 30 minutes before. Dim the lights. Nothing stimulating before bed. Your skin regenerates collagen while you sleep — the routine matters as much as the hours.",
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
    examples: ["Music", "Reading", "Lipstick", "Fresh air", "Creating", "Laughing", "Coffee in peace", "Anything."],
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

// Multiple varied responses per section — picked by day of year so they rotate
export const NAILED_NOTES: Record<SectionId, string[]> = {
  hydration: [
    "Hydration was your strongest today. It sounds boring until your skin starts to glow — then you understand why I go on about it.",
    "You stayed hydrated today and your skin noticed. Water is the least glamorous habit and the most powerful one.",
    "Hydration on point. This is the one habit that costs nothing and does everything.",
    "You drank your water. I know that sounds like nothing. It's not nothing. Your skin is quietly thriving.",
    "Hydration was your win today. The unglamorous habit that absolutely no serum can replace.",
  ],
  food: [
    "Your plate did the work today. Building collagen from the inside out is exactly what this is about.",
    "Food first — always. What you eat shows up on your skin weeks later. Today's plate was a good investment.",
    "You fed your collagen today. Not with a powder — with actual food. That's the foundation right there.",
    "Collagen Food Day delivered. Build, activate, support, protect — your skin got the full team today.",
    "Your strongest section was food — and that matters more than most people realise. Keep it up.",
  ],
  skincare: [
    "Skincare consistency was your win today. This is exactly where the long-term glow lives — not in the expensive bottles, but in showing up daily.",
    "You did your skincare today. No drama, no skipping, no excuses. That's the whole secret.",
    "Skincare on point. Boring, consistent, effective. Exactly the way I like it.",
    "Your routine showed up today. The results from this aren't instant — but they are inevitable.",
    "Consistent skincare beats expensive skincare every time. You proved that today.",
  ],
  movement: [
    "You moved your body and gave your mind some space today. That combination does more for your skin than most people realise.",
    "Movement and mind both got attention today. Your cortisol levels thank you. So does your skin.",
    "You prioritised your body and your head today. That's not small. That's everything.",
    "Movement was your strongest section. A walked walk, a paused pause, a moment of calm. All of it counts.",
    "You moved. You slowed down. You looked after Future You. That's a good day.",
  ],
  soul: [
    "You looked after the bit no one sees today. Your nervous system, your mood, your sense of self. That matters more than any serum.",
    "Soul was your strongest today. The glow that comes from feeling well on the inside is the one no product can fake.",
    "You showed up for yourself today in the quietest, most important way. Don't underestimate that.",
    "Soul section nailed. Kindness, connection, presence — these are collagen habits too, even if they don't look like it.",
    "You took care of the inside today. And it shows on the outside, always, eventually.",
  ],
};

export const TOMORROW_WINS: Record<SectionId, string[]> = {
  hydration: [
    "Start tomorrow with water before coffee. Put a glass by the kettle tonight so it's already there waiting for you.",
    "Tomorrow, keep a bottle of water somewhere you'll actually see it. Out of sight really does mean out of mind with hydration.",
    "Try hitting 1 litre by lunch tomorrow. It's easier than it sounds if you start early.",
    "Tomorrow morning — water first, everything else second. Just that one habit changes the whole day.",
    "Fill a big bottle tonight and put it somewhere obvious for tomorrow. Future You will be grateful.",
  ],
  food: [
    "Tomorrow, build your plate around Build, Activate, Support, Protect. Your collagen likes a team — not one lonely scoop of powder.",
    "Tomorrow, try getting protein in at breakfast. It sets up your collagen synthesis for the whole day.",
    "Add one more colour to your plate tomorrow. Just one. Greens, reds, oranges, purples — any of them count.",
    "Tomorrow, think about your vitamin C. Berries on your porridge, peppers in your lunch — small additions, real impact.",
    "One healthy fat tomorrow — olive oil, avocado, salmon, walnuts. Your skin barrier needs it.",
  ],
  skincare: [
    "Tomorrow, just do the basics. AM routine. SPF 50. PM routine. Three steps. That's genuinely all it takes.",
    "Tomorrow morning — cleanse, treat, moisturise, SPF. In that order. Don't skip the SPF even if it's cloudy.",
    "Tomorrow evening, don't rush your PM routine. Give it an extra minute. Massage it in. Your skin does its best work overnight.",
    "SPF 50 tomorrow — not SPF 30, not a tinted moisturiser with SPF. The real thing. Pop it in your bag so you can top up.",
    "Tomorrow, treat your skincare like a ritual not a chore. Slow down for two minutes. Notice how your skin feels. It makes a difference.",
  ],
  movement: [
    "Tomorrow, aim for ten minutes of morning daylight and one gentle walk. That's it. No marathon required.",
    "Tomorrow, take one intentional pause. Not scrolling, not rushing — just five minutes of actual stillness.",
    "Try getting outside within an hour of waking tomorrow. Even five minutes of daylight does something good for your whole day.",
    "Tomorrow, do one thing for Future You before bed tonight. Pack the bag. Fill the bottle. Send the message. She'll thank you.",
    "Movement tomorrow doesn't have to be a workout. A walk counts. Dancing in the kitchen counts. Just move.",
  ],
  soul: [
    "Tomorrow, do one small thing just for you. Not for anyone else. Five minutes of feeling like yourself is enough.",
    "Tomorrow, notice three things you're grateful for before you look at your phone. Tiny habit. Genuine impact.",
    "Be a little kinder to yourself tomorrow. You wouldn't speak to a friend the way you sometimes speak to yourself.",
    "Tomorrow, put your phone down for 20 minutes and do something that makes you feel like you. Anything counts.",
    "Connect with someone you care about tomorrow. A message, a call, a coffee. Real connection — not a scroll.",
  ],
};

export const ZERO_PREFIXES: Record<SectionId, string[]> = {
  hydration: [
    "Hydration got away from you today — it happens more than you'd think.",
    "Water was hard to prioritise today — tomorrow, start before you do anything else.",
    "Hydration didn't quite land today — no judgement, just a gentle nudge for tomorrow.",
    "Today was a dry one — tomorrow, get that glass of water in before coffee.",
    "Hydration slipped today — it's the easiest one to forget and the most worth remembering.",
  ],
  food: [
    "Collagen Food Day didn't quite happen today — no judgement.",
    "Food was tricky today — life gets in the way sometimes.",
    "The plate didn't come together today — tomorrow is a fresh start.",
    "Collagen foods got missed today — it happens. Back to it tomorrow.",
    "Food section was quiet today — tomorrow, just focus on one good thing on your plate.",
  ],
  skincare: [
    "Skincare took a back seat today — tomorrow is a fresh start.",
    "The routine got skipped today — it happens. Just pick it back up tomorrow morning.",
    "Skincare didn't happen today — no drama. AM routine tomorrow, that's all.",
    "Today was a no-routine day — that's okay. Tomorrow, just the basics.",
    "Skincare slipped today — tomorrow, cleanse and SPF at minimum. That's enough.",
  ],
  movement: [
    "Movement & Mind didn't get a look in today — that's okay.",
    "Today was a still one — tomorrow, even a ten minute walk counts.",
    "Movement got missed today — no guilt. Just get outside for a bit tomorrow.",
    "Mind and body didn't get much today — tomorrow, one intentional pause is enough.",
    "It was a busy, still day — tomorrow, give yourself ten minutes of daylight and fresh air.",
  ],
  soul: [
    "Soul got squeezed out today — you're only human.",
    "The soul stuff got missed today — tomorrow, do one thing just for you.",
    "Soul section was empty today — that often means you were busy looking after everyone else.",
    "No soul habits today — tomorrow, be a little kinder to yourself. Start there.",
    "Soul got skipped today — tomorrow, five minutes of something that makes you feel like you.",
  ],
};

export function getNailedNote(section: SectionId, date = new Date()): string {
  const notes = NAILED_NOTES[section];
  const day = date.getDate() + date.getMonth() * 31;
  return notes[day % notes.length];
}

export function getTomorrowWin(section: SectionId, date = new Date()): string {
  const wins = TOMORROW_WINS[section];
  const day = date.getDate() + date.getMonth() * 31 + 1;
  return wins[day % wins.length];
}

export function getZeroPrefix(section: SectionId, date = new Date()): string {
  const prefixes = ZERO_PREFIXES[section];
  const day = date.getDate() + date.getMonth() * 31 + 2;
  return prefixes[day % prefixes.length];
}

// Keep these for backwards compatibility
export const NAILED_NOTE: Record<SectionId, string> = {
  hydration: NAILED_NOTES.hydration[0],
  food: NAILED_NOTES.food[0],
  skincare: NAILED_NOTES.skincare[0],
  movement: NAILED_NOTES.movement[0],
  soul: NAILED_NOTES.soul[0],
};

export const TOMORROW_WIN: Record<SectionId, string> = {
  hydration: TOMORROW_WINS.hydration[0],
  food: TOMORROW_WINS.food[0],
  skincare: TOMORROW_WINS.skincare[0],
  movement: TOMORROW_WINS.movement[0],
  soul: TOMORROW_WINS.soul[0],
};

export const ZERO_PREFIX: Record<SectionId, string> = {
  hydration: ZERO_PREFIXES.hydration[0],
  food: ZERO_PREFIXES.food[0],
  skincare: ZERO_PREFIXES.skincare[0],
  movement: ZERO_PREFIXES.movement[0],
  soul: ZERO_PREFIXES.soul[0],
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
