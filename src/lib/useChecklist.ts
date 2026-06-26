import { useCallback, useEffect, useState } from "react";
import { HABITS, SECTION_TOTALS, TIE_BREAK_ORDER, todayKey, type SectionId } from "./habits";

const KEY = "cc:state";
const HISTORY_KEY = "cc:history";
const PERSONAL_LABELS_KEY = "cc:personal-labels";

const PERSONAL_WIN_COUNT = 5;

type State = {
  welcomed: boolean;
  date: string;
  ticks: Record<string, boolean>;
  personalTicks: Record<number, boolean>;
};

type DayRecord = {
  date: string;
  total: number;
};

const empty = (): State => ({
  welcomed: false,
  date: todayKey(),
  ticks: {},
  personalTicks: {},
});

function load(): State {
  if (typeof window === "undefined") return empty();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as Partial<State>;
    const s: State = {
      welcomed: !!parsed.welcomed,
      date: parsed.date ?? todayKey(),
      ticks: parsed.ticks ?? {},
      personalTicks: parsed.personalTicks ?? {},
    };
    if (s.date !== todayKey()) {
      return {
        welcomed: s.welcomed,
        date: todayKey(),
        ticks: {},
        personalTicks: {},
      };
    }
    return s;
  } catch {
    return empty();
  }
}

function loadHistory(): DayRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as DayRecord[];
  } catch {
    return [];
  }
}

function loadPersonalLabels(): string[] {
  if (typeof window === "undefined") return Array(PERSONAL_WIN_COUNT).fill("");
  try {
    const raw = window.localStorage.getItem(PERSONAL_LABELS_KEY);
    if (!raw) return Array(PERSONAL_WIN_COUNT).fill("");
    const parsed = JSON.parse(raw) as string[];
    // Ensure always 5 slots
    const result = Array(PERSONAL_WIN_COUNT).fill("");
    parsed.forEach((v, i) => { if (i < PERSONAL_WIN_COUNT) result[i] = v; });
    return result;
  } catch {
    return Array(PERSONAL_WIN_COUNT).fill("");
  }
}

function savePersonalLabels(labels: string[]) {
  try {
    window.localStorage.setItem(PERSONAL_LABELS_KEY, JSON.stringify(labels));
  } catch { /* ignore */ }
}

function saveHistory(history: DayRecord[]) {
  try {
    const trimmed = history.slice(-90);
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  } catch { /* ignore */ }
}

function save(s: State) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
  } catch { /* ignore */ }
}

