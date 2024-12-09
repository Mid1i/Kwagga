<script setup lang="ts">
	import { ref } from "vue";
	import type { TypeDadata } from "@/types/TypeDadata";
	
	import { formatAddress } from "@/helpers/formatters";


	defineProps<{
		suggestions?: TypeDadata | null;
		isTransparent?: boolean;
		isReadonly?: boolean;
		name: string;
		text: string;
		type: string;
	}>();

	defineEmits<{
		applySuggestion: [address: string]
	}>();


	const localModel = defineModel();

	const isFocus = ref<boolean>(false);
</script>


<template>
	<div class="field">
		<input
			@focus="() => isFocus = !isFocus"
			v-model="localModel"
			:class="['field__input', { transparent: isTransparent }]"
			:readonly="!!isReadonly"
			:name="name"
			:type="type"
			:id="name"
		/>
		<label class="field__label" :htmlFor="name">{{ text }}</label>

		<!-- Дополнительная секция для инпута адреса с подсказками при вводе -->
		<ul 
			v-if="suggestions && suggestions.data.suggestions.length > 0"
			:class="['field__suggestions', { active: isFocus }]"
		>
			<li 
				v-for="suggest in suggestions.data.suggestions"
				@click="$emit('applySuggestion', formatAddress(suggest))"
				:key="`${suggest.data.house}-${suggest.data.flat}-${suggest.data.street_with_type}`"
				class="field__suggestions-el"
			>
				{{ formatAddress(suggest)  }}
			</li>
		</ul>
	</div>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;
	@use "@/assets/styles/mixins.scss" as *;


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

		&__suggestions {
			@include layout;
			border-radius: 0px 0px 0.8vw 0.8vw;

			gap: 0.8vw;

			pointer-events: none;
			opacity: 0;

			position: absolute;
			top: 100%;
			left: 0px;

			width: 100%;
			z-index: 3;

			&.active {
				pointer-events: auto;
				opacity: 1;
			}

			&-el {
				color: $text-secondary;
				cursor: pointer;
				font-weight: 500;
				font-size: 0.7vw;
			}
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
		.field__input:hover {
			border-color: $accent-blue;
		}

		.field__suggestions-el:hover {
			color: $text-primary;
		}
	}
</style>