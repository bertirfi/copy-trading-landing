"use client";

import { useFadeIn } from "@/lib/hooks";
import { TRADES, CONFIG } from "@/lib/config";

export function TradesTable() {
  const ref = useFadeIn();
  const totalProfit = TRADES.reduce((s, t) => s + t.profit, 0);
  const winCount = TRADES.filter((t) => t.profit > 0).length;

  return (
    <section id="results" className="py-24 max-sm:py-16 fade-in" ref={ref}>
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/[0.08] border border-primary/[0.18] text-primary text-xs font-bold tracking-[0.08em] font-heading">
            LIVE RESULTS
          </span>
          <h2 className="font-heading text-[40px] max-sm:text-[30px] font-bold tracking-[-0.025em] leading-[1.15] mt-4">
            Recent Trades — Real Money
          </h2>
          <p className="text-gray-300 text-[17px] leading-relaxed mt-3 max-w-[520px] mx-auto">
            Every trade below is real, verified, and executed automatically.{" "}
            {winCount} out of {TRADES.length} trades profitable.
          </p>
        </div>
        <div className="overflow-x-auto rounded-[14px] border border-border bg-card">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr>
                <th className="p-3.5 px-4 text-left text-[11px] uppercase tracking-[0.06em] text-gray-400 font-semibold border-b border-border bg-muted">
                  Ticket
                </th>
                <th className="p-3.5 px-4 text-left text-[11px] uppercase tracking-[0.06em] text-gray-400 font-semibold border-b border-border bg-muted">
                  Type
                </th>
                <th className="p-3.5 px-4 text-left text-[11px] uppercase tracking-[0.06em] text-gray-400 font-semibold border-b border-border bg-muted">
                  Date
                </th>
                <th className="p-3.5 px-4 text-left text-[11px] uppercase tracking-[0.06em] text-gray-400 font-semibold border-b border-border bg-muted">
                  Symbol
                </th>
                <th className="p-3.5 px-4 text-left text-[11px] uppercase tracking-[0.06em] text-gray-400 font-semibold border-b border-border bg-muted">
                  Price
                </th>
                <th className="p-3.5 px-4 text-right text-[11px] uppercase tracking-[0.06em] text-gray-400 font-semibold border-b border-border bg-muted">
                  Profit
                </th>
              </tr>
            </thead>
            <tbody>
              {TRADES.map((t) => (
                <tr key={t.id} className="hover:bg-primary/[0.02]">
                  <td className="p-3 px-4 text-[13px] border-b border-border/50 text-gray-300 font-heading">
                    {t.id}
                  </td>
                  <td className="p-3 px-4 text-[13px] border-b border-border/50">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-[0.04em] ${
                        t.type === "Buy"
                          ? "bg-primary/[0.12] text-primary"
                          : "bg-destructive/[0.12] text-destructive"
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>
                  <td className="p-3 px-4 text-[13px] border-b border-border/50 text-gray-300">
                    {t.date}
                  </td>
                  <td className="p-3 px-4 text-[13px] border-b border-border/50 font-semibold">
                    {t.symbol}
                  </td>
                  <td className="p-3 px-4 text-[13px] border-b border-border/50 font-heading">
                    {t.price.toFixed(2)}
                  </td>
                  <td
                    className={`p-3 px-4 text-[13px] border-b border-border/50 text-right font-bold font-heading ${
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
                <td className="p-4 text-right font-bold text-base font-heading text-primary border-t border-border">
                  +{totalProfit.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="text-center mt-4 text-[13px] text-gray-400">
          Results shown per 0.01 lot. With amplified accounts, profits scale
          proportionally.
          <br />
          For 24X amplified account setup,{" "}
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
