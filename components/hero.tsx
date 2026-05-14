"use client";

import { openCalendly } from "@/lib/utils";

const features = [
  ["Min. deposit", "$10"],
  ["No subscription", "fees"],
  ["Withdraw profits", "instantly"],
];

export function Hero() {
  return (
    <section className="pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-[-200px] left-[-100px] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(36,175,255,0.08)_0%,transparent_70%)] pointer-events-none"></div>
      <div className="absolute top-[-100px] right-[-150px] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(36,175,255,0.05)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider font-heading">
            100% AUTOMATED - PASSIVE INCOME
          </span>
          
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mt-6 text-balance">
            Stop Trading.
            <br />
            <span className="text-primary">Start Earning.</span>
          </h1>
          
          <p className="text-gray-200 text-base sm:text-lg mt-6 leading-relaxed max-w-xl mx-auto text-pretty">
            Copy a proven strategy delivering 18-20% monthly returns. No
            experience needed. No manual input. Connect once — profits run
            automatically.
          </p>
          
          <div className="flex flex-col gap-3 mt-8 items-center">
            {features.map(([pre, bold], i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-sm sm:text-base text-gray-200"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="text-primary flex-shrink-0"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>
                  {pre} <strong className="text-white font-semibold">{bold}</strong>
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-10">
            <a
              href="#"
              onClick={openCalendly}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-primary to-primary-dark text-white font-heading font-bold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 rounded-xl cursor-pointer transition-all hover:from-[#5CC4FF] hover:to-primary hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(36,175,255,0.3)] w-full sm:w-auto"
            >
              {"Book a Call — We'll Set You Up"}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
          
          <p className="mt-4 text-sm text-gray-400">
            We walk you through every step — from account creation to your first
            profit.
          </p>
        </div>
      </div>
    </section>
  );
}
