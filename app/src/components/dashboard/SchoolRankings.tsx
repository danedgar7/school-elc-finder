
import { Card } from "../ui/card";
import { ResultsChart } from "../ui/results-chart";

interface RankingsProps {
  results: { name: string; score: number }[];
}

export function SchoolRankings({ results }: RankingsProps) {
  return (
    <Card title="School Rankings">
      <div className="mb-2 text-sm text-gray-600 dark:text-gray-300">
        Schools ranked by weighted score based on your criteria
      </div>
      <div className="bg-white dark:bg-gray-950 rounded-lg p-4 shadow-md">
        <ResultsChart data={results} />
      </div>
    </Card>
  );
}
