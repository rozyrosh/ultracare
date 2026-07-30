import SlideShell from "@/components/SlideShell";

const MONTHS = [
  {
    id: "april",
    step: "01",
    code: "APR",
    title: "April 2026",
    tone: "open" as const,
    tag: "Opening pace",
    revenueValue: "1.36",
    revenueUnit: "M",
    margin: 47.5,
    sales: { label: "Sales", value: "478.9K" },
    warranty: { label: "Warranty", value: "881.7K" },
    gp: { label: "Net GP", value: "646.9K" },
  },
  {
    id: "may",
    step: "02",
    code: "MAY",
    title: "May 2026",
    tone: "peak" as const,
    tag: "Revenue peak",
    revenueValue: "5.09",
    revenueUnit: "M",
    margin: 18.4,
    sales: { label: "Sales", value: "4.47M" },
    warranty: { label: "Warranty", value: "617.1K" },
    gp: { label: "Net GP", value: "938.6K" },
  },
  {
    id: "june",
    step: "03",
    code: "JUN",
    title: "June 2026",
    tone: "close" as const,
    tag: "Strong close",
    revenueValue: "3.27",
    revenueUnit: "M",
    margin: 52,
    sales: { label: "Sales", value: "2.11M" },
    warranty: { label: "Warranty", value: "1.16M" },
    gp: { label: "Net GP", value: "1.70M" },
  },
] as const;

export default function MonthlyBreakdownSlide() {
  return (
    <SlideShell
      label="Monthly Financial Breakdown April to June 2026"
      slideNumber="06"
      slideLabel="Monthly"
    >
      <div className="month-stack">
        <div className="content-slide__header month-header">
          <div>
            <p className="content-kicker">Month by Month</p>
            <h2 className="content-title">
              Monthly Financial Breakdown
              <span className="month-header__range">April – June 2026</span>
            </h2>
          </div>
          <p className="month-header__hint" aria-hidden="true">
            Q1 Path
            <span>01 → 03</span>
          </p>
        </div>

        <div className="month-trail" aria-label="Q1 monthly progression">
          <div className="month-trail__track">
            <div className="month-spine" aria-hidden="true">
              <span className="month-spine__route" />
              <span className="month-spine__chevron month-spine__chevron--a" />
              <span className="month-spine__chevron month-spine__chevron--b" />
            </div>

            {MONTHS.map((month, index) => (
              <article
                key={month.id}
                className={`month-node month-node--${month.tone}`}
                style={{ animationDelay: `${0.22 + index * 0.16}s` }}
              >
                <div className="month-node__station">
                  <span className="month-node__ring" />
                  <span className="month-node__diamond">
                    <span className="month-node__step">{month.step}</span>
                  </span>
                  <span className="month-node__pin" />
                </div>

                <div className="month-node__panel">
                  <span className="month-node__ghost" aria-hidden="true">
                    {month.code}
                  </span>

                  <div className="month-node__meta">
                    <span className="month-node__code">{month.code}</span>
                    <span className="month-node__tag">{month.tag}</span>
                  </div>

                  <h3 className="month-node__title">{month.title}</h3>

                  <div className="month-node__revenue-block">
                    <p className="month-node__label">Total Revenue</p>
                    <p className="month-node__revenue">
                      <span className="month-node__currency">LKR</span>
                      <span className="month-node__figure">{month.revenueValue}</span>
                      <span className="month-node__unit">{month.revenueUnit}</span>
                    </p>
                    <div
                      className="month-node__gauge"
                      role="img"
                      aria-label={`Gross margin ${month.margin}%`}
                    >
                      <span className="month-node__gauge-track">
                        <span
                          className="month-node__gauge-fill"
                          style={{
                            width: `${month.margin}%`,
                            animationDelay: `${0.55 + index * 0.16}s`,
                          }}
                        />
                      </span>
                      <span className="month-node__gauge-label">
                        {month.margin}% margin
                      </span>
                    </div>
                  </div>

                  <dl className="month-node__stats">
                    <div>
                      <dt>{month.sales.label}</dt>
                      <dd>{month.sales.value}</dd>
                    </div>
                    <div>
                      <dt>{month.warranty.label}</dt>
                      <dd>{month.warranty.value}</dd>
                    </div>
                    <div>
                      <dt>{month.gp.label}</dt>
                      <dd>{month.gp.value}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
