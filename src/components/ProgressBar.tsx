export function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="w-full">
      <div className="h-[6px] w-full overflow-hidden rounded-full bg-baby">
        <div
          className="h-full rounded-full transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%`, backgroundColor: "var(--color-rose)" }}
        />
      </div>
    </div>
  );
}
