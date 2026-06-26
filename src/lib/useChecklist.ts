import { useCallback, useEffect, useState } from "react";
import { HABITS, SECTION_TOTALS, TIE_BREAK_ORDER, todayKey, type SectionId } from "./habits";

const KEY = "cc:state";

type State = {
  welcomed: boolean;
  date: string;
  ticks: Record<string, boolean>;
};

const empty = (): State => ({ welcomed: false, date: todayKey(), ticks: {} });

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
    };
    if (s.date !== todayKey()) {
      return { welcomed: s.welcomed, date: todayKey(), ticks: {} };
    }
    return s;
  } catch {
    return empty();
  }
}

function save(s: State) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

export function useChecklist() {
  const [state, setState] = useState<State>(() => empty());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(load());
    setHydrated(true);
  }, []);

  // Daily rollover while open
  useEffect(() => {
    const i = setInterval(() => {
      setState((s) => (s.date !== todayKey() ? { ...s, date: todayKey(), ticks: {} } : s));
    }, 60_000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    if (hydrated) save(state);
  }, [state, hydrated]);

  const toggle = useCallback((id: string) => {
    setState((s) => ({ ...s, ticks: { ...s.ticks, [id]: !s.ticks[id] } }));
  }, []);

  const resetToday = useCallback(() => {
    setState((s) => ({ ...s, date: todayKey(), ticks: {} }));
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

  return {
    hydrated,
    state,
    toggle,
    resetToday,
    markWelcomed,
    total,
    perSection,
    highest,
    lowest,
  };
}
