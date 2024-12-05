<script setup lang="ts">
	defineProps<{
		isActive?: boolean
		id: string
	}>();
</script>


<template>
	<input 
		:checked="isActive"
		:id="id"
		class="checkbox"
		type="checkbox"
	>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;
	@use "@/assets/styles/mixins.scss" as *;


	.checkbox {
		appearance: none;
		cursor: pointer;

		background: $background-secondary;
		box-shadow: 0px 1.6vw 2.5vw 0px $box-shadow;
		border: 0.05vw solid transparent;
		border-radius: 0.25vw;

		position: relative;
		height: 1vw;
		width: 1vw;

		&:checked::before {
			color: $text-primary;
			content: "✔";

			position: absolute;
			left: 50%;
			top: 50%;

			transform: translate(-50%, -55%);
		}
	}
</style>