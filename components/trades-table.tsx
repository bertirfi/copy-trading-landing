"use client";

import { useFadeIn } from "@/lib/hooks";
import { TRADES, CONFIG } from "@/lib/config";

export function TradesTable() {
  const ref = useFadeIn();
  const totalProfit = TRADES.reduce((s, t) => s + t.profit, 0);
  const winCount = TRADES.filter((t) => t.profit > 0).length;

  return (
    <section id="results" className="py-16 sm:py-20 lg:py-24 fade-in" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider font-heading">
            LIVE RESULTS
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mt-5 text-balance">
            Recent Trades — Real Money
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mt-4 max-w-lg mx-auto text-pretty">
            Every trade below is real, verified, and executed automatically.{" "}
            {winCount} out of {TRADES.length} trades profitable.
          </p>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full border-collapse min-w-[500px]">
            <thead>
              <tr>
                <th className="p-3 sm:p-4 text-left text-xs uppercase tracking-wider text-gray-400 font-semibold border-b border-border bg-muted">
                  Ticket
                </th>
                <th className="p-3 sm:p-4 text-left text-xs uppercase tracking-wider text-gray-400 font-semibold border-b border-border bg-muted">
                  Type
                </th>
                <th className="p-3 sm:p-4 text-left text-xs uppercase tracking-wider text-gray-400 font-semibold border-b border-border bg-muted">
                  Date
                </th>
                <th className="p-3 sm:p-4 text-left text-xs uppercase tracking-wider text-gray-400 font-semibold border-b border-border bg-muted">
                  Symbol
                </th>
                <th className="p-3 sm:p-4 text-left text-xs uppercase tracking-wider text-gray-400 font-semibold border-b border-border bg-muted">
                  Price
                </th>
                <th className="p-3 sm:p-4 text-right text-xs uppercase tracking-wider text-gray-400 font-semibold border-b border-border bg-muted">
                  Profit
                </th>
              </tr>
            </thead>
            <tbody>
              {TRADES.map((t) => (
                <tr key={t.id} className="hover:bg-primary/5">
                  <td className="p-3 sm:p-4 text-sm border-b border-border/50 text-gray-300 font-heading">
                    {t.id}
                  </td>
                  <td className="p-3 sm:p-4 text-sm border-b border-border/50">
                    <span
                      className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                        t.type === "Buy"
                          ? "bg-primary/10 text-primary"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>
                  <td className="p-3 sm:p-4 text-sm border-b border-border/50 text-gray-300">
                    {t.date}
                  </td>
                  <td className="p-3 sm:p-4 text-sm border-b border-border/50 font-semibold">
                    {t.symbol}
                  </td>
                  <td className="p-3 sm:p-4 text-sm border-b border-border/50 font-heading">
                    {t.price.toFixed(2)}
                  </td>
                  <td
                    className={`p-3 sm:p-4 text-sm border-b border-border/50 text-right font-bold font-heading ${
                      t.profit >= 0 ? "text-success" : "text-destructive"
                    }`}
                  >
                    {t.profit >= 0 ? "+" : ""}
                    {t.profit.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan={5}
                  className="p-4 text-right font-bold text-gray-200 border-t border-border"
                >
                  Total Profit
                </td>
                <td className="p-4 text-right font-bold text-base sm:text-lg font-heading text-primary border-t border-border">
                  +{totalProfit.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="text-center mt-5 text-sm text-gray-400">
          Results shown per 0.01 lot. With amplified accounts, profits scale
          proportionally.
          <br className="hidden sm:block" />
          <span className="sm:inline"> For 24X amplified account setup, </span>
          <a
            href={`https://wa.me/${CONFIG.whatsappNumber}?text=${CONFIG.whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            contact us on WhatsApp
          </a>
          .
        </p>
      </div>
    </section>
  );
}
