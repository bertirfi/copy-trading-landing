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
          ? "bg-background/95 backdrop-blur-md border-b border-border py-3"
          : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo/Brand */}
        <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-xs font-bold tracking-wide font-heading whitespace-nowrap">
          100% AUTOMATED - PASSIVE INCOME
        </span>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-gray-200 hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#"
            onClick={openCalendly}
            className="inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary-dark text-white font-heading font-bold text-sm px-5 py-2.5 rounded-lg cursor-pointer transition-all hover:from-[#5CC4FF] hover:to-primary hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(36,175,255,0.25)]"
          >
            Book a Call
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className="block w-5 h-0.5 bg-white rounded-sm"></span>
          <span className="block w-5 h-0.5 bg-white rounded-sm"></span>
          <span className="block w-5 h-0.5 bg-white rounded-sm"></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md border-b border-border p-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-gray-200 hover:text-primary transition-colors py-2"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#"
            onClick={(e) => {
              setMenuOpen(false);
              openCalendly(e);
            }}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-primary to-primary-dark text-white font-heading font-bold text-sm px-5 py-3 rounded-lg cursor-pointer mt-2"
          >
            Book a Call
          </a>
        </nav>
      )}
    </header>
  );
}
