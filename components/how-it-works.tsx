"use client";

import { useFadeIn } from "@/lib/hooks";
import { openCalendly } from "@/lib/utils";

const steps = [
  {
    num: "01",
    title: "Create Your Free Account",
    desc: "Sign up in under 2 minutes. No subscription. No hidden fees. Start with as little as $10.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="text-primary"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Connect to the Trader",
    desc: "One click to copy. Every trade is mirrored automatically to your account. Zero manual input after this step.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="text-primary"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Collect Your Profits",
    desc: "Withdraw anytime, or reinvest to compound. Your money works 24/7 while you live your life.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="text-primary"
      >
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  const ref = useFadeIn();

  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-20 lg:py-24 fade-in"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider font-heading">
            SIMPLE SETUP
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mt-5 text-balance">
            {"Three Steps. That's It."}
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mt-4 max-w-lg mx-auto text-pretty">
            No trading knowledge required. No software to install. The entire
            process takes less than 5 minutes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {steps.map((s, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl p-6 sm:p-8 relative transition-colors hover:border-primary/30 overflow-hidden"
            >
              {/* Step number - positioned absolutely in corner */}
              <div className="absolute top-4 right-5 font-heading text-5xl sm:text-6xl font-bold text-primary/10 select-none">
                {s.num}
              </div>
              
              {/* Icon */}
              <div className="mb-5 relative z-10">{s.icon}</div>
              
              {/* Content */}
              <h3 className="font-heading text-lg sm:text-xl font-semibold mb-3 relative z-10">
                {s.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed relative z-10">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 sm:mt-16">
          <a
            href="#"
            onClick={openCalendly}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-primary to-primary-dark text-white font-heading font-bold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 rounded-xl cursor-pointer transition-all hover:from-[#5CC4FF] hover:to-primary hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(36,175,255,0.3)] w-full sm:w-auto"
          >
            {"Book a Call — Let's Get You Started"}
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
            No tech skills needed — we handle everything for you.
          </p>
        </div>
      </div>
    </section>
  );
}
