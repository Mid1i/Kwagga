<script setup lang="ts">
	import { ref, onMounted, onUnmounted, watch } from "vue";
	import { Chart, ChartConfiguration, Plugin } from "chart.js/auto";

	import { drawDatasets } from "@/plugins/chartDatasetDraw";
	import { useTheme } from "@/store/theme";


	const props = defineProps<{
		title: string,
		config: ChartConfiguration
	}>();


	const canvasRef = ref<HTMLCanvasElement | null>(null);

	const themeStore = useTheme();

	let chart: Chart | null = null;


	const createChart = (): void => {
		if (canvasRef.value) {
			destroyChart();
			
			const afterDatasetsDraw: Plugin = {
				id: "afterDatasetsDraw",
				afterDatasetsDraw: (chart: Chart): void => drawDatasets(chart, themeStore.theme)
			}
			
			chart = new Chart(canvasRef.value, {
				...props.config,
				plugins: [afterDatasetsDraw]
			});
		}
	};

	const destroyChart = (): void => { 
		if (chart) {
			chart.destroy();
			chart = null;
		}
	}


	onMounted(createChart);
	onUnmounted(destroyChart);
	watch(() => themeStore.theme, createChart);
</script>


<template>
	<section class="chart">
		<h3 class="chart__title">{{ title }}</h3>
		<div class="chart__container">
			<canvas ref="canvasRef"	class="chart__canvas"></canvas>
		</div>
	</section>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;
	@use "@/assets/styles/mixins.scss" as *;


	.chart {
		@include layout;
		gap: 0.8vw;

		width: 100%;

		&__title {
			color: $text-primary;
			font-weight: 700;
			font-size: 0.8vw;
		}

		&__container {
			height: 5.7vw;
			width: 100%;
		}

		&__canvas {
			height: 100%;
			width: 100%;
		}
	}
</style>