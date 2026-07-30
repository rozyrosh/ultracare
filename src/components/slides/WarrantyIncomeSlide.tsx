import SlideShell from "@/components/SlideShell";

const WARRANTY_ROWS = [
  {
    category: "K Star UPS Support",
    april: "240,946.94",
    may: "617,086.26",
    june: "—",
    total: "858,033.20",
  },
  {
    category: "Horion Support",
    april: "640,800.00",
    may: "—",
    june: "847,745.52",
    total: "1,488,545.52",
  },
  {
    category: "Tiandy Support",
    april: "—",
    may: "—",
    june: "311,864.54",
    total: "311,864.54",
  },
] as const;

const TOTAL = {
  category: "Total Reimbursements",
  april: "881,746.94",
  may: "617,086.26",
  june: "1,159,610.06",
  total: "2,658,443.26",
} as const;

export default function WarrantyIncomeSlide() {
  return (
    <SlideShell
      label="Warranty Support Income Analysis"
      slideNumber="05"
      slideLabel="Warranty"
    >
      <div className="content-slide__header">
        <p className="content-kicker">Support Income</p>
        <h2 className="content-title">Warranty Support Income Analysis</h2>
      </div>

      <div className="warranty-layout">
        <div className="data-table-wrap">
          <table className="data-table data-table--finance">
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">April</th>
                <th scope="col">May</th>
                <th scope="col">June</th>
                <th scope="col">Total (LKR)</th>
              </tr>
            </thead>
            <tbody>
              {WARRANTY_ROWS.map((row) => (
                <tr key={row.category}>
                  <td>{row.category}</td>
                  <td>{row.april}</td>
                  <td>{row.may}</td>
                  <td>{row.june}</td>
                  <td>{row.total}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>{TOTAL.category}</td>
                <td>{TOTAL.april}</td>
                <td>{TOTAL.may}</td>
                <td>{TOTAL.june}</td>
                <td>{TOTAL.total}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <section className="insights-panel insights-panel--compact">
          <h3 className="insights-panel__title">Key Insights</h3>
          <p className="insights-panel__copy">
            Warranty reimbursements added <strong>LKR 2.66M</strong> in
            non-operational support income, representing 27.1% of total gross
            inflows. Horion contributed the largest share at 56%.
          </p>
        </section>
      </div>
    </SlideShell>
  );
}
