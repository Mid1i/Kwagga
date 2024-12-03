<script setup lang="ts">
	import { onMounted, onUnmounted, watch, ref } from "vue";
	import { Chart } from "chart.js/auto";

	import { chartConfig } from "@/plugins/doughnutChartConfig";
	import { useTheme } from "@/store/theme";


	const props = defineProps<{
		isBigger?: boolean;
		colors: string[],
		data: number[],
		labels: string[]
	}>();


	const canvasRef = ref<HTMLCanvasElement | null>(null);

	const themeStore = useTheme();

	let chart: Chart | null = null;

	const createChart = (): void => {
		if (canvasRef.value) {
			destroyChart();
			
			chart = new Chart(canvasRef.value, chartConfig(props.data, props.labels, props.colors, themeStore.theme));
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
	<div class="chart">
		<div :class="['chart__container', { big: isBigger }]">
			<canvas class="chart__container-canvas" ref="canvasRef"></canvas>
		</div>
		<ul class="chart__list">
			<li
				v-for="(label, index) in labels"
				:key="label"
				class="chart__list-el"
			>
				<span :style="`background: ${colors[index]}`"	class="chart__list-box"></span>
				{{ label }}
			</li>
		</ul>
	</div>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;
	@use "@/assets/styles/mixins.scss" as *;


	.chart {
		align-items: center;
		display: flex;
		flex: 1 1 50%;
		flex-direction: column;
		gap: 0.5vw;

		&__container {
			height: 6vw;
			width: 100%;

			&.big {
				height: 8vw;
			}

			&-canvas {
				height: 100% !important;
				width: 100% !important;
			}
		}

		&__list {
			display: flex;
			flex-direction: column;
			gap: 0.5vw;

			&-el {
				align-items: center;
				display: flex;
				gap: 0.25vw;

				color: $text-secondary;
				font-size: 0.7vw;
			}

			&-box {
				border-radius: 0.25vw;

				height: 0.7vw;
				width: 0.7vw;
			}
		}
	}
</style>