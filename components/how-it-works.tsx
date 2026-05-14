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
        width="32"
        height="32"
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
        width="32"
        height="32"
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
        width="32"
        height="32"
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
      className="py-24 max-sm:py-16 fade-in"
      ref={ref}
    >
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/[0.08] border border-primary/[0.18] text-primary text-xs font-bold tracking-[0.08em] font-heading">
            SIMPLE SETUP
          </span>
          <h2 className="font-heading text-[40px] max-sm:text-[30px] font-bold tracking-[-0.025em] leading-[1.15] mt-4">
            {"Three Steps. That's It."}
          </h2>
          <p className="text-gray-300 text-[17px] leading-relaxed mt-3 max-w-[520px] mx-auto">
            No trading knowledge required. No software to install. The entire
            process takes less than 5 minutes.
          </p>
        </div>
        <div className="grid grid-cols-3 max-md:grid-cols-1 gap-6">
          {steps.map((s, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-[14px] p-8 relative transition-colors hover:border-primary/30"
            >
              <div className="mb-4">{s.icon}</div>
              <div className="font-heading text-[48px] font-bold text-primary/10 absolute top-4 right-6">
                {s.num}
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="#"
            onClick={openCalendly}
            className="inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary-dark text-white font-heading font-bold text-[15px] px-7 py-3.5 rounded-lg border-none cursor-pointer no-underline transition-all hover:from-[#5CC4FF] hover:to-primary hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(36,175,255,0.25)]"
          >
            {"Book a Call — Let's Get You Started"}
            <svg
              width="16"
              height="16"
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
            No tech skills needed — we handle everything for you.
          </p>
        </div>
      </div>
    </section>
  );
}
