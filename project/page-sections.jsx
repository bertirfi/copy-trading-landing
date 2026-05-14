// ============================================
// Page Sections — Header, Hero, How It Works,
// Performance, Trades, Testimonials, CTA, Footer
// ============================================
const { useState, useEffect, useRef, useCallback } = React;

// ------ Scroll animation hook ------
function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible'); }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ------ Animated counter hook ------
function useCounter(target, dur = 1800) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const ran = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !ran.current) {
        ran.current = true;
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min((now - t0) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(ease * target);
          if (p < 1) requestAnimationFrame(tick); else setVal(target);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, dur]);
  return [val, ref];
}

// ================================================
// HEADER
// ================================================
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Performance', href: '#performance' },
    { label: 'Calculator', href: '#calculator' },
    { label: 'Results', href: '#results' },
  ];

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
        </nav>
        <a href={CONFIG.ctaUrl} target="_blank" rel="noopener" className="btn-primary btn-sm header-cta">
          Book a Call
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}

// ================================================
// HERO
// ================================================
function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-bg-glow"></div>
      <div className="container hero-grid" style={{ gridTemplateColumns: '1fr', textAlign: 'center', justifyItems: 'center' }}>
        <div className="hero-content" style={{ maxWidth: 680, textAlign: 'center' }}>
          <span className="badge">100% AUTOMATED · PASSIVE INCOME</span>
          <h1 className="hero-title">
            Stop Trading.<br />
            <span className="text-lime">Start Earning.</span>
          </h1>
          <p className="hero-sub" style={{ margin: '20px auto 0', maxWidth: 520 }}>
            Copy a proven AI-powered strategy delivering 18–20% monthly returns.
            No experience needed. No manual input. Connect once — profits run automatically.
          </p>
          <div className="hero-features" style={{ alignItems: 'center' }}>
            <div className="hero-feat">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6 9 17l-5-5"/></svg>
              <span>Min. deposit <strong>$10</strong></span>
            </div>
            <div className="hero-feat">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6 9 17l-5-5"/></svg>
              <span><strong>No subscription</strong> fees</span>
            </div>
            <div className="hero-feat">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6 9 17l-5-5"/></svg>
              <span>Withdraw profits <strong>instantly</strong></span>
            </div>
          </div>
          <div className="hero-ctas" style={{ justifyContent: 'center' }}>
            <a href={CONFIG.ctaUrl} target="_blank" rel="noopener" className="btn-primary btn-lg">
              Book a Call — We'll Set You Up
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
          <p style={{ marginTop: 12, fontSize: 13, color: 'var(--gray-400)' }}>We walk you through every step — from account creation to your first profit.</p>
        </div>

      </div>
    </section>
  );
}

