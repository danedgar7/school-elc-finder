import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, BadgeCheck, DollarSign, MapPin, Sparkles } from 'lucide-react';
import SchoolCardMap from '@/components/schools/SchoolCardMap';
import StatusBadge from '@/components/common/StatusBadge';
import type { SchoolStatus } from '@/App';

// TODO: Move this type to a central types.ts file
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
  status?: SchoolStatus;
  score?: number; // Calculated score passed from App.tsx
};

interface SchoolsPageProps {
  results: School[];
}

// Helper function to identify strengths (simple example)
const getStrengths = (school: School): string => {
  const strengths: string[] = [];
  // Check if properties are valid numbers before comparing
  if (typeof school.education === 'number' && school.education > 8) strengths.push('Education');
  if (typeof school.staff === 'number' && school.staff > 8) strengths.push('Staff Quality');
  if (typeof school.facilities === 'number' && school.facilities > 8) strengths.push('Facilities');
  if (typeof school.nqs === 'number' && school.nqs > 8) strengths.push('High NQS Rating');
  if (strengths.length === 0) return 'Offers a balanced program across different areas.';
  return `Particularly strong in: ${strengths.slice(0, 2).join(', ')}.`;
};

// Restore generateSummary function
const generateSummary = (school: School): string => {
  const location = typeof school.address === 'string' ? school.address : 'an unspecified location';
  const focus = typeof school.education === 'number' && school.education > 7 ? 'strong educational programs' : 'various learning activities';
  return `A learning center located at ${location}. Known for its focus on ${focus}.`;
};

const SchoolsPage: React.FC<SchoolsPageProps> = ({ results }) => {
  if (!results || results.length === 0) {
    return <div className="p-4">Loading school data or no schools found...</div>;
  }

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {results.map((school, index) => (
        <Card key={school.id} className="flex flex-col">
          {/* Revert to relative/absolute positioning */}
          <CardHeader className="relative pb-4">
            {/* Absolute position top-right, adjusted top */}
            <div className="absolute top-6 right-4"> {/* Increased top value */}
              {school.status && <StatusBadge status={school.status} />}
            </div>
            {/* Restore CardTitle and CardDescription */}
            <CardTitle className="text-xl font-semibold">{school.name}</CardTitle>
            <CardDescription>{generateSummary(school)}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-between space-y-4">
            {/* Icons/Buttons Row */}
            <div className="flex justify-between items-center border-t border-b py-3">
              {/* Rank Button */}
              <Button variant="outline" size="sm" className="flex flex-row items-center gap-1.5 p-2 text-xs">
                <Award className="h-4 w-4" />
                <span>Rank #{index + 1}</span>
                <span className="text-muted-foreground">
                  ({typeof school.score === 'number' ? school.score.toFixed(1) : 'N/A'})
                </span>
              </Button>
              {/* NQS Button */}
              <Button variant="outline" size="sm" className="flex flex-row items-center gap-1.5 p-2 text-xs">
                <BadgeCheck className="h-4 w-4" />
                <span>NQS:&nbsp;</span> {/* Added non-breaking space */}
                <span className="text-muted-foreground">
                  {typeof school.nqs === 'number' ? school.nqs : 'N/A'}/10
                </span>
              </Button>
              {/* Cost Button */}
              <Button variant="outline" size="sm" className="flex flex-row items-center gap-1.5 p-2 text-xs">
                <DollarSign className="h-4 w-4" />
                <span>Cost:&nbsp;</span> {/* Added non-breaking space */}
                <span className="text-muted-foreground">
                  {typeof school.cost === 'number' ? school.cost : 'N/A'}/10
                </span>
              </Button>
            </div>

            {/* Strengths */}
            <div className="text-sm">
              <h4 className="font-medium mb-1 flex items-center"><Sparkles className="h-4 w-4 mr-1 text-yellow-500"/> Strengths</h4>
              <p className="text-muted-foreground pl-5">{getStrengths(school)}</p>
            </div>

            {/* Map */}
            <div className="mt-auto pt-4 border-t">
              <h4 className="font-medium mb-2 flex items-center"><MapPin className="h-4 w-4 mr-1 text-blue-500"/> Location</h4>
              <div className="h-32 bg-muted rounded flex items-center justify-center text-muted-foreground text-sm">
                <SchoolCardMap lat={school.lat} lng={school.lng} schoolName={school.name} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SchoolsPage;
