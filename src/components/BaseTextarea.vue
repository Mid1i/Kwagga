<script setup lang="ts">
	defineProps<{
		isTransparent?: boolean;
		isReadonly?: boolean;
		name: string;
		text: string;
	}>();


	const localModel = defineModel();
</script>


<template>
	<div class="field">
		<textarea
			v-model="(localModel as string)"
			:class="['field__textarea', { transparent: isTransparent }]"
			:readonly="!!isReadonly"
			:name="name"
			:id="name"
		>
		</textarea>
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

		&__textarea {
			background: $background-secondary;
			border: 0.05vw solid transparent;
			border-radius: 0.25vw;

			color: $text-primary;
			font-weight: 500;
			font-size: 0.8vw;

			resize: none;

			padding: 0.5vw 1vw;

			min-height: 5.2vw;
			width: 100%;

			&.transparent {
				border-color: $background-primary;

				& + .field__label {
					background: $background-secondary;
				}
			}

			&:read-only {
				pointer-events: none;
			}

			&:focus {
				border-color: $accent-blue;
			}
		}
	}


	@media(hover: hover) {
		.field__textarea:hover {
			border-color: $accent-blue;
		}
	}
</style>