function getPrevDay(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  d.setDate(d.getDate() - 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function calcStreak(history: DayRecord[]): number {
  if (history.length === 0) return 0;

  const activeDates = new Set(
    history.filter((d) => d.total > 0).map((d) => d.date)
  );

  if (activeDates.size === 0) return 0;

  const today = todayKey();
  const yesterday = getPrevDay(today);

  const startDate = activeDates.has(today)
    ? today
    : activeDates.has(yesterday)
    ? yesterday
    : null;

  if (!startDate) return 0;

  let streak = 0;
  let current = startDate;
  while (activeDates.has(current)) {
    streak++;
    current = getPrevDay(current);
  }

  return streak;
}

export function getStreakLabel(streak: number): string {
  if (streak === 0) return "";
  if (streak === 1) return "Day 1 — your glow run starts here.";
  if (streak < 4) return `${streak} days glowing.`;
  if (streak < 7) return `${streak} days in a row. You're building something.`;
  if (streak === 7) return "7 days. One whole week. That's a habit forming.";
  if (streak < 14) return `${streak} days. Your skin has definitely noticed.`;
  if (streak === 14) return "Two weeks straight. I'm genuinely proud of you.";
  if (streak < 21) return `${streak} days running. You're not stopping now.`;
  if (streak === 21) return "21 days. Science says that's a habit. You did that.";
  if (streak < 30) return `${streak} days. You're on a proper glow run now.`;
  if (streak === 30) return "30 days. A whole month. You're a force.";
  return `${streak} days and counting. Unstoppable.`;
}

export function getMissedStreakMessage(streak: number): string {
  if (streak === 0) return "Today is a fresh start. Let's go.";
  if (streak < 5) return "Your glow doesn't disappear overnight. Pick back up today.";
  if (streak < 14) return `You had a ${streak}-day run. That doesn't vanish. Start again today.`;
  return `${streak} days of good habits don't just disappear. You know what to do. Start today.`;
}

export function useChecklist() {
  const [state, setState] = useState<State>(() => empty());
  const [history, setHistory] = useState<DayRecord[]>([]);
  const [personalLabels, setPersonalLabels] = useState<string[]>(() =>
    Array(PERSONAL_WIN_COUNT).fill("")
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(load());
    setHistory(loadHistory());
    setPersonalLabels(loadPersonalLabels());
    setHydrated(true);
  }, []);

  // Daily rollover while app is open
  useEffect(() => {
    const i = setInterval(() => {
      setState((s) => {
        if (s.date !== todayKey()) {
          return { ...s, date: todayKey(), ticks: {}, personalTicks: {} };
        }
        return s;
      });
    }, 60_000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    if (hydrated) save(state);
  }, [state, hydrated]);

  // Save today's running total to history on every tick
  useEffect(() => {
    if (!hydrated) return;
    const todayTotal = HABITS.filter((h) => state.ticks[h.id]).length;
    const today = todayKey();

    if (todayTotal === 0) return;

    setHistory((prev) => {
      const existing = prev.find((d) => d.date === today);
      let updated: DayRecord[];
      if (existing) {
        updated = prev.map((d) =>
          d.date === today ? { ...d, total: todayTotal } : d
        );
      } else {
        updated = [...prev, { date: today, total: todayTotal }];
      }
      saveHistory(updated);
      return updated;
    });
  }, [state.ticks, hydrated]);

  const toggle = useCallback((id: string) => {
    setState((s) => ({ ...s, ticks: { ...s.ticks, [id]: !s.ticks[id] } }));
  }, []);

  const togglePersonal = useCallback((index: number) => {
    setState((s) => ({
      ...s,
      personalTicks: {
        ...s.personalTicks,
        [index]: !s.personalTicks[index],
      },
    }));
  }, []);

  const updatePersonalLabel = useCallback((index: number, label: string) => {
    setPersonalLabels((prev) => {
      const updated = [...prev];
      updated[index] = label;
      savePersonalLabels(updated);
      return updated;
    });
  }, []);

  // Safe reset — saves today's score to history BEFORE wiping ticks
  const resetToday = useCallback(() => {
    setState((s) => {
      const todayTotal = HABITS.filter((h) => s.ticks[h.id]).length;
      const today = todayKey();

      if (todayTotal > 0) {
        setHistory((prev) => {
          const existing = prev.find((d) => d.date === today);
          let updated: DayRecord[];
          if (existing) {
            updated = prev.map((d) =>
              d.date === today ? { ...d, total: todayTotal } : d
            );
          } else {
            updated = [...prev, { date: today, total: todayTotal }];
          }
          saveHistory(updated);
          return updated;
        });
      }

      return { ...s, date: todayKey(), ticks: {}, personalTicks: {} };
    });
  }, []);

  const markWelcomed = useCallback(() => {
    setState((s) => ({ ...s, welcomed: true }));
  }, []);

  const total = HABITS.filter((h) => state.ticks[h.id]).length;

  const perSection = HABITS.reduce(
    (acc, h) => {
      if (state.ticks[h.id]) acc[h.section] += 1;
      return acc;
    },
    { hydration: 0, food: 0, skincare: 0, movement: 0, soul: 0 } as Record<SectionId, number>,
  );

  const highest = (() => {
    let best: SectionId = TIE_BREAK_ORDER[0];
    let bestRatio = -1;
    for (const id of TIE_BREAK_ORDER) {
      const r = perSection[id] / SECTION_TOTALS[id];
      if (r > bestRatio) {
        bestRatio = r;
        best = id;
      }
    }
    return best;
  })();

  const lowest = (() => {
    let worst: SectionId = TIE_BREAK_ORDER[0];
    let worstRatio = Infinity;
    for (const id of TIE_BREAK_ORDER) {
      const r = perSection[id] / SECTION_TOTALS[id];
      if (r < worstRatio) {
        worstRatio = r;
        worst = id;
      }
    }
    return worst;
  })();

  const streak = calcStreak(history);

  // Personal wins scoring — only counts filled slots
  const filledPersonalSlots = personalLabels.filter((l) => l.trim() !== "").length;
  const tickedPersonalSlots = personalLabels.filter(
    (l, i) => l.trim() !== "" && state.personalTicks[i]
  ).length;

  return {
    hydrated,
    state,
    toggle,
    togglePersonal,
    resetToday,
    markWelcomed,
    total,
    perSection,
    highest,
    lowest,
    streak,
    getStreakLabel,
    getMissedStreakMessage,
    personalLabels,
    updatePersonalLabel,
    filledPersonalSlots,
    tickedPersonalSlots,
    PERSONAL_WIN_COUNT,
  };
}
