import {
  Card, CardContent,
} from "@/components/ui/card";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar, BarChart, CartesianGrid, XAxis, YAxis,
} from "recharts";

// Define the chart configuration
const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface RankingsProps {
  results: { name: string; score: number }[];
}

// Restore CustomAxisTick definition
const CustomAxisTick = ({ x, y, payload }: any) => {
  if (!payload?.value) {
    return null;
  }
  const words = payload.value.split(' ');
  const midpoint = Math.ceil(words.length / 2);
  const line1 = words.slice(0, midpoint).join(' ');
  const line2 = words.slice(midpoint).join(' ');

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={5} textAnchor="end" fill="#666" fontSize={10} transform="rotate(-45)">
        <tspan x="0" dy="0">{line1}</tspan>
        <tspan x="0" dy="1.2em">{line2}</tspan>
      </text>
    </g>
  );
};

export function SchoolRankings({ results }: RankingsProps) {
  // Sort results by score descending
  const sortedResults = [...results].sort((a, b) => b.score - a.score);

  return (
    <Card className="h-96 flex flex-col">
      <CardContent className="flex-grow p-0">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <BarChart
            accessibilityLayer
            data={sortedResults}
            // Hide Y-axis, set left margin to match right (20)
            margin={{ top: 20, right: 20, left: 35, bottom: 60 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              // Restore previous X-axis props
              tick={<CustomAxisTick />}
              height={60}
              interval={0}
            />
            {/* Make YAxis visible, control width, remove lines */}
            <YAxis 
              domain={[(dataMin: number) => Math.floor(dataMin * 0.90), (dataMax: number) => Math.ceil(dataMax * 1.02)]} 
              tick={{ fontSize: 10 }} 
              width={15} // Allocate space for labels
              axisLine={false} // Hide axis line
              tickLine={false} // Hide tick lines
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />} // Show only value on hover
            />
            <Bar dataKey="score" fill="var(--color-score)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing calculated scores based on your preferences.
        </div>
      </CardFooter> */}
    </Card>
  );
}

// Minimal ChartConfig definition needed for ChartContainer type
import type { ChartConfig } from "@/components/ui/chart";
