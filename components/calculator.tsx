"use client";

import { useState, useCallback, useMemo } from "react";
import { openCalendly, fmt, fmtPct } from "@/lib/utils";

const RATE = 0.18;
const LOG_MIN = Math.log(100);
const LOG_MAX = Math.log(100000);
const DISPLAY_MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 18, 24, 36, 48];
const PRESETS = [100, 500, 1000, 5000, 10000, 50000, 100000];

function sliderToAmount(s: number) {
  return Math.round(Math.exp(LOG_MIN + (s / 1000) * (LOG_MAX - LOG_MIN)));
}

function amountToSlider(a: number) {
  return ((Math.log(Math.max(100, a)) - LOG_MIN) / (LOG_MAX - LOG_MIN)) * 1000;
}

export function CompoundCalculator() {
  const [slider, setSlider] = useState(Math.round(amountToSlider(1000)));
  const [inputVal, setInputVal] = useState("1,000");
  const amount = sliderToAmount(slider);

  const handleSlider = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const s = Number(e.target.value);
    setSlider(s);
    setInputVal(sliderToAmount(s).toLocaleString("en-US"));
  }, []);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    const val = parseInt(raw) || 100;
    setInputVal(Number(raw || 0).toLocaleString("en-US"));
    if (val >= 100 && val <= 100000) {
      setSlider(Math.round(amountToSlider(val)));
    }
  }, []);

  const selectPreset = useCallback((p: number) => {
    setSlider(Math.round(amountToSlider(p)));
    setInputVal(p.toLocaleString("en-US"));
  }, []);

  const rows = useMemo(
    () =>
      DISPLAY_MONTHS.map((m) => {
        const balance = amount * Math.pow(1 + RATE, m);
        return {
          month: m,
          balance,
          totalProfit: balance - amount,
          returnPct: ((balance - amount) / amount) * 100,
        };
      }),
    [amount]
  );

  const chartData = useMemo(
    () => Array.from({ length: 49 }, (_, m) => amount * Math.pow(1 + RATE, m)),
    [amount]
  );
  const maxChart = chartData[48];

  const W = 760,
    H = 280;
  const pL = 70,
    pR = 20,
    pT = 20,
    pB = 40;
  const cW = W - pL - pR,
    cH = H - pT - pB;

  const toX = (m: number) => pL + (m / 48) * cW;
  const toY = (v: number) => pT + cH - (v / maxChart) * cH;

  const linePath = chartData
    .map((v, i) => `${i === 0 ? "M" : "L"}${toX(i).toFixed(1)},${toY(v).toFixed(1)}`)
    .join(" ");
  const areaPath =
    linePath +
    ` L${toX(48).toFixed(1)},${(pT + cH).toFixed(1)} L${pL},${(pT + cH).toFixed(1)} Z`;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => {
    const val = f * maxChart;
    return { y: toY(val), label: fmt(val) };
  });

  const xTicks = [0, 6, 12, 18, 24, 36, 48].map((m) => ({
    x: toX(m),
    label: m + "mo",
  }));

  const milestones = [
    { label: "6 Months", val: amount * Math.pow(1 + RATE, 6) },
    { label: "12 Months", val: amount * Math.pow(1 + RATE, 12) },
    { label: "24 Months", val: amount * Math.pow(1 + RATE, 24) },
    { label: "48 Months", val: amount * Math.pow(1 + RATE, 48) },
  ];

  const progress = (slider / 1000) * 100;

  return (
    <section id="calculator" className="py-24 max-sm:py-16 bg-secondary">
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/[0.08] border border-primary/[0.18] text-primary text-xs font-bold tracking-[0.08em] font-heading">
            COMPOUND GROWTH
          </span>
          <h2 className="font-heading text-[40px] max-sm:text-[30px] font-bold tracking-[-0.025em] leading-[1.15] mt-4">
            See What Your Money Could Become
          </h2>
          <p className="text-gray-300 text-[17px] leading-relaxed mt-3 max-w-[560px] mx-auto">
            Enter your starting deposit. Watch 18% monthly compounding turn
            modest savings into life-changing wealth.
          </p>
        </div>

        <div className="max-w-[560px] mx-auto mb-10">
          <div className="flex items-center justify-between mb-4">
            <label className="font-heading font-semibold text-[15px] text-gray-200">
              Starting Deposit
            </label>
            <div className="flex items-center gap-1.5 bg-card border border-border rounded-[10px] px-4 py-2.5">
              <span className="text-primary font-bold text-xl">$</span>
              <input
                type="text"
                value={inputVal}
                onChange={handleInput}
                className="bg-transparent border-none outline-none text-white font-heading text-[22px] font-bold w-[140px] text-right"
              />
            </div>
          </div>
          <div className="px-1">
            <input
              type="range"
              min="0"
              max="1000"
              value={slider}
              onChange={handleSlider}
              className="calc-slider"
              style={{ "--progress": progress + "%" } as React.CSSProperties}
            />
            <div className="flex justify-between text-[13px] text-gray-400 mt-1">
              <span>$100</span>
              <span>$100,000</span>
            </div>
          </div>
          <div className="flex gap-2 mt-4 flex-wrap justify-center max-sm:gap-1.5">
            {PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => selectPreset(p)}
                className={`px-3.5 py-1.5 rounded-md text-[13px] font-semibold bg-card border border-border text-gray-200 cursor-pointer transition-all font-heading max-sm:px-2.5 max-sm:py-1 max-sm:text-xs hover:border-primary hover:text-primary hover:bg-primary/[0.06] ${
                  Math.abs(amount - p) < p * 0.05
                    ? "border-primary text-primary bg-primary/[0.06]"
                    : ""
                }`}
              >
                {p >= 1000 ? "$" + p / 1000 + "k" : "$" + p}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-2 gap-4 mb-8">
          {milestones.map((ms, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-5 max-sm:p-4 text-center"
            >
              <div className="text-[13px] text-gray-300 mb-1 font-medium">
                {ms.label}
              </div>
              <div className="text-2xl font-bold font-heading text-primary">
                {fmt(ms.val)}
              </div>
              <div className="text-xs text-success mt-0.5">
                +{fmtPct(((ms.val - amount) / amount) * 100)} return
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-[14px] p-6 mb-6">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full block">
            <defs>
              <linearGradient id="calcGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(36,175,255,0.35)" />
                <stop offset="100%" stopColor="rgba(36,175,255,0)" />
              </linearGradient>
            </defs>
            {yTicks.map((t, i) => (
              <g key={i}>
                <line
                  x1={pL}
                  y1={t.y}
                  x2={W - pR}
                  y2={t.y}
                  stroke="var(--color-border)"
                  strokeWidth="0.5"
                />
                <text
                  x={pL - 8}
                  y={t.y + 4}
                  textAnchor="end"
                  fill="var(--color-gray-400)"
                  fontSize="10"
                  fontFamily="var(--font-sans)"
                >
                  {t.label}
                </text>
              </g>
            ))}
            {xTicks.map((t, i) => (
              <text
                key={i}
                x={t.x}
                y={H - 8}
                textAnchor="middle"
                fill="var(--color-gray-400)"
                fontSize="10"
                fontFamily="var(--font-sans)"
              >
                {t.label}
              </text>
            ))}
            <path d={areaPath} fill="url(#calcGrad)" />
            <path
              d={linePath}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <circle
              cx={toX(0)}
              cy={toY(chartData[0])}
              r="4"
              fill="var(--color-foreground)"
            />
            <circle
              cx={toX(48)}
              cy={toY(chartData[48])}
              r="5"
              fill="var(--color-primary)"
              stroke="var(--color-background)"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="overflow-x-auto rounded-[14px] border border-border bg-card">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-3.5 px-5 text-left text-[11px] uppercase tracking-[0.06em] text-gray-400 font-semibold border-b border-border bg-muted">
                  Month
                </th>
                <th className="p-3.5 px-5 text-left text-[11px] uppercase tracking-[0.06em] text-gray-400 font-semibold border-b border-border bg-muted">
                  Balance
                </th>
                <th className="p-3.5 px-5 text-left text-[11px] uppercase tracking-[0.06em] text-gray-400 font-semibold border-b border-border bg-muted">
                  Total Profit
                </th>
                <th className="p-3.5 px-5 text-left text-[11px] uppercase tracking-[0.06em] text-gray-400 font-semibold border-b border-border bg-muted">
                  Return
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const highlight = [6, 12, 24, 48].includes(r.month);
                return (
                  <tr
                    key={r.month}
                    className={highlight ? "bg-primary/[0.04]" : ""}
                  >
                    <td
                      className={`p-3 px-5 text-sm border-b border-border/50 ${
                        highlight ? "font-bold border-primary/10" : ""
                      }`}
                    >
                      {r.month}
                    </td>
                    <td className="p-3 px-5 text-sm border-b border-border/50 font-heading font-semibold text-white">
                      {fmt(r.balance)}
                    </td>
                    <td className="p-3 px-5 text-sm border-b border-border/50 text-success font-semibold">
                      +{fmt(r.totalProfit)}
                    </td>
                    <td className="p-3 px-5 text-sm border-b border-border/50 text-primary">
                      +{fmtPct(r.returnPct)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-10">
          <a
            href="#"
            onClick={openCalendly}
            className="inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary-dark text-white font-heading font-bold text-base px-8 py-4 rounded-lg border-none cursor-pointer no-underline transition-all hover:from-[#5CC4FF] hover:to-primary hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(36,175,255,0.25)]"
          >
            Book a Call — Start Compounding Now
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
          <p className="mt-3 text-[13px] text-gray-400">
            {"We'll help you set up your account and connect to the strategy — completely free."}
          </p>
        </div>
      </div>
    </section>
  );
}
