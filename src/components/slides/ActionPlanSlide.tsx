import SlideShell from "@/components/SlideShell";

const PRIORITIES = [
  {
    id: "overhead",
    step: "01",
    challenge: "High Overhead Ratio",
    detail:
      "Fixed administrative expenses (LKR 4.65M) absorbed all gross profit, leading to LKR 2.05M net loss.",
    action: "Overhead Optimization",
    plan: "Review and reduce fixed administrative costs by 15-20% in Q2.",
  },
  {
    id: "backlog",
    step: "02",
    challenge: "Pending Job Backlog",
    detail:
      "26 out of 81 Chargeable/Over Warranty jobs remain pending, delaying revenue recognition.",
    action: "Clear Job Backlog",
    plan: "Expedite customer approvals and spare parts sourcing to clear the 53 pending jobs.",
  },
  {
    id: "margin",
    step: "03",
    challenge: "Compressed Operational GP",
    detail:
      "Operational COS reached LKR 7.06M, reducing core GP margin to 1.16%.",
    action: "Margin Expansion",
    plan: "Target higher margin services (Smartboard repairs, AMC contracts) and improve markup on spare parts.",
  },
  {
    id: "dormant",
    step: "04",
    challenge: "Unutilized Product Segments",
    detail:
      "PC Builds, Rental Units, and CCTV Projects recorded zero revenue during Q1.",
    action: "Reactivate Dormant Revenue Streams",
    plan: "Launch targeted promotions for Rental Notebooks/TVs and CCTV installation projects.",
  },
] as const;

export default function ActionPlanSlide() {
  return (
    <SlideShell
      label="Operational Challenges and Strategic Action Plan for Q2"
      slideNumber="08"
      slideLabel="Action"
    >
      <div className="content-slide__header action-header">
        <p className="content-kicker">Q2 Outlook</p>
        <h2 className="content-title">
          Operational Challenges &amp; Strategic Action Plan for Q2
        </h2>
      </div>

      <div className="action-layout">
        <aside className="action-register" aria-label="Key challenges">
          <div className="action-register__head">
            <p className="action-register__eyebrow">Pressure Register</p>
            <p className="action-register__count">04 signals</p>
          </div>

          <ol className="action-register__list">
            {PRIORITIES.map((item, index) => (
              <li
                key={item.id}
                className="action-register__item"
                style={{ animationDelay: `${0.1 + index * 0.08}s` }}
              >
                <span className="action-register__step">{item.step}</span>
                <div>
                  <h3 className="action-register__title">{item.challenge}</h3>
                  <p className="action-register__detail">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </aside>

        <section className="action-mandate" aria-label="Q2 strategic action plan">
          <div className="action-mandate__head">
            <p className="action-mandate__eyebrow">Q2 Mandate</p>
            <p className="action-mandate__range">FY 2026/27</p>
          </div>

          <div className="action-mandate__stack">
            {PRIORITIES.map((item, index) => (
              <article
                key={item.id}
                className="action-decision"
                style={{ animationDelay: `${0.18 + index * 0.09}s` }}
              >
                <div className="action-decision__meta">
                  <span className="action-decision__step">{item.step}</span>
                  <span className="action-decision__ref">{item.challenge}</span>
                </div>
                <h3 className="action-decision__title">{item.action}</h3>
                <p className="action-decision__plan">{item.plan}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </SlideShell>
  );
}
