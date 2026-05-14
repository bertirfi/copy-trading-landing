"use client";

import Image from "next/image";
import { useFadeIn } from "@/lib/hooks";
import { GROWTH_POINTS } from "@/lib/config";

const proofImages = [
  "/uploads/WhatsApp Image 2026-05-10 at 12.35.40 (2).jpeg",
  "/uploads/WhatsApp Image 2026-05-10 at 12.35.39.jpeg",
  "/uploads/WhatsApp Image 2026-05-10 at 12.35.40 (1).jpeg",
  "/uploads/WhatsApp Image 2026-05-10 at 12.35.40.jpeg",
];

export function Performance() {
  const ref = useFadeIn();
  const W = 700,
    H = 240;
  const pL = 50,
    pR = 10,
    pT = 15,
    pB = 30;
  const cW = W - pL - pR,
    cH = H - pT - pB;
  const maxV = 25;
  const pts = GROWTH_POINTS.map((v, i) => ({
    x: pL + (i / (GROWTH_POINTS.length - 1)) * cW,
    y: pT + cH - (v / maxV) * cH,
  }));
  const line = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");
  const area =
    line +
    ` L${pts[pts.length - 1].x.toFixed(1)},${pT + cH} L${pL},${pT + cH} Z`;

  return (
    <section
      id="performance"
      className="py-16 sm:py-20 lg:py-24 bg-secondary fade-in"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider font-heading">
            VERIFIED RESULTS
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mt-5 text-balance">
            2+ Years of Proven Performance
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mt-4 max-w-xl mx-auto text-pretty">
            Independently verified on MyFXBook. Real USD account. Real profits.
            Real withdrawals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 items-start">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 order-2 lg:order-1">
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="text-xs text-gray-400 font-medium mb-1 uppercase tracking-wider">
                ROI
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-primary">
                +89.72%
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="text-xs text-gray-400 font-medium mb-1 uppercase tracking-wider">
                Win Rate
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-bold">87.02%</div>
              <div className="flex h-2 rounded overflow-hidden mt-2.5">
                <div className="bg-success" style={{ width: "87%" }}></div>
                <div className="bg-destructive" style={{ width: "13%" }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span className="text-success">248 wins</span>
                <span className="text-destructive">37 losses</span>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="text-xs text-gray-400 font-medium mb-1 uppercase tracking-wider">
                Max Drawdown
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-[#5CC4FF]">
                0.86%
              </div>
              <div className="text-xs text-gray-400 mt-1">Extremely low risk</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="text-xs text-gray-400 font-medium mb-1 uppercase tracking-wider">
                Verified Balance
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-bold">$132,700</div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 order-1 lg:order-2">
            <div className="text-xs sm:text-sm font-semibold text-gray-300 mb-3 font-heading">
              GROWTH CHART — Nov 2024 to May 2026
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full block">
              <defs>
                <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(36,175,255,0.25)" />
                  <stop offset="100%" stopColor="rgba(36,175,255,0)" />
                </linearGradient>
              </defs>
              {[0, 5, 10, 15, 20, 25].map((v) => {
                const y = pT + cH - (v / maxV) * cH;
                return (
                  <g key={v}>
                    <line
                      x1={pL}
                      y1={y}
                      x2={W - pR}
                      y2={y}
                      stroke="var(--color-border)"
                      strokeWidth="0.5"
                    />
                    <text
                      x={pL - 6}
                      y={y + 3}
                      textAnchor="end"
                      fill="var(--color-gray-400)"
                      fontSize="9"
                      fontFamily="var(--font-sans)"
                    >
                      {v}%
                    </text>
                  </g>
                );
              })}
              <path d={area} fill="url(#perfGrad)" />
              <path
                d={line}
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle
                cx={pts[pts.length - 1].x}
                cy={pts[pts.length - 1].y}
                r="4"
                fill="var(--color-primary)"
              />
              <text
                x={pts[pts.length - 1].x - 6}
                y={pts[pts.length - 1].y - 10}
                fill="var(--color-primary)"
                fontSize="11"
                fontWeight="700"
                textAnchor="end"
              >
                +23.47%
              </text>
            </svg>
          </div>
        </div>

        <div className="mt-10 sm:mt-14">
          <div className="text-xs sm:text-sm font-semibold text-gray-300 mb-4 font-heading text-center">
            LIVE MT5 TRADE RESULTS
          </div>
          <div className="flex gap-4 overflow-x-auto pb-3 scroll-snap-x-mandatory proof-scroll">
            {proofImages.map((src, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-48 sm:w-56 scroll-snap-start rounded-2xl overflow-hidden border border-border bg-black"
              >
                <Image
                  src={src}
                  alt={`Trade results ${i + 1}`}
                  width={220}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