// ================================================
// STATS BAR
// ================================================
function StatsBar() {
  const [wr, wrRef] = useCounter(87.02);
  const [dd, ddRef] = useCounter(0.86);
  const [fol, folRef] = useCounter(174511);
  const [wins, winsRef] = useCounter(248);

  const stats = [
    { ref: wrRef, value: wr.toFixed(1) + '%', label: 'Win Rate', icon: '◎' },
    { ref: ddRef, value: dd.toFixed(2) + '%', label: 'Max Drawdown', icon: '▽' },
    { ref: folRef, value: Math.floor(fol).toLocaleString(), label: 'Followers', icon: '◉' },
    { ref: winsRef, value: Math.floor(wins).toString(), label: 'Winning Trades', icon: '▲' },
  ];

  return (
    <section className="stats-bar">
      <div className="container stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="stat-item" ref={s.ref}>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ================================================
// HOW IT WORKS
// ================================================
function HowItWorks() {
  const ref = useFadeIn();
  const steps = [
    {
      num: '01',
      title: 'Create Your Free Account',
      desc: 'Sign up in under 2 minutes. No subscription. No hidden fees. Start with as little as $10.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/></svg>
      ),
    },
    {
      num: '02',
      title: 'Connect to the Trader',
      desc: 'One click to copy. Every trade is mirrored automatically to your account. Zero manual input after this step.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="1.5" strokeLinecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
      ),
    },
    {
      num: '03',
      title: 'Collect Your Profits',
      desc: 'Withdraw anytime, or reinvest to compound. Your money works 24/7 while you live your life.',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="section fade-in" ref={ref}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="badge">SIMPLE SETUP</span>
          <h2 className="section-title" style={{ marginTop: 16 }}>Three Steps. That's It.</h2>
          <p className="section-sub" style={{ margin: '0 auto', maxWidth: 520 }}>No trading knowledge required. No software to install. The entire process takes less than 5 minutes.</p>
        </div>
        <div className="steps-grid">
          {steps.map((s, i) => (
            <div key={i} className="step-card">
              <div className="step-icon">{s.icon}</div>
              <div className="step-num">{s.num}</div>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <a href={CONFIG.ctaUrl} target="_blank" rel="noopener" className="btn-primary">
            Book a Call — Let's Get You Started
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
          <p style={{ marginTop: 12, fontSize: 13, color: 'var(--gray-400)', textAlign: 'center' }}>No tech skills needed — we handle everything for you.</p>
        </div>
      </div>
    </section>
  );
}

// ================================================
// PERFORMANCE
// ================================================
function Performance() {
  const ref = useFadeIn();
  const W = 700, H = 240;
  const pL = 50, pR = 10, pT = 15, pB = 30;
  const cW = W - pL - pR, cH = H - pT - pB;
  const maxV = 25;
  const pts = GROWTH_POINTS.map((v, i) => ({
    x: pL + (i / (GROWTH_POINTS.length - 1)) * cW,
    y: pT + cH - (v / maxV) * cH,
  }));
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const area = line + ` L${pts[pts.length - 1].x.toFixed(1)},${pT + cH} L${pL},${pT + cH} Z`;

  return (
    <section id="performance" className="section fade-in" ref={ref} style={{ background: 'var(--bg-1)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="badge">VERIFIED RESULTS</span>
          <h2 className="section-title" style={{ marginTop: 16 }}>2+ Years of Proven Performance</h2>
          <p className="section-sub" style={{ margin: '0 auto', maxWidth: 580 }}>
            Independently verified on MyFXBook. Real USD account. Real profits. Real withdrawals.
          </p>
        </div>
        <div className="perf-grid">
          <div className="perf-stats">
            <div className="perf-stat-card">
              <div className="perf-stat-label">ROI</div>
              <div className="perf-stat-value text-lime">+89.72%</div>
            </div>
            <div className="perf-stat-card">
              <div className="perf-stat-label">Win Rate</div>
              <div className="perf-stat-value">87.02%</div>
              <div className="winloss-bar">
                <div className="win-bar" style={{ width: '87%' }}></div>
                <div className="loss-bar" style={{ width: '13%' }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--gray-400)', marginTop: 4 }}>
                <span style={{ color: 'var(--green)' }}>248 wins</span>
                <span style={{ color: 'var(--red)' }}>37 losses</span>
              </div>
            </div>
            <div className="perf-stat-card">
              <div className="perf-stat-label">Max Drawdown</div>
              <div className="perf-stat-value text-blue">0.86%</div>
              <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 4 }}>Extremely low risk</div>
            </div>
            <div className="perf-stat-card">
              <div className="perf-stat-label">Verified Balance</div>
              <div className="perf-stat-value">$132,700</div>
            </div>

          </div>
          <div className="perf-chart">
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-300)', marginBottom: 12, fontFamily: 'var(--font-heading)' }}>GROWTH CHART — Nov 2024 to May 2026</div>
            <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', display: 'block' }}>
              <defs>
                <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(36,175,255,0.25)" />
                  <stop offset="100%" stopColor="rgba(36,175,255,0)" />
                </linearGradient>
              </defs>
              {[0,5,10,15,20,25].map(v => {
                const y = pT + cH - (v / maxV) * cH;
                return (
                  <g key={v}>
                    <line x1={pL} y1={y} x2={W - pR} y2={y} stroke="var(--border)" strokeWidth="0.5" />
                    <text x={pL - 6} y={y + 3} textAnchor="end" fill="var(--gray-400)" fontSize="9" fontFamily="var(--font-body)">{v}%</text>
                  </g>
                );
              })}
              <path d={area} fill="url(#perfGrad)" />
              <path d={line} fill="none" stroke="var(--lime)" strokeWidth="2" strokeLinejoin="round" />
              <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="4" fill="var(--lime)" />
              <text x={pts[pts.length - 1].x - 6} y={pts[pts.length - 1].y - 10} fill="var(--lime)" fontSize="11" fontWeight="700" textAnchor="end">+23.47%</text>
            </svg>
          </div>
        </div>

        {/* Proof screenshots gallery */}
        <div style={{ marginTop: 48 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-300)', marginBottom: 16, fontFamily: 'var(--font-heading)', textAlign: 'center' }}>LIVE MT5 TRADE RESULTS</div>
          <div className="proof-scroll">
            {[
              'uploads/WhatsApp Image 2026-05-10 at 12.35.40 (2).jpeg',
              'uploads/WhatsApp Image 2026-05-10 at 12.35.39.jpeg',
              'uploads/WhatsApp Image 2026-05-10 at 12.35.40 (1).jpeg',
              'uploads/WhatsApp Image 2026-05-10 at 12.35.40.jpeg',
            ].map((src, i) => (
              <div key={i} className="proof-img-wrap">
                <img src={src} alt={`Trade results ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ================================================
// TRADES TABLE
// ================================================
function TradesTable() {
  const ref = useFadeIn();
  const totalProfit = TRADES.reduce((s, t) => s + t.profit, 0);
  const winCount = TRADES.filter(t => t.profit > 0).length;

  return (
    <section id="results" className="section fade-in" ref={ref}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="badge">LIVE RESULTS</span>
          <h2 className="section-title" style={{ marginTop: 16 }}>Recent Trades — Real Money</h2>
          <p className="section-sub" style={{ margin: '0 auto', maxWidth: 520 }}>
            Every trade below is real, verified, and executed automatically. {winCount} out of {TRADES.length} trades profitable.
          </p>
        </div>
        <div className="trades-table-wrap">
          <table className="trades-table">
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Type</th>
                <th>Date</th>
                <th>Symbol</th>
                <th>Price</th>
                <th style={{ textAlign: 'right' }}>Profit</th>
              </tr>
            </thead>
            <tbody>
              {TRADES.map(t => (
                <tr key={t.id}>
                  <td style={{ color: 'var(--gray-300)', fontFamily: 'var(--font-heading)', fontSize: 13 }}>{t.id}</td>
                  <td><span className={`trade-type ${t.type.toLowerCase()}`}>{t.type}</span></td>
                  <td style={{ color: 'var(--gray-300)' }}>{t.date}</td>
                  <td style={{ fontWeight: 600 }}>{t.symbol}</td>
                  <td style={{ fontFamily: 'var(--font-heading)' }}>{t.price.toFixed(2)}</td>
                  <td style={{ textAlign: 'right', fontWeight: 700, fontFamily: 'var(--font-heading)', color: t.profit >= 0 ? 'var(--green)' : 'var(--red)' }}>
                    {t.profit >= 0 ? '+' : ''}{t.profit.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="5" style={{ textAlign: 'right', fontWeight: 700, color: 'var(--gray-200)' }}>Total Profit</td>
                <td style={{ textAlign: 'right', fontWeight: 700, fontSize: 16, fontFamily: 'var(--font-heading)', color: 'var(--lime)' }}>+{totalProfit.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: 'var(--gray-400)' }}>
          Results shown per 0.01 lot. With amplified accounts, profits scale proportionally.
          <br />For 24X amplified account setup, <a href={`https://wa.me/${CONFIG.whatsappNumber}?text=${CONFIG.whatsappMessage}`} target="_blank" rel="noopener" style={{ color: 'var(--lime)' }}>contact us on WhatsApp</a>.
        </p>
      </div>
    </section>
  );
}

// ================================================
// TESTIMONIALS
// ================================================
function TestimonialsSection() {
  const ref = useFadeIn();
  return (
    <section className="section fade-in" ref={ref} style={{ background: 'var(--bg-1)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="badge">SUCCESS STORIES</span>
          <h2 className="section-title" style={{ marginTop: 16 }}>Real People. Real Returns.</h2>
          <p className="section-sub" style={{ margin: '0 auto', maxWidth: 520 }}>These members connected, reinvested, and watched compound interest do what it does best.</p>
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-top">
                <div className="testimonial-avatar" style={{ background: t.color + '22', color: t.color }}>{t.initials}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{t.location}</div>
                </div>
              </div>
              <p className="testimonial-quote">"{t.quote}"</p>
              <div className="testimonial-result">
                <div className="testimonial-stat">
                  <span className="testimonial-stat-label">Deposited</span>
                  <span className="testimonial-stat-value">{fmt(t.deposit)}</span>
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                <div className="testimonial-stat">
                  <span className="testimonial-stat-label">After {t.months} months</span>
                  <span className="testimonial-stat-value" style={{ color: 'var(--lime)' }}>{fmt(t.result)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <a href={CONFIG.ctaUrl} target="_blank" rel="noopener" className="btn-primary btn-lg">
            Book a Call — Get the Same Results
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
          <p style={{ marginTop: 12, fontSize: 13, color: 'var(--gray-400)', textAlign: 'center' }}>We personally guide you to start earning — zero guesswork.</p>
        </div>
      </div>
    </section>
  );
}

// ================================================
// FINAL CTA
// ================================================
function FinalCTA() {
  return (
    <section className="final-cta-section">
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 className="section-title" style={{ fontSize: 44, maxWidth: 600, margin: '0 auto' }}>
          Ready to Let Your Money <span className="text-lime">Work for You</span>?
        </h2>
        <p className="section-sub" style={{ maxWidth: 540, margin: '20px auto 0' }}>
          Stop watching from the sidelines. We'll personally walk you through the setup and have you earning within 24 hours.
        </p>
        <div style={{ marginTop: 36, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={CONFIG.ctaUrl} target="_blank" rel="noopener" className="btn-primary btn-xl">
            Book Your Free Call Now
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
        <p style={{ marginTop: 20, fontSize: 13, color: 'var(--gray-400)' }}>Free consultation · No obligation · We guide you every step of the way</p>
      </div>
    </section>
  );
}

// ================================================
// WHATSAPP BUTTON
// ================================================
function WhatsAppButton() {
  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${CONFIG.whatsappMessage}`;
  return (
    <a href={url} target="_blank" rel="noopener" className="whatsapp-fab" aria-label="Contact on WhatsApp">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
    </a>
  );
}

// ================================================
// FOOTER
// ================================================
function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p style={{ fontSize: 12, color: 'var(--gray-400)', lineHeight: 1.7, maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <strong style={{ color: 'var(--gray-300)' }}>Risk Disclaimer:</strong> Trading foreign exchange and CFDs involves significant risk and may not be suitable for all investors.
          Past performance is not indicative of future results. You should carefully consider your investment objectives, level of experience, and risk appetite.
          The possibility exists that you could sustain a loss of some or all of your initial investment.
          Do not invest money you cannot afford to lose.
        </p>
        <div style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: 'var(--gray-500)' }}>
          © {new Date().getFullYear()} · All rights reserved
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Header, Hero, StatsBar, HowItWorks, Performance, TradesTable, TestimonialsSection, FinalCTA, WhatsAppButton, SiteFooter, useFadeIn, useCounter });
