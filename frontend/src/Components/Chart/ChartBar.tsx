import { Box } from "@chakra-ui/react";
import {
	BarController,
	BarElement,
	CategoryScale,
	Chart,
	LinearScale,
} from "chart.js";
import React, { useEffect, useRef } from "react";
import { Localisation } from "../../Models/Localisation";

interface BarChartProps {
	localisation: Localisation | undefined;
	name: string[];
}
export default function BarChart({
	localisation,
	name,
}: BarChartProps): JSX.Element {
	const chartRef = useRef<HTMLCanvasElement | null>(null);
	useEffect(() => {
		if (localisation !== undefined) {
			if (chartRef.current) {
				const ctx = chartRef.current.getContext("2d");
				if (ctx) {
					Chart.register(
						BarController,
						BarElement,
						CategoryScale,
						LinearScale
					);
					// If there's an existing chart instance, destroy it
					if (chartRef.current) {
						const chartInstance = Chart.getChart(chartRef.current);
						if (chartInstance) {
							chartInstance.destroy();
						}
					}
					new Chart(ctx, {
						type: "bar",
						data: {
							labels: name,
							datasets: [
								{
									label: "# of Votes",
									data: [
										localisation[name[0]]?.length,
										localisation[name[1]]?.length,
										localisation[name[2]]?.length,
										localisation[name[3]]?.length,
										localisation[name[0]]?.length,
										3,
									],
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
	}, [name]);

	return (
		<>
			<Box
				maxW="sm"
				borderWidth="1px"
				borderRadius="lg"
				overflow="hidden"
			>
				<div
					className="container"
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "500px",
					}}
				>
					<canvas ref={chartRef} />
				</div>
			</Box>
		</>
	);
}
