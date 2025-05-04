import * as React from "react"
import { Slider } from "./components/ui/slider"
import { Card } from "./components/ui/card"
import { ResultsChart } from "./components/ui/results-chart"

const CRITERIA = [
  { key: "cost", label: "Cost" },
  { key: "education", label: "Education" },
  { key: "staff", label: "Staff" },
  { key: "facilities", label: "Facilities" },
  { key: "reputation", label: "Reputation" },
  { key: "nqs", label: "NQS" }
] as const;

type CriteriaKey = typeof CRITERIA[number]["key"];

type School = {
  id: number;
  name: string;
  cost: number;
  education: number;
  staff: number;
  facilities: number;
  reputation: number;
  nqs: number;
};

function loadSchools(): School[] {
  // This will be replaced with a fetch or import in a real app
  return [
    { id: 1, name: "Sunrise Early Learning Centre", cost: 7, education: 8, staff: 9, facilities: 8, reputation: 8, nqs: 9 },
    { id: 2, name: "Bright Futures Preschool", cost: 6, education: 7, staff: 8, facilities: 7, reputation: 7, nqs: 8 },
    { id: 3, name: "Little Explorers Academy", cost: 8, education: 9, staff: 8, facilities: 9, reputation: 9, nqs: 10 }
  ];
}

function calculateScore(school: School, weights: Record<CriteriaKey, number>) {
  // Weighted sum
  let sum = 0;
  let totalWeight = 0;
  for (const c of CRITERIA) {
    sum += school[c.key] * weights[c.key];
    totalWeight += weights[c.key];
  }
  return totalWeight > 0 ? sum / totalWeight : 0;
}

export default function App() {
  const [started, setStarted] = React.useState(false);
  const [weights, setWeights] = React.useState<Record<CriteriaKey, number>>({
    cost: 5,
    education: 5,
    staff: 5,
    facilities: 5,
    reputation: 5,
    nqs: 5
  });

  const schools = loadSchools();

  const results = React.useMemo(() => {
    return schools
      .map(s => ({ ...s, score: calculateScore(s, weights) }))
      .sort((a, b) => b.score - a.score);
  }, [schools, weights]);

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-3xl font-bold mb-4">School/ELC Finder</h1>
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-300 max-w-xl text-center">
          Find the best School or Early Learning Centre for your child by weighting what matters most to you.
        </p>
        <button
          className="px-6 py-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          onClick={() => setStarted(true)}
        >
          Start Assessment
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Set Your Priorities</h2>
      <div className="mb-8">
        {CRITERIA.map(c => (
          <Slider
            key={c.key}
            value={weights[c.key]}
            min={0}
            max={10}
            step={1}
            label={c.label}
            onChange={val => setWeights(w => ({ ...w, [c.key]: val }))}
          />
        ))}
      </div>
      <h2 className="text-xl font-semibold mb-2">Results</h2>
      <div className="w-full max-w-lg mb-8">
        <ResultsChart data={results.map(s => ({ name: s.name, score: s.score }))} />
      </div>
      <div className="flex flex-col gap-6">
        {results.map(school => (
          <Card key={school.id} title={school.name}>
            <div className="flex flex-wrap gap-4 mb-2">
              {CRITERIA.map(c => (
                <div key={c.key} className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  {c.label}: <span className="font-semibold">{school[c.key]}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 font-bold">Score: {school.score.toFixed(2)}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
