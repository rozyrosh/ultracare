import Presentation from "@/components/Presentation";
import ActionPlanSlide from "@/components/slides/ActionPlanSlide";
import ExecutiveSummarySlide from "@/components/slides/ExecutiveSummarySlide";
import JobSummarySlide from "@/components/slides/JobSummarySlide";
import MonthlyBreakdownSlide from "@/components/slides/MonthlyBreakdownSlide";
import ProfitLossSlide from "@/components/slides/ProfitLossSlide";
import RevenueAnalysisSlide from "@/components/slides/RevenueAnalysisSlide";
import TitleSlide from "@/components/slides/TitleSlide";
import WarrantyIncomeSlide from "@/components/slides/WarrantyIncomeSlide";

const slides = [
  {
    title: "Opening",
    preview: "Quarter One Performance Review",
  },
  {
    title: "Operations",
    preview: "Q1 Job Completion & Operational Summary",
  },
  {
    title: "Finance",
    preview: "Executive Summary & Q1 Financial Highlights",
  },
  {
    title: "Revenue",
    preview: "Operational Revenue Analysis by Category",
  },
  {
    title: "Warranty",
    preview: "Warranty Support Income Analysis",
  },
  {
    title: "Monthly",
    preview: "Monthly Financial Breakdown (April - June 2026)",
  },
  {
    title: "P&L",
    preview: "Profit & Loss (P&L) Statement YTD",
  },
  {
    title: "Action",
    preview: "Operational Challenges & Strategic Action Plan for Q2",
  },
];

export default function Home() {
  return (
    <Presentation slides={slides}>
      <TitleSlide />
      <JobSummarySlide />
      <ExecutiveSummarySlide />
      <RevenueAnalysisSlide />
      <WarrantyIncomeSlide />
      <MonthlyBreakdownSlide />
      <ProfitLossSlide />
      <ActionPlanSlide />
    </Presentation>
  );
}
