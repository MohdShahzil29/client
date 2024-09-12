"use client";
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
import { useState } from "react";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart() {
  const [data, setData] = useState({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Money Earned in USD",
        backgroundColor: new Array(12).fill("blue"),
        hoverBackgroundColor: new Array(12).fill("#ffcc00"),
        data: [100, 50, 75, 125, 200, 305, 90, 400, 250, 100, 75, 150],
      },
    ],
  });

  return (
    <div>
      <Bar
        data={data}
        options={{
          plugins: {
            tooltip: {
              enabled: true,
            },
          },
          responsive: true,
        }}
      />
    </div>
  );
}
