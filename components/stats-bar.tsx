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
    <section className="relative z-[2] -mt-5">
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-px bg-border rounded-[14px] overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-card py-7 px-6 max-sm:py-5 max-sm:px-4 text-center"
              ref={s.ref}
            >
              <div className="font-heading text-[28px] max-sm:text-[22px] font-bold text-primary">
                {s.value}
              </div>
              <div className="text-[13px] text-gray-300 mt-1 font-medium">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
