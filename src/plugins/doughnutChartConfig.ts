import { ChartConfiguration, TooltipItem } from "chart.js";
import type { TypeTheme } from "@/types/TypeThemes";


export const chartConfig = (data: number[], labels: string[], colors: string[], theme: TypeTheme): ChartConfiguration => ({
	type: "doughnut",
	data: {
		labels: labels,
		datasets: [{
			label: "",
			data: data,
			backgroundColor: colors,
			hoverBackgroundColor: [...colors.map(item => `${item.slice(0, -1)}, .9)`)],
			borderWidth: 0
		}]
	},
	options: {
		maintainAspectRatio: false,
		responsive: true,
		plugins: {
			legend: {
				display: false
			},
			tooltip: {
				cornerRadius: 10,
				displayColors: false,
				titleAlign: "center",
				titleMarginBottom: 10,
				bodyFont: {
					family: "Manrope",
					size: 16,
					weight: "bold",
				},
				bodyAlign: "center",
				padding: {
					y: 5,
					x: 10,
				},
				callbacks: {
					label: (context: TooltipItem<"doughnut">) => `${context.formattedValue} %`
				},
				titleColor: theme === "light" ? "#363949" : "#EDEFFD",
				titleFont: {
					family: "Manrope",
					size: 14,
					weight: "normal",
				},
				footerColor: theme === "light" ? "#363949" : "#EDEFFD",
				footerAlign: "center",
				footerMarginTop: 20,
				footerFont: {
					family: "Manrope",
					size: 14,
					weight: "normal",
				}
			}
		}
	} 
})