"use client";

import { openCalendly } from "@/lib/utils";

export function FinalCTA() {
  return (
    <section className="py-[100px] bg-[linear-gradient(180deg,var(--color-background)_0%,rgba(36,175,255,0.04)_50%,var(--color-background)_100%)] border-t border-b border-border">
      <div className="max-w-[1160px] mx-auto px-6 text-center">
        <h2 className="font-heading text-[44px] max-sm:text-[28px] font-bold tracking-[-0.025em] leading-[1.15] max-w-[600px] mx-auto">
          Ready to Let Your Money{" "}
          <span className="text-primary">Work for You</span>?
        </h2>
        <p className="text-gray-300 text-[17px] leading-relaxed mt-5 max-w-[540px] mx-auto">
          {"Stop watching from the sidelines. We'll personally walk you through the setup and have you earning within 24 hours."}
        </p>
        <div className="mt-9 flex gap-4 justify-center flex-wrap">
          <a
            href="#"
            onClick={openCalendly}
            className="inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary-dark text-white font-heading font-bold text-lg px-10 py-5 max-sm:px-7 max-sm:py-4 max-sm:text-base rounded-[10px] border-none cursor-pointer no-underline transition-all hover:from-[#5CC4FF] hover:to-primary hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(36,175,255,0.25)]"
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
        <p className="mt-5 text-[13px] text-gray-400">
          Free consultation · No obligation · We guide you every step of the way
        </p>
      </div>
    </section>
  );
}
