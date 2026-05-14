"use client";

import { useState, useEffect } from "react";
import { openCalendly } from "@/lib/utils";

const links = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Performance", href: "#performance" },
  { label: "Calculator", href: "#calculator" },
  { label: "Results", href: "#results" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] py-4 transition-all duration-300 ${
        scrolled
          ? "bg-background/[0.92] backdrop-blur-[12px] border-b border-border py-2.5"
          : ""
      }`}
    >
      <div className="max-w-[1160px] mx-auto px-6 flex items-center justify-end gap-8">
        <nav
          className={`flex gap-7 mr-auto max-md:absolute max-md:top-full max-md:left-0 max-md:right-0 max-md:flex-col max-md:bg-background/[0.97] max-md:p-5 max-md:gap-4 max-md:border-b max-md:border-border ${
            menuOpen ? "max-md:flex" : "max-md:hidden"
          }`}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="no-underline text-sm font-medium text-gray-200 hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#"
          onClick={openCalendly}
          className="inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary-dark text-white font-heading font-bold text-[13px] px-5 py-2.5 rounded-lg border-none cursor-pointer no-underline transition-all hover:from-[#5CC4FF] hover:to-primary hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(36,175,255,0.25)]"
        >
          Book a Call
        </a>
        <button
          className="hidden max-md:flex flex-col gap-[5px] p-1 bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className="block w-[22px] h-0.5 bg-white rounded-sm"></span>
          <span className="block w-[22px] h-0.5 bg-white rounded-sm"></span>
          <span className="block w-[22px] h-0.5 bg-white rounded-sm"></span>
        </button>
      </div>
    </header>
  );
}
