import * as React from 'react';
import { SchoolRankings, type SchoolResult } from '../components/dashboard/SchoolRankings'; 
import { SchoolMap, type School as MapSchool } from '../components/dashboard/SchoolMap'; 
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface DashboardSchool {
  id: string | number; 
  name: string;
  latitude?: number; 
  longitude?: number; 
  lat?: number;     
  lng?: number;     
  address?: string;   
  suburb?: string;
  postcode?: string;
  score?: number; 
  nqs_actual?: string | null; 
  cost?: number;
  education?: number;
  staff?: number;
  wellbeing?: number;
  community?: number;
}

interface DashboardPageProps {
  results: DashboardSchool[]; 
}

const DashboardPage: React.FC<DashboardPageProps> = ({ results }) => {

  const rankingResults: SchoolResult[] = results.map(s => ({
    name: s.name,
    score: s.score ?? 0, // Provide default value of 0 for undefined scores
    nqs_actual: s.nqs_actual ?? null
  }));

  const mapSchools: MapSchool[] = results
    .filter(s => (s.lat !== undefined && s.lng !== undefined) || (s.latitude !== undefined && s.longitude !== undefined)) 
    .map(s => {
      const finalLat = s.lat ?? s.latitude ?? 0;
      const finalLng = s.lng ?? s.longitude ?? 0;
      return {
        id: typeof s.id === 'string' ? parseInt(s.id, 10) : s.id, 
        name: s.name,
        address: s.address ?? 'Address not available', 
        lat: finalLat, 
        lng: finalLng, 
        score: s.score 
      };
    })
    .filter(s => !isNaN(s.id)); 


  return (
    <>
      <div className="col-span-1 lg:col-span-2">
        <SchoolRankings results={rankingResults} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>School Locations</CardTitle>
          <CardDescription>
            Geographic distribution of schools with score indicators.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SchoolMap schools={mapSchools} /> 
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardPage;
