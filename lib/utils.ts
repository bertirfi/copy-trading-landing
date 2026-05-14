declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export const openCalendly = (e?: React.MouseEvent) => {
  e?.preventDefault();
  if (typeof window !== "undefined" && window.Calendly) {
    window.Calendly.initPopupWidget({
      url: "https://calendly.com/bertisanoflow/copy-trading-intro?hide_event_type_details=1&hide_gdpr_banner=1",
    });
  }
};

export const fmt = (n: number) => {
  if (n >= 1e9) return "$" + (n / 1e9).toFixed(1) + "B";
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(1) + "M";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
};

export const fmtPct = (n: number) => n.toFixed(1) + "%";
