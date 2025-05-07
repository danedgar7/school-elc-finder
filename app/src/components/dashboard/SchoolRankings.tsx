import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell, Legend, LegendProps,
} from "recharts";

// Define the chart configuration
const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

// Define NQS statuses and corresponding colors using theme variables
const nqsStatusColors: { [key: string]: string } = {
  "Exceeding NQS": "hsl(var(--chart-2))", // Set back to the blue observed previously (chart-2)
  "Meeting NQS": "hsl(210, 100%, 75%)", // Light Blue
  "Working Towards NQS": "hsl(var(--muted))", // Light Grey
  "Significant Improvement Required": "hsl(var(--muted))", // Light Grey
  "Awaiting Assessment": "hsl(var(--muted))", // Light Grey
  "Provisional Rating": "hsl(var(--muted))", // Light Grey
  "New Service": "hsl(var(--muted))", // Light Grey
  "Not yet rated": "hsl(var(--muted))", // Light Grey
  "Default": "hsl(var(--muted))" // Fallback color
};

// Helper function to get color based on NQS status
function getColorForNQS(status: string | null): string {
  if (!status) {
    return nqsStatusColors["Default"];
  }
  // Handle specific cases based on the new scheme
  if (status === "Exceeding NQS") {
    return nqsStatusColors["Exceeding NQS"]; // Ensure this uses chart-2
  }
  if (status === "Meeting NQS") {
    return nqsStatusColors["Meeting NQS"];
  }
  // All other statuses map to light grey
  return nqsStatusColors["Default"]; // Use Default which is now muted grey
}

export interface SchoolResult {
  name: string;
  score: number;
  nqs_actual: string | null; // Add nqs_actual field
}

interface RankingsProps {
  results: SchoolResult[]; // Use the detailed interface
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

  // Prepare simplified legend payload
  const legendPayload: LegendProps['payload'] = [
    {
      value: "Exceeding NQS",
      type: 'square',
      id: "Exceeding NQS",
      color: nqsStatusColors["Exceeding NQS"], // Use chart-2
    },
    {
      value: "Meeting NQS",
      type: 'square',
      id: "Meeting NQS",
      color: nqsStatusColors["Meeting NQS"],
    },
    {
      value: "Other", // Represent all grey statuses
      type: 'square',
      id: "Other",
      color: nqsStatusColors["Default"], // Use the default grey color
    }
  ];

  return (
    <Card className="h-[500px] flex flex-col"> {/* Increased height for legend */}
      {/* Add Header */}
      <CardHeader>
        <CardTitle>School Rankings</CardTitle>
        <CardDescription>Schools ranked by weighted score based on your criteria. Color indicates NQS rating.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-0 pl-2 pr-4 pb-2"> {/* Adjusted padding */}
        <ChartContainer config={chartConfig} className="w-full h-full">
          <BarChart
            accessibilityLayer
            data={sortedResults}
            margin={{ top: 5, right: 5, left: 0, bottom: 60 }} // Adjusted margins
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={<CustomAxisTick />}
              height={60} // Keep height for rotated ticks
              interval={0}
            />
            <YAxis
              domain={[(dataMin: number) => dataMin * 0.9, (dataMax: number) => dataMax * 1.0]}
              tick={{ fontSize: 10 }}
              width={40} // Width for Y-axis labels
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => Math.round(value).toString()}
              tickCount={2} // Only show 2 ticks (min and max)
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />} // Keep tooltip simple
            />
            <Bar dataKey="score" radius={4}>
              {sortedResults.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColorForNQS(entry.nqs_actual)} />
              ))}
            </Bar>
            {/* Add Legend at the bottom */}
            <Legend 
              verticalAlign="bottom" 
              align="center" 
              wrapperStyle={{ paddingTop: '20px' }} // Add some space above legend
              payload={legendPayload} 
              iconSize={10} // Smaller icon size
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* Optional Footer */}
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          NQS Status Key: ...
        </div>
      </CardFooter> */}
    </Card>
  );
}

// Minimal ChartConfig definition needed for ChartContainer type
import type { ChartConfig } from "@/components/ui/chart";
