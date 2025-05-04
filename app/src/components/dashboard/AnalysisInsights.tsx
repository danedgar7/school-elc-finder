interface AnalysisInsightsProps {
  insights: string;
}

export function AnalysisInsights({ insights }: AnalysisInsightsProps) {
  return (
    <div className="text-sm font-semibold text-muted-foreground whitespace-pre-line"> {/* Changed to text-sm */}
      {insights}
    </div>
  );
}
