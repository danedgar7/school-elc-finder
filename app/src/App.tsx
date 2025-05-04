import * as React from "react";
import { DashboardSidebar } from "./components/dashboard/DashboardSidebar";
import { SchoolRankings } from "./components/dashboard/SchoolRankings";
import { SchoolMap } from "./components/dashboard/SchoolMap";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings, User } from 'lucide-react'; // Import lucide icons

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
  address: string;
  lat: number;
  lng: number;
};

function useSchools(): School[] {
  const [schools, setSchools] = React.useState<School[]>([]);
  React.useEffect(() => {
    fetch('/schools.json')
      .then(res => res.json())
      .then(data => {
        setSchools(data.map((s: any, idx: number) => ({ id: idx + 1, ...s })));
      });
  }, []);
  return schools;
}

function calculateScore(school: School, weights: Record<CriteriaKey, number>) {
  let sum = 0;
  let totalWeight = 0;
  for (const c of CRITERIA) {
    sum += school[c.key] * weights[c.key];
    totalWeight += weights[c.key];
  }
  return totalWeight > 0 ? sum / totalWeight : 0;
}

function getInsights(topSchool: School | undefined, weights: Record<CriteriaKey, number>) {
  if (!topSchool) return "No schools found.";
  const important = Object.entries(weights)
    .filter(([_, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([k, _]) => CRITERIA.find(c => c.key === k)?.label)
    .slice(0, 3)
    .join(", ");
  return `Based on your priorities, ${topSchool.name} ranks highest overall. You've placed equal importance on ${important}. The top ranked schools excel in these areas.`;
}

export default function App() {
  const [weights, setWeights] = React.useState<Record<CriteriaKey, number>>({
    cost: 5,
    education: 5,
    staff: 5,
    facilities: 5,
    reputation: 5,
    nqs: 5
  });
  const schools = useSchools();
  const results = React.useMemo(() => {
    return schools
      .map(s => ({ ...s, score: calculateScore(s, weights) }))
      .sort((a, b) => b.score - a.score);
  }, [schools, weights]);

  const handleSliderChange = (key: string, value: number) => {
    setWeights(w => ({ ...w, [key]: value }));
  };

  const insights = getInsights(results[0], weights);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Reduce vertical padding from py-6 to py-4 */}
      <header className="w-full flex items-center justify-between px-10 py-4 bg-card shadow-lg">
        <h1 className="text-4xl font-bold tracking-tight">School Scout</h1>
        <div className="flex gap-4 items-center">
          <button className="rounded-full p-2 hover:bg-accent">
            {/* Use Lucide Settings icon */}
            <Settings className="w-6 h-6" />
          </button>
          <button className="rounded-full p-2 hover:bg-accent">
            {/* Use Lucide User icon */}
            <User className="w-6 h-6" />
          </button>
        </div>
      </header>
      <main className="px-8 py-12 grid grid-cols-[400px_1fr] gap-16">
        <aside className="flex flex-col gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Analysis & Criteria</CardTitle>
              {/* <CardDescription>
                Insights and assessment sliders for your school ranking preferences.
              </CardDescription> */}
            </CardHeader>
            <CardContent>
              <DashboardSidebar
                insights={insights}
                weights={weights}
                onChange={handleSliderChange}
                criteria={CRITERIA as any}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Add School</CardTitle>
              <CardDescription>
                Enter a school website URL to fetch details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input id="school-url" placeholder="https://www.example-school.com" />
              </div>
              <Button className="w-full">Fetch School Info</Button>
            </CardContent>
          </Card>
        </aside>
        <section className="flex flex-col gap-10">
          <Card>
            <CardHeader>
              <CardTitle>School Rankings</CardTitle>
              <CardDescription>
                Schools ranked by weighted score based on your criteria.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SchoolRankings results={results.map(s => ({ name: s.name, score: s.score }))} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>School Locations</CardTitle>
              <CardDescription>
                Geographic distribution of schools with score indicators.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SchoolMap schools={results} />
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
