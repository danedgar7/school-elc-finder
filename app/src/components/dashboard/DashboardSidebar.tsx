
import { AnalysisInsights } from "./AnalysisInsights";
import { AssessmentCriteria } from "./AssessmentCriteria";

interface SidebarProps {
  insights: string;
  weights: Record<string, number>;
  onChange: (key: string, value: number) => void;
  criteria: { key: string; label: string }[];
}

export function DashboardSidebar({ insights, weights, onChange, criteria }: SidebarProps) {
  return (
    <div className="flex flex-col gap-6 w-full">
      <AnalysisInsights insights={insights} />
      <AssessmentCriteria weights={weights} onChange={onChange} criteria={criteria} />
    </div>
  );
}
