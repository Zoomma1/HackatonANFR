import React, { useEffect, useRef } from "react";
import { Localisation } from "../../Models/Localisation";
import {
  Chart,
  BarController,
  CategoryScale,
  BarElement,
  LinearScale,
} from "chart.js";

interface BarChartProps {
  localisation: Localisation | undefined;
  name: string[];
}
export function BarChart({ localisation, name }: BarChartProps): JSX.Element {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (chartRef.current) {
      const ctx = "2d";
      if (ctx) {
        if (chartRef.current) {
          const chartInstance = Chart.getChart(chartRef.current);
          if (chartInstance) {
            chartInstance.destroy();
          }
        }
        if (ctx) {
          Chart.register(BarController, BarElement, CategoryScale, LinearScale);

          new Chart(ctx, {
            type: "bar",
            data: {
              labels: name,
              datasets: [
                {
                  label: "# of Votes",
                  data: [12, 19, 3, 5, 2, 3],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        }
      }
    }
  }, []);

  return <canvas ref={chartRef} />;
}
