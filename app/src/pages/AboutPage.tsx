import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const AboutPage: React.FC = () => {
  // Placeholder image URL - replace with an actual image URL or local asset
  const backgroundImageUrl = 'https://images.unsplash.com/photo-1503676260728-1c65c69268b0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    <div
      className="relative h-[calc(100vh-120px)] flex items-center justify-center bg-cover bg-center" // Adjust height calculation based on header/footer
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      {/* Overlay to darken the background slightly for better text contrast */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content Card */}
      <Card className="relative z-10 w-full max-w-2xl mx-4 bg-card/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">About School Scout</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p>
            School Scout helps parents and guardians find the best schools and early learning centers
            based on criteria that matter most to them.
          </p>
          <p>
            Customize weighting for factors like cost, educational quality, staff ratings, facilities,
            reputation, and NQS ratings to get personalized rankings and insights.
          </p>
          <p className="text-sm text-muted-foreground">
            (Version 1.0.0 - Placeholder Text)
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;
