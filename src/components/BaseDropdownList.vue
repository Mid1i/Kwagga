<script setup lang="ts">
	import { ref } from "vue";

	import type { TypeBookingFilters } from "@/types/TypeBookingFilters";

	import BaseCheckbox from "@/components/BaseCheckbox.vue";


	defineProps<{
		isActiveElement: (filter: TypeBookingFilters) => boolean;
		id: number;
		name: string;
		elements: {
			id: number;
			name: string;
		}[];
	}>();

	defineEmits<{
		changeElement: [filter: TypeBookingFilters];
	}>();


	const isActiveList = ref<boolean>(false);
</script>


<template>
	<section class="dropdown">
		<header
			@click="() => isActiveList = !isActiveList" 
			class="dropdown__header"
		>
			{{ name }}
			<button :class="['dropdown__header-button', { active: isActiveList }]"></button>
		</header>
		<ul :class="['dropdown__list', { active: isActiveList }]">
			<li
				v-for="element in elements"
				:key="element.id"
				class="dropdown__list-el"
			>
				<BaseCheckbox 
					@click="$emit('changeElement', { spaceId: id, placeId: element.id })" 
					:is-active="isActiveElement({ spaceId: id, placeId: element.id })"
					:id="`${element.name}${element.id}`"
				/>
				<label :for="`${element.name}${element.id}`" class="dropdown__list-label">{{ element.name }}</label>
			</li>
		</ul>	
	</section>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;
	@use "@/assets/styles/mixins.scss" as *;


	.dropdown {
		display: flex;
		flex-direction: column;
		width: 14.6vw;

		&__header {
			align-items: center;
			display: flex;
			justify-content: space-between;
			
			color: $text-primary;
			font-weight: 700;
			font-size: 0.8vw;
			cursor: pointer;

			&-button {
				position: relative;

				height: 0.5vw;
				width: 0.5vw;

				&::before,
				&::after {
					background: $text-primary;
					content: "";

					position: absolute;
					top: 15%;
					
					transition: all 0.1s ease-in-out;
					height: 0.1vw;
					width: 100%;
				}

				&::before {
					left: -0.1vw;
					transform: translateY(-50%) rotate(45deg);
					transform-origin: left top;
				}

				&::after {
					right: -0.1vw;	
					transform: translateY(-50%) rotate(-45deg);
					transform-origin: right top;
				}

				&.active::before,
				&.active::after {
					top: 0px;
					width: 1.05vw;
				}
			}
		}

		&__list {
			display: flex;
			flex-direction: column;
			gap: 0.8vw;

			transition: all 0.1s ease-in-out;
			overflow: hidden;
			opacity: 0;

			margin-top: 0px;
			max-height: 0px;
			
			&.active {
				opacity: 1;
				margin-top: 1vw;
				max-height: 10.4vw;
			}

			&-el {
				align-items: center;
				display: flex;
				gap: 0.5vw;
			}

			&-label {
				color: $text-secondary;
				font-size: 0.7vw;
				cursor: pointer;
			}
		}
	}


	@media(hover: hover) {
		.dropdown__list-el:hover .checkbox {
			border-color: $text-primary;
		}

		.dropdown__list-el:hover .dropdown__list-label {
			color: $text-primary;
		}
	}
</style>