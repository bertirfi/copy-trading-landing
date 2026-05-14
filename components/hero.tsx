"use client";

import { openCalendly } from "@/lib/utils";

const features = [
  ["Min. deposit", "$10"],
  ["No subscription", "fees"],
  ["Withdraw profits", "instantly"],
];

export function Hero() {
  return (
    <section className="pt-[140px] pb-20 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-[-200px] left-[-100px] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(36,175,255,0.08)_0%,transparent_70%)] pointer-events-none"></div>
      <div className="absolute top-[-100px] right-[-150px] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(36,175,255,0.05)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="max-w-[1160px] mx-auto px-6 relative">
        <div className="max-w-[720px] mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/[0.08] border border-primary/[0.18] text-primary text-xs font-bold tracking-[0.08em] font-heading">
            100% AUTOMATED · PASSIVE INCOME
          </span>
          <h1 className="font-heading text-[58px] max-md:text-[44px] max-sm:text-[36px] font-bold tracking-[-0.03em] leading-[1.1] mt-4">
            Stop Trading.
            <br />
            <span className="text-primary">Start Earning.</span>
          </h1>
          <p className="text-gray-200 text-lg mt-5 leading-relaxed max-w-[540px] mx-auto">
            Copy a proven strategy delivering 18-20% monthly returns. No
            experience needed. No manual input. Connect once — profits run
            automatically.
          </p>
          <div className="flex flex-col gap-3 mt-7 items-center">
            {features.map(([pre, bold], i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 text-[15px] text-gray-200"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="text-primary"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>
                  {pre} <strong className="text-white">{bold}</strong>
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-3.5 mt-9 justify-center flex-wrap max-sm:flex-col">
            <a
              href="#"
              onClick={openCalendly}
              className="inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary-dark text-white font-heading font-bold text-base px-8 py-4 rounded-lg border-none cursor-pointer no-underline transition-all hover:from-[#5CC4FF] hover:to-primary hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(36,175,255,0.25)]"
            >
              {"Book a Call — We'll Set You Up"}
              <svg
                width="18"
                height="18"
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
          <p className="mt-3 text-[13px] text-gray-400">
            We walk you through every step — from account creation to your first
            profit.
          </p>
        </div>
      </div>
    </section>
  );
}
