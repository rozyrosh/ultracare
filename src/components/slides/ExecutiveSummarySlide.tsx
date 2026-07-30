import SlideShell from "@/components/SlideShell";

const LEDGER = [
  {
    id: "revenue",
    label: "Total Gross Revenue",
    value: "9.80",
    unit: "M",
    note: "Op 7.14M + Warranty 2.66M",
    tone: "ink" as const,
  },
  {
    id: "gross",
    label: "Gross Profit (P&L)",
    value: "82.97",
    unit: "K",
    note: "Margin 1.16%",
    tone: "neutral" as const,
  },
  {
    id: "warranty",
    label: "Warranty Support",
    value: "2.66",
    unit: "M",
    note: "Horion · K Star · Tiandy",
    tone: "boost" as const,
  },
] as const;

const INSIGHTS = [
  {
    title: "Revenue Growth Driver",
    body: "Accessories (LKR 2.96M) and Audio/Video Projects (LKR 2.62M) generated 78% of operational sales.",
  },
  {
    title: "Warranty Support Vitality",
    body: "Horion (LKR 1.49M), K Star UPS (LKR 858K), and Tiandy (LKR 312K) delivered LKR 2.66M cash flow.",
  },
  {
    title: "Cost Dynamics",
    body: "Cost of Sales (LKR 7.06M) vs Operational Revenue (LKR 7.14M) compressed core margins.",
  },
  {
    title: "Overhead Challenge",
    body: "Fixed Admin Expenses (LKR 4.65M) drove a Net Loss of LKR 2.05M (−29%), requiring Q2 cost action.",
  },
] as const;

export default function ExecutiveSummarySlide() {
  return (
    <SlideShell
      label="Executive Summary and Q1 Financial Highlights"
      slideNumber="03"
      slideLabel="Finance"
    >
      <div className="content-slide__header exec-header">
        <p className="content-kicker">Financial Highlights</p>
        <h2 className="content-title">
          Executive Summary &amp; Q1 Financial Highlights
        </h2>
      </div>

      <div className="exec-layout">
        <div className="exec-board" aria-label="Q1 financial position">
          <aside className="exec-verdict" style={{ animationDelay: "0.12s" }}>
            <p className="exec-verdict__eyebrow">Q1 Net Result</p>
            <p className="exec-verdict__value">
              <span className="exec-verdict__paren">(</span>
              <span className="exec-verdict__currency">LKR</span>
              <span className="exec-verdict__figure">2.05</span>
              <span className="exec-verdict__unit">M</span>
              <span className="exec-verdict__paren">)</span>
            </p>
            <p className="exec-verdict__status">Net Loss · −29% margin</p>
            <dl className="exec-verdict__facts">
              <div>
                <dt>Admin overhead</dt>
                <dd>LKR 4.65M</dd>
              </div>
              <div>
                <dt>Gross inflows</dt>
                <dd>LKR 9.80M</dd>
              </div>
            </dl>
          </aside>

          <div className="exec-ledger" aria-label="Supporting metrics">
            <div className="exec-ledger__head">
              <span>Line item</span>
              <span>Amount</span>
            </div>
            {LEDGER.map((row, index) => (
              <article
                key={row.id}
                className={`exec-line exec-line--${row.tone}`}
                style={{ animationDelay: `${0.2 + index * 0.08}s` }}
              >
                <div className="exec-line__meta">
                  <h3 className="exec-line__label">{row.label}</h3>
                  <p className="exec-line__note">{row.note}</p>
                </div>
                <p className="exec-line__amount">
                  <span className="exec-line__currency">LKR</span>
                  <span className="exec-line__figure">{row.value}</span>
                  <span className="exec-line__unit">{row.unit}</span>
                </p>
              </article>
            ))}
          </div>
        </div>

        <section className="exec-insights" aria-label="Key business insights">
          <div className="exec-insights__head">
            <h3 className="exec-insights__title">Key Business Insights</h3>
            <span className="exec-insights__range">Q1 FY 2026/27</span>
          </div>
          <ol className="exec-insights__list">
            {INSIGHTS.map((insight, index) => (
              <li
                key={insight.title}
                className="exec-insight"
                style={{ animationDelay: `${0.48 + index * 0.06}s` }}
              >
                <span className="exec-insight__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="exec-insight__copy">
                  <h4 className="exec-insight__label">{insight.title}</h4>
                  <p className="exec-insight__body">{insight.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </SlideShell>
  );
}
