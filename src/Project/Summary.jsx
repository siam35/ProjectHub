export default function Summary() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2
            id="summary-heading"
            className="text-base sm:text-lg font-bold text-white tracking-tight"
          >
            Project Summary
          </h2>
          <p className="text-xs text-zinc-400">
            Live operational overview across active clients, deliveries &
            budget.
          </p>
        </div>
      </div>
    </>
  );
}
