"use client";

import { openCalendly } from "@/lib/utils";

export function FinalCTA() {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-[linear-gradient(180deg,var(--color-background)_0%,rgba(36,175,255,0.04)_50%,var(--color-background)_100%)] border-t border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight max-w-2xl mx-auto text-balance">
          Ready to Let Your Money{" "}
          <span className="text-primary">Work for You</span>?
        </h2>
        <p className="text-gray-300 text-base sm:text-lg leading-relaxed mt-5 max-w-xl mx-auto text-pretty">
          {"Stop watching from the sidelines. We'll personally walk you through the setup and have you earning within 24 hours."}
        </p>
        <div className="mt-10">
          <a
            href="#"
            onClick={openCalendly}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-primary to-primary-dark text-white font-heading font-bold text-lg sm:text-xl px-10 sm:px-12 py-5 sm:py-6 rounded-xl cursor-pointer transition-all hover:from-[#5CC4FF] hover:to-primary hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(36,175,255,0.3)] w-full sm:w-auto"
          >
            Book Your Free Call Now
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
        <p className="mt-5 text-sm text-gray-400">
          Free consultation - No obligation - We guide you every step of the way
        </p>
      </div>
    </section>
  );
}
