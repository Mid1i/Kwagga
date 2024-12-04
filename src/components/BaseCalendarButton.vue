<script setup lang="ts">
	defineProps<{
		icon: string;
	}>();
</script>


<template>
	<button class="button">
		<svg class="button__icon" height="14" width="8">
			<use :xlink:href="`src/assets/icons/calendar.svg#${icon}`"/>
		</svg>
	</button>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;


	.button {
		border-radius: 0.25vw;
		flex: 0 0 auto;

		padding: 0.2vw;

		&__icon {
			color: $text-primary;

			height: 0.6vw;
			width: 0.6vw;
		}
	}


	@media(hover: hover) {
		.button:hover {
			background: $background-primary;
		}
	}
</style>