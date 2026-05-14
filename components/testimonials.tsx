"use client";

import { useFadeIn } from "@/lib/hooks";
import { TESTIMONIALS } from "@/lib/config";
import { openCalendly, fmt } from "@/lib/utils";

export function TestimonialsSection() {
  const ref = useFadeIn();

  return (
    <section className="py-24 max-sm:py-16 fade-in" ref={ref}>
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/[0.08] border border-primary/[0.18] text-primary text-xs font-bold tracking-[0.08em] font-heading">
            SUCCESS STORIES
          </span>
          <h2 className="font-heading text-[40px] max-sm:text-[30px] font-bold tracking-[-0.025em] leading-[1.15] mt-4">
            Real People. Real Returns.
          </h2>
          <p className="text-gray-300 text-[17px] leading-relaxed mt-3 max-w-[520px] mx-auto">
            These members connected, reinvested, and watched compound interest
            do what it does best.
          </p>
        </div>
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-[14px] p-7 transition-colors hover:border-primary/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm font-heading shrink-0"
                  style={{
                    background: t.color + "22",
                    color: t.color,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-[15px]">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.location}</div>
                </div>
              </div>
              <p className="text-sm text-gray-200 leading-relaxed italic mb-5">
                {`"${t.quote}"`}
              </p>
              <div className="flex items-center gap-4 bg-muted rounded-[10px] px-4 py-3.5">
                <div className="flex flex-col">
                  <span className="text-[11px] text-gray-400 uppercase tracking-[0.04em]">
                    Deposited
                  </span>
                  <span className="font-heading text-xl font-bold">
                    {fmt(t.deposit)}
                  </span>
                </div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="text-primary"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-[11px] text-gray-400 uppercase tracking-[0.04em]">
                    After {t.months} months
                  </span>
                  <span className="font-heading text-xl font-bold text-primary">
                    {fmt(t.result)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="#"
            onClick={openCalendly}
            className="inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary-dark text-white font-heading font-bold text-base px-8 py-4 rounded-lg border-none cursor-pointer no-underline transition-all hover:from-[#5CC4FF] hover:to-primary hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(36,175,255,0.25)]"
          >
            Book a Call — Get the Same Results
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
          <p className="mt-3 text-[13px] text-gray-400">
            We personally guide you to start earning — zero guesswork.
          </p>
        </div>
      </div>
    </section>
  );
}
