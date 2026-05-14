// ============================================
// Compound Interest Calculator
// ============================================
const { useState, useMemo, useCallback } = React;

const RATE = 0.18;
const LOG_MIN = Math.log(100);
const LOG_MAX = Math.log(100000);
const DISPLAY_MONTHS = [1,2,3,4,5,6,7,8,9,10,11,12,18,24,36,48];
const PRESETS = [100, 500, 1000, 5000, 10000, 50000, 100000];

function sliderToAmount(s) { return Math.round(Math.exp(LOG_MIN + (s / 1000) * (LOG_MAX - LOG_MIN))); }
function amountToSlider(a) { return ((Math.log(Math.max(100, a)) - LOG_MIN) / (LOG_MAX - LOG_MIN)) * 1000; }

function CompoundCalculator() {
  const [slider, setSlider] = useState(Math.round(amountToSlider(1000)));
  const [inputVal, setInputVal] = useState('1,000');
  const amount = sliderToAmount(slider);

  const handleSlider = useCallback((e) => {
    const s = Number(e.target.value);
    setSlider(s);
    setInputVal(sliderToAmount(s).toLocaleString('en-US'));
  }, []);

  const handleInput = useCallback((e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    const val = parseInt(raw) || 100;
    setInputVal(Number(raw || 0).toLocaleString('en-US'));
    if (val >= 100 && val <= 100000) {
      setSlider(Math.round(amountToSlider(val)));
    }
  }, []);

  const selectPreset = useCallback((p) => {
    setSlider(Math.round(amountToSlider(p)));
    setInputVal(p.toLocaleString('en-US'));
  }, []);

  const rows = useMemo(() => DISPLAY_MONTHS.map(m => {
    const balance = amount * Math.pow(1 + RATE, m);
    return { month: m, balance, totalProfit: balance - amount, returnPct: ((balance - amount) / amount) * 100 };
  }), [amount]);

  // Chart data — 49 points (month 0..48)
  const chartData = useMemo(() => {
    const pts = Array.from({ length: 49 }, (_, m) => amount * Math.pow(1 + RATE, m));
    return pts;
  }, [amount]);

  const maxChart = chartData[48];

  // SVG chart dimensions
  const W = 760, H = 280;
  const pL = 70, pR = 20, pT = 20, pB = 40;
  const cW = W - pL - pR, cH = H - pT - pB;

  const toX = (m) => pL + (m / 48) * cW;
  const toY = (v) => pT + cH - (v / maxChart) * cH;

  const linePath = chartData.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(1)},${toY(v).toFixed(1)}`).join(' ');
  const areaPath = linePath + ` L${toX(48).toFixed(1)},${(pT + cH).toFixed(1)} L${pL},${(pT + cH).toFixed(1)} Z`;

  // Y-axis labels
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(f => {
    const val = f * maxChart;
    return { y: toY(val), label: fmt(val) };
  });

  const xTicks = [0, 6, 12, 18, 24, 36, 48].map(m => ({ x: toX(m), label: m + 'mo' }));

  // Milestone cards
  const milestones = [
    { label: '6 Months', val: amount * Math.pow(1 + RATE, 6) },
    { label: '12 Months', val: amount * Math.pow(1 + RATE, 12) },
    { label: '24 Months', val: amount * Math.pow(1 + RATE, 24) },
    { label: '48 Months', val: amount * Math.pow(1 + RATE, 48) },
  ];

  const progress = (slider / 1000) * 100;

  return (
    <section id="calculator" className="section" style={{ background: 'var(--bg-1)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="badge">COMPOUND GROWTH</span>
          <h2 className="section-title" style={{ marginTop: 16 }}>
            See What Your Money Could Become
          </h2>
          <p className="section-sub" style={{ maxWidth: 560, margin: '0 auto' }}>
            Enter your starting deposit. Watch 18% monthly compounding turn modest savings into life-changing wealth.
          </p>
        </div>

        {/* Input area */}
        <div className="calc-input-area">
          <div className="calc-input-row">
            <label style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 15, color: 'var(--gray-200)' }}>
              Starting Deposit
            </label>
            <div className="calc-dollar-input">
              <span style={{ color: 'var(--lime)', fontWeight: 700, fontSize: 20 }}>$</span>
              <input
                type="text"
                value={inputVal}
                onChange={handleInput}
                className="calc-amount-input"
              />
            </div>
          </div>
          <div style={{ padding: '0 4px' }}>
            <input
              type="range"
              min="0"
              max="1000"
              value={slider}
              onChange={handleSlider}
              className="calc-slider"
              style={{ '--progress': progress + '%' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--gray-400)', marginTop: 4 }}>
              <span>$100</span>
              <span>$100,000</span>
            </div>
          </div>
          <div className="calc-presets">
            {PRESETS.map(p => (
              <button
                key={p}
                onClick={() => selectPreset(p)}
                className={`calc-preset-btn ${Math.abs(amount - p) < p * 0.05 ? 'active' : ''}`}
              >
                {p >= 1000 ? '$' + (p / 1000) + 'k' : '$' + p}
              </button>
            ))}
          </div>
        </div>

        {/* Milestone cards */}
        <div className="milestone-grid">
          {milestones.map((ms, i) => (
            <div key={i} className="milestone-card">
              <div style={{ fontSize: 13, color: 'var(--gray-300)', marginBottom: 4, fontWeight: 500 }}>{ms.label}</div>
              <div style={{ fontSize: 24, fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--lime)' }}>{fmt(ms.val)}</div>
              <div style={{ fontSize: 12, color: 'var(--green)', marginTop: 2 }}>
                +{fmtPct(((ms.val - amount) / amount) * 100)} return
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="calc-chart-wrap">
          <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', display: 'block' }}>
            <defs>
              <linearGradient id="calcGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(36,175,255,0.35)" />
                <stop offset="100%" stopColor="rgba(36,175,255,0)" />
              </linearGradient>
            </defs>
            {/* Grid lines */}
            {yTicks.map((t, i) => (
              <g key={i}>
                <line x1={pL} y1={t.y} x2={W - pR} y2={t.y} stroke="var(--border)" strokeWidth="0.5" />
                <text x={pL - 8} y={t.y + 4} textAnchor="end" fill="var(--gray-400)" fontSize="10" fontFamily="var(--font-body)">{t.label}</text>
              </g>
            ))}
            {xTicks.map((t, i) => (
              <text key={i} x={t.x} y={H - 8} textAnchor="middle" fill="var(--gray-400)" fontSize="10" fontFamily="var(--font-body)">{t.label}</text>
            ))}
            {/* Area + Line */}
            <path d={areaPath} fill="url(#calcGrad)" />
            <path d={linePath} fill="none" stroke="var(--lime)" strokeWidth="2.5" strokeLinejoin="round" />
            {/* Start + End dots */}
            <circle cx={toX(0)} cy={toY(chartData[0])} r="4" fill="var(--white)" />
            <circle cx={toX(48)} cy={toY(chartData[48])} r="5" fill="var(--lime)" stroke="var(--bg-0)" strokeWidth="2" />
          </svg>
        </div>

        {/* Results table */}
        <div className="calc-table-wrap">
          <table className="calc-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Balance</th>
                <th>Total Profit</th>
                <th>Return</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const highlight = [6,12,24,48].includes(r.month);
                return (
                  <tr key={r.month} className={highlight ? 'highlight-row' : ''}>
                    <td style={{ fontWeight: highlight ? 700 : 400 }}>{r.month}</td>
                    <td style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--white)' }}>{fmt(r.balance)}</td>
                    <td style={{ color: 'var(--green)', fontWeight: 600 }}>+{fmt(r.totalProfit)}</td>
                    <td style={{ color: 'var(--lime)' }}>+{fmtPct(r.returnPct)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a href={CONFIG.ctaUrl} target="_blank" rel="noopener" className="btn-primary btn-lg">
            Book a Call — Start Compounding Now
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
          <p style={{ marginTop: 12, fontSize: 13, color: 'var(--gray-400)' }}>We'll help you set up your account and connect to the strategy — completely free.</p>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { CompoundCalculator });
