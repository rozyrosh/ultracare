import SlideShell from "@/components/SlideShell";

const JOB_ROWS = [
  {
    category: "Warranty",
    total: 162,
    completed: 147,
    pending: 12,
    wor: 3,
    cancelled: 0,
    rate: "90.7%",
  },
  {
    category: "Chargeable / Over Warranty",
    total: 81,
    completed: 50,
    pending: 26,
    wor: 5,
    cancelled: 0,
    rate: "61.7%",
  },
  {
    category: "Warranty - Not in List",
    total: 38,
    completed: 25,
    pending: 10,
    wor: 0,
    cancelled: 3,
    rate: "65.8%",
  },
  {
    category: "ASUS Warranty",
    total: 24,
    completed: 19,
    pending: 3,
    wor: 2,
    cancelled: 0,
    rate: "79.2%",
  },
  {
    category: "Samsung Warranty",
    total: 6,
    completed: 3,
    pending: 2,
    wor: 1,
    cancelled: 0,
    rate: "50.0%",
  },
] as const;

const TOTAL = {
  category: "Total Jobs Q1",
  total: 311,
  completed: 244,
  pending: 53,
  wor: 11,
  cancelled: 3,
  rate: "78.5%",
} as const;

export default function JobSummarySlide() {
  return (
    <SlideShell
      label="Q1 Job Completion and Operational Summary"
      slideNumber="02"
      slideLabel="Operations"
    >
      <div className="content-slide__header">
        <p className="content-kicker">Operational Snapshot</p>
        <h2 className="content-title">
          Q1 Job Completion &amp; Operational Summary
        </h2>
      </div>

      <div className="data-table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th scope="col">Warranty Category</th>
              <th scope="col">Total Jobs</th>
              <th scope="col">Completed</th>
              <th scope="col">Pending</th>
              <th scope="col">WOR</th>
              <th scope="col">Cancelled</th>
              <th scope="col">Completion %</th>
            </tr>
          </thead>
          <tbody>
            {JOB_ROWS.map((row) => (
              <tr key={row.category}>
                <td>{row.category}</td>
                <td>{row.total}</td>
                <td>{row.completed}</td>
                <td>{row.pending}</td>
                <td>{row.wor}</td>
                <td>{row.cancelled}</td>
                <td>{row.rate}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>{TOTAL.category}</td>
              <td>{TOTAL.total}</td>
              <td>{TOTAL.completed}</td>
              <td>{TOTAL.pending}</td>
              <td>{TOTAL.wor}</td>
              <td>{TOTAL.cancelled}</td>
              <td>{TOTAL.rate}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </SlideShell>
  );
}
