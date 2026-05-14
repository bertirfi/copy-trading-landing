"use client";

import { useFadeIn } from "@/lib/hooks";
import { TESTIMONIALS } from "@/lib/config";
import { openCalendly, fmt } from "@/lib/utils";

export function TestimonialsSection() {
  const ref = useFadeIn();

  return (
    <section className="py-16 sm:py-20 lg:py-24 fade-in" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider font-heading">
            SUCCESS STORIES
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mt-5 text-balance">
            Real People. Real Returns.
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mt-4 max-w-lg mx-auto text-pretty">
            These members connected, reinvested, and watched compound interest
            do what it does best.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl p-5 sm:p-7 transition-colors hover:border-primary/20"
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
                  <div className="font-semibold text-base">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.location}</div>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed italic mb-5">
                {`"${t.quote}"`}
              </p>
              <div className="flex items-center gap-4 bg-muted rounded-xl px-4 py-4">
                <div className="flex flex-col">
                  <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">
                    Deposited
                  </span>
                  <span className="font-heading text-lg sm:text-xl font-bold">
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
                  className="text-primary flex-shrink-0"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">
                    After {t.months} months
                  </span>
                  <span className="font-heading text-lg sm:text-xl font-bold text-primary">
                    {fmt(t.result)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12 sm:mt-16">
          <a
            href="#"
            onClick={openCalendly}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-primary to-primary-dark text-white font-heading font-bold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 rounded-xl cursor-pointer transition-all hover:from-[#5CC4FF] hover:to-primary hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(36,175,255,0.3)] w-full sm:w-auto"
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
          <p className="mt-4 text-sm text-gray-400">
            We personally guide you to start earning — zero guesswork.
          </p>
        </div>
      </div>
    </section>
  );
}
