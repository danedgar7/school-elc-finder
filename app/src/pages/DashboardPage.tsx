import * as React from 'react';
import { SchoolRankings } from '../components/dashboard/SchoolRankings';
import { SchoolMap } from '../components/dashboard/SchoolMap';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

// Define the School type (or import from a shared types file if it exists)
// Duplicating temporarily - consider moving to types.ts
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
  score?: number; // Add score if it's calculated and passed
};

interface DashboardPageProps {
  results: School[];
}

const DashboardPage: React.FC<DashboardPageProps> = ({ results }) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>School Rankings</CardTitle>
          <CardDescription>
            Schools ranked by weighted score based on your criteria.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Ensure results passed to SchoolRankings matches expected prop type */}
          <SchoolRankings results={results.map(s => ({ name: s.name, score: s.score ?? 0 }))} />
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
    </>
  );
};

export default DashboardPage;
