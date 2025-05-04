import * as React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ResultsChartProps {
  data: Array<{ name: string; score: number }>;
}

export function ResultsChart({ data }: ResultsChartProps) {
  const chartData = React.useMemo(() => ({
    labels: data.map((d) => d.name),
    datasets: [
      {
        label: "Score",
        data: data.map((d) => d.score),
        backgroundColor: "#2563eb",
        borderRadius: 6,
      },
    ],
  }), [data]);

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        min: 0,
        max: 10,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div className="w-full h-64 mb-8 bg-white p-4 rounded shadow">
      <Bar data={chartData} options={options} />
    </div>
  );
}
