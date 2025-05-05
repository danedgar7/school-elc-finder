import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const NewsPage: React.FC = () => {
  // Placeholder data - replace with actual news items later
  const newsItems = [
    { id: 1, title: 'Understanding the Child Care Subsidy (CCS)', excerpt: 'Learn how the CCS can make childcare more affordable and how to apply...', date: 'May 5, 2025' },
    { id: 2, title: 'Key Dates: When to Apply for 3 & 4 Year Old Kinder', excerpt: 'Council enrollment timelines and key deadlines you need to know...', date: 'May 3, 2025' },
    { id: 3, title: 'NQS Ratings Explained: What Do They Mean for Your Child?', excerpt: 'Decoding the National Quality Standard ratings (Working Towards, Meeting, Exceeding)...', date: 'May 1, 2025' },
    { id: 4, title: 'Choosing the Right ELC: Play-Based vs Structured Learning', excerpt: 'Exploring different educational philosophies to find the best fit for your child...', date: 'April 28, 2025' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">News Feed</h1>
      <div className="flex flex-col gap-6">
        {newsItems.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{item.excerpt}</p>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="p-0 h-auto">Read More</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
