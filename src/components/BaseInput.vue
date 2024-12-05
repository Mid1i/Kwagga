<script setup lang="ts">
	defineProps<{
		isReadonly?: boolean;
		name: string;
		text: string;
		type: string;
	}>();


	const localModel = defineModel();
</script>


<template>
	<div class="field">
		<input
			v-model="localModel"
			class="field__input"
			:readonly="!!isReadonly"
			:name="name"
			:type="type"
			:id="name"
		/>
		<label class="field__label" :htmlFor="name">{{ text }}</label>
	</div>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;


	.field {
		position: relative;
		width: 100%;

		$self: #{&};

		&__label {
			background: $background-primary;

			color: $text-primary;
			font-size: 0.7vw;

			padding: 0px 0.05vw;
			pointer-events: none;

			position: absolute;
			left: 1vw;
			top: 0px;

			transform: translateY(-50%);
		}

		&__input {
			background: $background-secondary;
			border: 0.05vw solid transparent;
			border-radius: 0.25vw;

			color: $text-primary;
			font-weight: 500;
			font-size: 0.8vw;

			padding: 0px 1vw;

			height: 2.6vw;
			width: 100%;

			&:read-only {
				pointer-events: none;
			}

			&:focus {
				border-color: $accent-blue;
			}
		}
	}


	@media(hover: hover) {
		.field__input:hover {
			border-color: $accent-blue;
		}
	}
</style>