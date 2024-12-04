<script setup lang="ts">
	import { ref, computed, onMounted, onUnmounted } from "vue";
	import type { TypeBookingDateFilters } from "@/types/TypeBookingFilters";
	
	import BaseCalendar from "@/components/BaseCalendar.vue";

	import { formatDate } from "@/helpers/formatters";
	import { usePopup } from "@/hooks/usePopup";


	const props = defineProps<{
		step: "from" | "to";
		date?: Date;
		id: string;
	}>();

	const emits = defineEmits<{
		(e: "changeDate", filter: TypeBookingDateFilters): void;
	}>();


	const userDate = ref<Date | null>(props.date || null);
	const sectionRef = ref<HTMLDivElement | null>(null);
	

	const { isActivePopup, togglePopup } = usePopup();
	
	const updateUserDate = (date: Date): void => {
		emits("changeDate", { id: props.id, [props.step]: date });
		userDate.value = date;
		togglePopup();
	};

	const clearUserDate = (): void => {
		emits("changeDate", { id: props.id, [props.step]: undefined });
		userDate.value = null;
		togglePopup();
	};

	const getFormattedDate = computed<string>(() => userDate.value ? formatDate(userDate.value) : "");

	const clickOutside = (event: MouseEvent): void => {
		(isActivePopup.value && sectionRef.value && !sectionRef.value.contains(event.target as Node)) && togglePopup();
	};


	onMounted(() => window.addEventListener("click", clickOutside));
	onUnmounted(() => window.removeEventListener("click", clickOutside));
</script>


<template>
	<div @click.stop ref="sectionRef" class="wrapper">
		<button @click="togglePopup" class="wrapper__button">
			{{ getFormattedDate }}
			<svg class="wrapper__button-icon" height="20" width="18">
				<use xlink:href="@/assets/icons/calendar.svg#calendar"/>
			</svg>
		</button>
		<button 
			@click="clearUserDate"
			:class="['wrapper__cross', { active: !!userDate }]"
		>
			<svg class="wrapper__cross-icon" height="20" width="20">
				<use xlink:href="@/assets/icons/calendar.svg#cross"/>
			</svg>
		</button>
		<BaseCalendar
			@update-date="updateUserDate"
			:is-active="isActivePopup"
			:user-date="userDate"
		/>
	</div>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;
	@use "@/assets/styles/mixins.scss" as *;


	.wrapper {
		box-shadow: 0px 1.66vw 2.5vw 0px $box-shadow;

		position: relative;
		height: 2.1vw;
		width: 9.4vw;

		&__button {
			appearance: none;
			background: $background-secondary;
			border: 0.05vw solid transparent;
			display: block;

			color: $text-primary;
			cursor: pointer;
			font-weight: 700;
			font-size: 0.8vw;
			text-align: left;

			position: relative;
			padding: 0.5vw 0.8vw;
			height: 100%;
			width: 100%;

			&-icon {
				color: $text-secondary;
				cursor: pointer;

				position: absolute;
				right: 0.8vw;
				top: 50%;

				transform: translateY(-50%);
			}
		}

		&__cross {
			position: absolute;
			right: -1vw;
			top: 50%;

			transform: translateY(-50%);
			pointer-events: none;
			opacity: 0;

			&.active {
				pointer-events: auto;
				opacity: 1;
			}

			&-icon {
				color: $text-primary;

				height: 0.6vw;
				width: 0.6vw;
			}
		}
	}


	@media(hover: hover) {
		.wrapper:hover .wrapper__button {
			border-color: $text-secondary;
		}

		.wrapper__button-icon:hover {
			color: $text-primary;
		}
	}
</style>