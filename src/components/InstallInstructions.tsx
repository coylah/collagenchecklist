export function InstallInstructions() {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-lg">iPhone</h3>
        <ol className="mt-2 space-y-1 text-[15px] text-foreground">
          <li>1. Tap Share</li>
          <li>2. Tap Add to Home Screen</li>
          <li>3. Tap Add</li>
        </ol>
      </section>
      <section>
        <h3 className="text-lg">Android / Samsung</h3>
        <ol className="mt-2 space-y-1 text-[15px] text-foreground">
          <li>1. Tap the three-dot menu</li>
          <li>2. Tap Add to Home Screen or Install App</li>
          <li>3. Tap Add</li>
        </ol>
      </section>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Don't panic if your phone words it slightly differently. You're looking for anything that
        says Add to Home Screen or Install App.
      </p>
    </div>
  );
}
