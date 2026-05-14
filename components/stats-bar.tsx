"use client";

import { useCounter } from "@/lib/hooks";

export function StatsBar() {
  const [wr, wrRef] = useCounter(87.02);
  const [dd, ddRef] = useCounter(0.86);
  const [fol, folRef] = useCounter(174511);
  const [wins, winsRef] = useCounter(248);

  const stats = [
    { ref: wrRef, value: wr.toFixed(1) + "%", label: "Win Rate" },
    { ref: ddRef, value: dd.toFixed(2) + "%", label: "Max Drawdown" },
    {
      ref: folRef,
      value: Math.floor(fol).toLocaleString(),
      label: "Followers",
    },
    { ref: winsRef, value: Math.floor(wins).toString(), label: "Winning Trades" },
  ];

  return (
    <section className="relative z-10 -mt-4 sm:-mt-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-card py-6 sm:py-8 px-4 sm:px-6 text-center"
              ref={s.ref}
            >
              <div className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                {s.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-300 mt-1.5 font-medium">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
