import * as React from "react";
import { DashboardSidebar } from "./components/dashboard/DashboardSidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MainLayout } from "./components/layout/MainLayout";
import { Routes, Route } from 'react-router-dom';

import DashboardPage from "./pages/DashboardPage";
import SchoolsPage from "./pages/SchoolsPage";
import TasksPage from "./pages/TasksPage";
import NewsPage from "./pages/NewsPage";
import AboutPage from "./pages/AboutPage";

const CRITERIA = [
  { key: "cost", label: "Cost" },
  { key: "education", label: "Education" },
  { key: "staff", label: "Staff" },
  { key: "facilities", label: "Facilities" },
  { key: "reputation", label: "Reputation" },
  { key: "nqs", label: "NQS" }
] as const;

type CriteriaKey = typeof CRITERIA[number]["key"];

// Define possible statuses
export type SchoolStatus = 'None' | 'Prioritised' | 'Requested' | 'Availability' | 'No Availability';

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
  status?: SchoolStatus; // Add optional status field
  score?: number;
};

function useSchools(): School[] {
  const [schools, setSchools] = React.useState<School[]>([]);
 
  React.useEffect(() => {
    fetch('/schools.json')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (!Array.isArray(data)) {
          console.error("Fetched school data is not an array:", data);
          setSchools([]); // Set empty if data is invalid
          return;
        }
        // Ensure each school object has an ID and other expected fields with correct types
        const formattedSchools = data.map((s: any, idx: number): School => ({
          id: typeof s.id === 'number' ? s.id : idx + 1, // Use provided ID or generate one
          name: typeof s.name === 'string' ? s.name : 'Unnamed School',
          cost: typeof s.cost === 'number' ? s.cost : 0, // Default invalid numbers to 0
          education: typeof s.education === 'number' ? s.education : 0,
          staff: typeof s.staff === 'number' ? s.staff : 0,
          facilities: typeof s.facilities === 'number' ? s.facilities : 0,
          reputation: typeof s.reputation === 'number' ? s.reputation : 0,
          nqs: typeof s.nqs === 'number' ? s.nqs : 0,
          address: typeof s.address === 'string' ? s.address : 'No Address Provided',
          lat: typeof s.lat === 'number' ? s.lat : 0,
          lng: typeof s.lng === 'number' ? s.lng : 0,
          // status and score will be added later
        }));
        setSchools(formattedSchools);
      })
      .catch(error => {
         console.error("Error fetching or processing schools.json:", error);
         setSchools([]); // Set empty on fetch/processing error
      });
  }, []);
 
  return schools;
}

function calculateScore(school: School, weights: Record<CriteriaKey, number>): number {
  let sum = 0;
  let totalWeight = 0;
  for (const c of CRITERIA) {
    const schoolValue = school[c.key];
    const weightValue = weights[c.key];

    // Defensive check: Only include in score if both values are valid numbers
    if (typeof schoolValue === 'number' && typeof weightValue === 'number' && !isNaN(schoolValue) && !isNaN(weightValue)) {
      sum += schoolValue * weightValue;
      totalWeight += weightValue;
    } else {
      // Optional: Log invalid data points
      // console.warn(`Skipping calculation for ${school.name}, criteria ${c.key}: Invalid data`, { schoolValue, weightValue });
    }
  }
  return totalWeight > 0 ? sum / totalWeight : 0;
}

function getInsights(topSchool: School | undefined, weights: Record<CriteriaKey, number>): string {
  if (!topSchool) return "Analyze schools based on your criteria to see insights here.";

  // 1. Identify top criteria based on weights
  const sortedCriteria = Object.entries(weights)
    .filter(([_, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => ({ 
      key: k as CriteriaKey, 
      label: CRITERIA.find(c => c.key === k)?.label || k, 
      weight: v 
    }));
  
  const topCriteriaLabels = sortedCriteria.slice(0, 3).map(c => c.label);

  // 2. Prepare data for the prompt
  const schoolName = topSchool.name;
  const topCriteriaString = topCriteriaLabels.join(', ');
  // Optionally include scores for top criteria if needed for more detail
  // const topScores = sortedCriteria.slice(0, 3).map(c => `${c.label}: ${topSchool[c.key]}`).join(', ');

  // --- Placeholder for LLM Integration --- 
  // TODO: Replace the rule-based string below with an actual LLM call.
  // You would typically send a prompt like the one constructed here to a backend endpoint,
  // which then securely calls the LLM API.

  // 3. Construct the prompt for the LLM
  // console.log("LLM Prompt:", prompt); // For debugging/testing

  // 4. Return a rule-based mimic of LLM output (replace with actual LLM response)
  let insight = `${schoolName} stands out as a great fit! Based on your high priority for ${topCriteriaString}, this school's strengths seem to align well with what matters most to you. It appears to be a strong contender in these key areas.`;
  // --- End Placeholder --- 

  return insight;
}

function App() {
  const allSchools = useSchools();
  const [weights, setWeights] = React.useState<Record<CriteriaKey, number>>(() =>
    Object.fromEntries(CRITERIA.map(c => [c.key, 1])) as Record<CriteriaKey, number>
  );

  // Add temporary status data to schools
  const initialSchoolsWithStatus: School[] = allSchools.map((school, index) => ({
    ...school,
    // Temporary placeholder status assignment - replace with real data logic
    status: ['None', 'Prioritised', 'Requested', 'Availability', 'No Availability'][index % 5] as SchoolStatus,
  }));

  // Calculate results based on current weights and schools with status
  const results = React.useMemo(() => {
    return initialSchoolsWithStatus
      .map(s => ({ ...s, score: calculateScore(s, weights) }))
      .sort((a, b) => b.score - a.score);
  }, [initialSchoolsWithStatus, weights]);

  const handleSliderChange = (key: string, value: number) => {
    setWeights(w => ({ ...w, [key]: value }));
  };

  const insights = getInsights(results[0], weights);

  const sidebarContent = (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Analysis & Criteria</CardTitle>
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
    </>
  );

  return (
    <Routes>
      <Route path="/" element={<MainLayout sidebar={sidebarContent} />}>
        <Route index element={<DashboardPage results={results} />} />
        <Route path="schools" element={<SchoolsPage results={results} />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}

export default App;
