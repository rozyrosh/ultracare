import SlideShell from "@/components/SlideShell";

type PlRow =
  | {
      kind: "line";
      label: string;
      amount: string;
      pct: string;
      tone?: "expense" | "income";
    }
  | {
      kind: "section";
      label: string;
    }
  | {
      kind: "child";
      label: string;
      amount: string;
      pct: string;
    }
  | {
      kind: "emphasis";
      label: string;
      amount: string;
      pct: string;
      tone?: "positive" | "negative" | "neutral";
    };

const ROWS: PlRow[] = [
  {
    kind: "line",
    label: "Cost of Sales (COS)",
    amount: "(7,057,808.90)",
    pct: "—",
    tone: "expense",
  },
  {
    kind: "emphasis",
    label: "Gross Profit (Operational)",
    amount: "82,964.25",
    pct: "1.16%",
    tone: "positive",
  },
  {
    kind: "section",
    label: "Other Income (Warranty Support)",
  },
  {
    kind: "child",
    label: "K Star UPS Warranty Support",
    amount: "858,033.20",
    pct: "—",
  },
  {
    kind: "child",
    label: "Horion Warranty Support",
    amount: "1,488,545.52",
    pct: "—",
  },
  {
    kind: "child",
    label: "Tiandy Warranty Support",
    amount: "311,864.54",
    pct: "—",
  },
  {
    kind: "emphasis",
    label: "Total Warranty Support Reimbursement",
    amount: "2,658,443.26",
    pct: "—",
    tone: "neutral",
  },
  {
    kind: "line",
    label: "Administrative Expenses",
    amount: "(4,645,020.26)",
    pct: "—",
    tone: "expense",
  },
  {
    kind: "line",
    label: "Sales & Distribution Expenses",
    amount: "(141,779.09)",
    pct: "—",
    tone: "expense",
  },
  {
    kind: "line",
    label: "Finance Expenses",
    amount: "(8,085.47)",
    pct: "—",
    tone: "expense",
  },
  {
    kind: "emphasis",
    label: "Net Profit / (Loss)",
    amount: "(2,053,477.31)",
    pct: "-28.76%",
    tone: "negative",
  },
];

const TAKEAWAYS = [
  {
    title: "Core Margin Pressure",
    body: "Operational Gross Profit of LKR 82.96K indicates cost of sales absorbed 98.8% of sales revenue.",
  },
  {
    title: "Warranty Income Cushion",
    body: "Warranty claims added LKR 2.66M, bringing total gross inflows to LKR 2.74M.",
  },
  {
    title: "Overhead Ratio",
    body: "Admin expenses (LKR 4.65M) represent 65% of total sales revenue.",
  },
  {
    title: "Target Strategy",
    body: "Lower COS by renegotiating parts procurement and streamline overheads to reach profitability.",
  },
] as const;

export default function ProfitLossSlide() {
  return (
    <SlideShell
      label="Profit and Loss Statement Year to Date"
      slideNumber="07"
      slideLabel="P&L"
    >
      <div className="content-slide__header pnl-header">
        <h2 className="content-title">
          Profit &amp; Loss (P&amp;L)
          <br />
          <span className="content-title__accent">Statement YTD</span>
        </h2>
      </div>

      <div className="pnl-layout">
        <div className="data-table-wrap pnl-table-wrap">
          <table className="data-table data-table--finance pnl-table">
            <thead>
              <tr>
                <th scope="col">P&amp;L Item</th>
                <th scope="col">Amount (LKR)</th>
                <th scope="col">GP / Net %</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => {
                if (row.kind === "section") {
                  return (
                    <tr key={row.label} className="pnl-row pnl-row--section">
                      <td colSpan={3}>{row.label}</td>
                    </tr>
                  );
                }

                const className = [
                  "pnl-row",
                  row.kind === "child" ? "pnl-row--child" : "",
                  row.kind === "emphasis" ? "pnl-row--emphasis" : "",
                  row.kind === "emphasis" && row.tone
                    ? `pnl-row--${row.tone}`
                    : "",
                  row.kind === "line" && row.tone === "expense"
                    ? "pnl-row--expense"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <tr key={row.label} className={className}>
                    <td>{row.label}</td>
                    <td>{row.amount}</td>
                    <td>{row.pct}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <aside className="pnl-takeaways" aria-label="P&L key takeaways">
          <h3 className="pnl-takeaways__title">P&amp;L Key Takeaways</h3>
          <ul className="pnl-takeaways__list">
            {TAKEAWAYS.map((item) => (
              <li key={item.title}>
                <strong>{item.title}:</strong> {item.body}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </SlideShell>
  );
}
