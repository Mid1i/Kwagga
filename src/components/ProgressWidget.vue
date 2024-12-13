<script setup lang="ts">
	import { onMounted, ref, watch } from "vue";

	import { useTheme } from "@/store/theme";


	const props = defineProps<{
		percentage: number;
		title: string;
		value: number;
		id: number;
	}>();


	const canvasRef = ref<HTMLCanvasElement>();

	const themeStore = useTheme();


	const drawProgressCircle = (): void => {
		if (canvasRef.value) {
			const ctx = <CanvasRenderingContext2D>canvasRef.value.getContext("2d");
			const width = canvasRef.value.width;
			const height = canvasRef.value.height;
			let currentPercentage = 0;

			const drawCircle = (percentage: number): void => {
				const endAngle = (2 * Math.PI * percentage) / 100;

				ctx.beginPath();
				ctx.arc(width / 2, height / 2, 80, -Math.PI / 2, endAngle - Math.PI / 2);
				ctx.strokeStyle = "#7380EC";
				ctx.lineWidth = 20;
				ctx.stroke();
			}

			const drawText = (percentage: number): void => {
				ctx.font = "1.5vw Manrope";
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.fillStyle = themeStore.theme === "light" ? "#677483" : "#A3BDCC";
				ctx.fillText(`${percentage} %`, width / 2, height / 2);
			}

			const animateProgress = (): void => {
				ctx.clearRect(0, 0, width, height);
				drawCircle(currentPercentage);
				drawText(currentPercentage);
	
				if (currentPercentage < props.percentage) {
					currentPercentage += 2;
					currentPercentage > props.percentage && (currentPercentage = props.percentage);
					requestAnimationFrame(animateProgress);
				}
			}

			animateProgress();
		}
	}


	onMounted(drawProgressCircle);
	watch(() => themeStore.theme, drawProgressCircle);
</script>


<template>
	<section class="widget">
		<div :class="['widget__wrapper', { red: id % 3 === 1 }, { blue: id % 3 === 2 }]">
			<svg class="widget__icon" height="20" width="20">
				<use :xlink:href="`/icons/widgets.svg#widget-${id % 3 + 1}`"/>
			</svg>
		</div>
		<h3 class="widget__title">{{ title }}</h3>
		<span class="widget__value">{{ value }}</span>
		<footer class="widget__text">Броней за неделю</footer>
		
		<canvas class="widget__progress" ref="canvasRef" height="200" width="200"></canvas>
	</section>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;
	@use "@/assets/styles/mixins.scss" as *;


	.widget {
		@include layout;

		position: relative;
		width: 100%;

		&__wrapper {
			align-items: center;
			display: flex;
			justify-content: center;

			background: $accent-green;
			border-radius: 100%;
			color: $background-secondary;

			margin-bottom: 1vw;
			height: 2.1vw;
			width: 2.1vw;

			&.blue {
				background: $accent-blue;
			}

			&.red {
				background: $accent-red;
			}
		}

		&__icon {
			color: $background-secondary;

			height: 1.04vw;
			width: 1.04vw;
		}

		&__title {
			color: $text-primary;
			font-size: 0.8vw;
			font-weight: 700;

			margin-bottom: 0.5vw;
		}

		&__value {
			color: $text-primary;
			font-size: 1.6vw;
			font-weight: 700;

			margin-bottom: 1.5vw;
		}

		&__text {
			color: $text-secondary;
			font-size: 0.7vw;
		}

		&__progress {
			position: absolute;
			right: 1vw;
			top: 55%;
			
			transform: translateY(-50%);
			height: 6.25vw;
			width: 6.25vw;
		}
	}
</style>