<script setup lang="ts">
	import { onMounted, ref } from "vue";


	const props = defineProps<{
		title: string;
		previousValue: number;
		value: number;
		id: number;
	}>();


	const percentage = ref<number>(0);

	const animatePercentage = (): void => {
		const calculatedPercentage = Math.ceil(props.value / props.previousValue * 100 - 100);
		const startTime = performance.now();

		const animate = (currentTime: number): void => {
			const elapsedTime = currentTime - startTime;
			const progress = Math.min(elapsedTime / 1000, 1);
			
			percentage.value = Math.floor(calculatedPercentage * progress);
			progress < 1 && requestAnimationFrame(animate);
		}

		requestAnimationFrame(animate);
	}


	onMounted(animatePercentage);
</script>


<template>
	<section class="analytics">
		<div :class="['analytics__wrapper', {blue: title === 'Пользователи'}]">
			<svg class="analytics__icon" height="20" width="20">
				<use :xlink:href="`src/assets/icons/sidebar.svg#sidebar-${title === 'Пользователи' ? 2 : 5}`"/>
			</svg>
		</div>
		<div class="analytics__col">
			<h3 class="analytics__title">{{ title }}</h3>
			<p class="analytics__text">За неделю</p>
		</div>
		<span :class="['analytics__value', { increased: previousValue < value }, { decreased: previousValue > value }]">
			{{ `${previousValue < value ? "+" : ""}${percentage}%` }}
		</span>
		<span class="analytics__value">{{ value }}</span>
	</section>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;
	@use "@/assets/styles/mixins.scss" as *;


	.analytics {
		@include layout;
		flex-direction: row;
		gap: 0.8vw;

		&__wrapper {
			align-items: center;
			display: flex;
			flex: 0 0 auto;
			justify-content: center;

			background: $accent-green;
			border-radius: 100%;
			color: $background-secondary;

			height: 2.1vw;
			width: 2.1vw;

			&.blue {
				background: $accent-blue;
			}
		}

		&__icon {
			color: $background-secondary;

			height: 1.04vw;
			width: 1.04vw;
		}

		&__col {
			display: flex;
			flex: 1 0 auto;
			flex-direction: column;
			gap: 0.2vw;
		}

		&__title {
			color: $text-primary;
			font-weight: 700;
			font-size: 0.8vw;
			text-transform: uppercase;
		}

		&__text {
			color: $text-secondary;
			font-size: 0.7vw;
		}

		&__value {
			color: $text-primary;
			font-weight: 700;
			font-size: 0.8vw;

			text-align: center;
			width: 2.1vw;

			&.increased {
				color: $accent-green;
			}

			&.decreased {
				color: $accent-red;
			}
		}
	}
</style>