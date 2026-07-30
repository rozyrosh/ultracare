import SlideShell from "@/components/SlideShell";

const REVENUE_ROWS = [
  {
    category: "Accessories",
    april: "24,000.00",
    may: "1,464,900.00",
    june: "1,471,149.89",
    total: "2,960,049.89",
  },
  {
    category: "Projects Audio Video (Installations)",
    april: "169,000.00",
    may: "2,450,000.00",
    june: "0.00",
    total: "2,619,000.00",
  },
  {
    category: "Spare Parts",
    april: "205,675.00",
    may: "266,060.00",
    june: "312,810.00",
    total: "784,545.00",
  },
  {
    category: "Over warranty Smartboard",
    april: "32,750.00",
    may: "51,450.00",
    june: "198,740.00",
    total: "282,940.00",
  },
  {
    category: "Chargeable Repairs (UPS/Notebooks)",
    april: "47,500.00",
    may: "131,850.00",
    june: "93,850.00",
    total: "273,200.00",
  },
  {
    category: "UPS & Over Warranty UPS",
    april: "0.00",
    may: "13,000.00",
    june: "94,000.00",
    total: "107,000.00",
  },
  {
    category: "Other (ASUS, AMC, Sales Agreements)",
    april: "0.00",
    may: "95,054.26",
    june: "18,984.00",
    total: "114,038.26",
  },
] as const;

const TOTAL = {
  category: "Total Operational Revenue",
  april: "478,925.00",
  may: "4,472,314.26",
  june: "2,189,533.89",
  total: "7,140,773.15",
} as const;

export default function RevenueAnalysisSlide() {
  return (
    <SlideShell
      label="Operational Revenue Analysis by Category"
      slideNumber="04"
      slideLabel="Revenue"
    >
      <div className="content-slide__header">
        <p className="content-kicker">Category Breakdown</p>
        <h2 className="content-title">
          Operational Revenue Analysis by Category
        </h2>
      </div>

      <div className="data-table-wrap">
        <table className="data-table data-table--finance">
          <thead>
            <tr>
              <th scope="col">Category</th>
              <th scope="col">April (LKR)</th>
              <th scope="col">May (LKR)</th>
              <th scope="col">June (LKR)</th>
              <th scope="col">Total (LKR)</th>
            </tr>
          </thead>
          <tbody>
            {REVENUE_ROWS.map((row) => (
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
    </SlideShell>
  );
}
