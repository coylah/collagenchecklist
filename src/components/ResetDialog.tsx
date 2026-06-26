export function ResetDialog({
  open,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-4 pb-6 pt-10 sm:items-center"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-3xl bg-background p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl">Ready for a fresh day?</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          This clears today's checklist.
        </p>
        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            onClick={onConfirm}
            className="h-12 rounded-full text-sm font-medium tracking-wide text-primary-foreground"
            style={{ backgroundColor: "var(--color-rose)" }}
          >
            Start New Day
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="h-12 rounded-full text-sm text-foreground"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
