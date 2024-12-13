<script setup lang="ts">
	import { ref, computed, onMounted, onUnmounted, watch } from "vue";
	import type { TypeBookingDateFilter } from "@/types/TypeBookingFilters";
	import type { TypeBooking } from "@/types/TypeBookings";
	
	import BaseCalendar from "@/components/BaseCalendar.vue";

	import { formatDate } from "@/helpers/formatters";
	import { usePopup } from "@/hooks/usePopup";


	const props = defineProps<{
		step: "from" | "to";
		date?: Date | null;
		isLeft?: boolean;
		id: string;
	}>();

	const emits = defineEmits<{
		updateBooking: [value: TypeBooking[keyof TypeBooking], id: keyof TypeBooking];
		changeDate: [filter: TypeBookingDateFilter];
	}>();


	/**
	 * Выбранная дата или `null`.
	 */
	const userDate = ref<Date | null>(props.date || null);

	/**
	 * Ref области (для обработки клика вне неё).
	 */
	const sectionRef = ref<HTMLDivElement | null>(null);
	

	const { isActivePopup, togglePopup } = usePopup();

	/**
	 * Получение отфарматированной даты в формате `ДД.ММ.ГГГГ`.
	 */
	 const getFormattedDate = computed<string>(() => userDate.value ? formatDate(userDate.value) : "");
	
	/**
	 * Изменение выбранной даты.
	 * @param {Date} date - Новая дата. 
	 */
	const updateUserDate = (date: Date): void => {
		userDate.value = date;

		emits("changeDate", { id: props.id, [props.step]: date });
		emits("updateBooking", getFormattedDate.value, props.id as keyof TypeBooking);

		userDate.value = date;
		togglePopup();
	};

	/**
	 * Сброс выбранной даты.
	 */
	const clearUserDate = (): void => {
		emits("changeDate", { id: props.id, [props.step]: undefined });
		emits("updateBooking", "", props.id as keyof TypeBooking);

		userDate.value = null;
		togglePopup();
	};
	
	/**
	 * Обработка клика вне области.
	 * @param {MouseEvent} event - Событие клика. 
	 */
	const clickOutside = (event: MouseEvent): void => {
		(isActivePopup.value && sectionRef.value && !sectionRef.value.contains(event.target as Node)) && togglePopup();
	};

	/**
	 * Установка даты при её изменении на родительском уровне.
	 */
	const setDate = (): void => {
		userDate.value = props.date ? props.date : null;
	};


	watch(() => props.date, setDate);
	onMounted(() => window.addEventListener("click", clickOutside));
	onUnmounted(() => window.removeEventListener("click", clickOutside));
</script>


<template>
	<div @click.stop ref="sectionRef" class="wrapper">
		<button @click="togglePopup" class="wrapper__button">
			{{ getFormattedDate }}
			<svg class="wrapper__button-icon" height="20" width="18">
				<use xlink:href="/icons/calendar.svg#calendar"/>
			</svg>
		</button>
		<button 
			@click="clearUserDate"
			:class="['wrapper__cross', { active: !!userDate }]"
		>
			<svg class="wrapper__cross-icon" height="20" width="20">
				<use xlink:href="/icons/calendar.svg#cross"/>
			</svg>
		</button>
		<BaseCalendar
			@update-date="updateUserDate"
			:is-active="isActivePopup"
			:user-date="userDate"
			:is-left="isLeft"
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
			border-color: $accent-blue;

			& .wrapper__button-icon {
				color: $accent-blue;
			}
		}
	}
</style>