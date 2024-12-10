<script setup lang="ts">
	import { ref, computed } from "vue";
	import type { TypeCalendarDay } from "@/types/TypeCalendarDay";

	import BaseCalendarButton from "@/components/BaseCalendarButton.vue";

	import { getWeekDayNumber } from "@/helpers/calendar";
	import { formatMonth } from "@/helpers/formatters";
	import { CALENDAR_HEADERS } from "@/constants";


	const props = defineProps<{
		isLeft?: boolean;
		isActive: boolean;
		userDate: Date | null;
	}>();

	defineEmits<{
		updateDate: [date: Date];
	}>();
	
	/**
	 * Режим календаря.
	 */
	const activeMode = ref<"calendar" | "months" | "years">("calendar");

	/**
	 * Показываемая страница года (по умолчанию 0 - 2020-2040).
	 */
	const yearsModePage = ref<number>(0);

	/**
	 * Текущий месяц.
	 */
	const currentMonth = ref<number>(new Date().getMonth());

	/**
	 * Текущий год.
	 */
	const currentYear = ref<number>(new Date().getFullYear());

	/**
	 * Заполнение календаря в соотсетствие с днями недели.
	 */
	const getMonthDates = computed<TypeCalendarDay[]>(() => {
		const date = new Date(currentYear.value, currentMonth.value);
		const firstDayOfMonth: number = getWeekDayNumber(date);
		const dates: TypeCalendarDay[] = [];
		
		date.setDate(date.getDate() - firstDayOfMonth);

		const previousMonthCondition = (): boolean => dates.length < firstDayOfMonth;
		const currentMonthCondition = (): boolean => date.getMonth() === currentMonth.value;
		const nextMonthCondition = (): boolean => getWeekDayNumber(date) !== 0 && getWeekDayNumber(date) < 7;
		
		while (previousMonthCondition() || currentMonthCondition() || nextMonthCondition()) {
			dates.push({
				date: new Date(date),
				isMuted: !currentMonthCondition()
			});
			
			date.setDate(date.getDate() + 1);
		};
		
		return dates;
	});

	/**
	 * Получение массива лет при выборе года.
	 */
	const getYearsModeContent = computed<number[]>(() => {
		const nearestYear = currentYear.value - (currentYear.value % 10) + 10 * yearsModePage.value;
		return Array.from({ length: 21 }, (_, i) => nearestYear + i);
	});

	/**
	 * Проверяет выбрана дата или нет.
	 * @param {Date} date - Указанная дата. 
	 */
	const isSelectedDate = (date: Date): boolean => props.userDate?.getTime() === date.getTime();

	/**
	 * Изменение года.
	 * @param {number} year - Новый год. 
	 */
	const updateYear = (year: number): void => {
		activeMode.value = "calendar";
		currentYear.value = year;
	};

	/**
	 * Изменение месяца.
	 * @param {number} month - Номер нового месяца. 
	 */
	const updateMonth = (month: number): void => {
		currentMonth.value = (month + 12) % 12;
		if (month < 0) currentYear.value--;
		if (month > 11) currentYear.value++;
		activeMode.value = "calendar";
	};
</script>


<template>
	<div :class="['calendar', { active: isActive }, { left: isLeft }]">
		<div :class="['calendar__main', { active: activeMode === 'calendar' && isActive }]">
			<header class="calendar__header">

				<div class="calendar__header-month">
					<BaseCalendarButton @click="updateMonth(currentMonth - 1)" icon="arrow-left"/>
					<button @click="() => activeMode = 'months'" class="calendar__header-button month">{{ formatMonth(currentMonth) }}</button>
					<BaseCalendarButton @click="updateMonth(currentMonth + 1)" icon="arrow-right"/>
				</div>

				<div class="calendar__header-year">
					<BaseCalendarButton @click="updateYear(currentYear - 1)" icon="arrow-left"/>
					<button @click="() => activeMode = 'years'" class="calendar__header-button">{{ currentYear }}</button>
					<BaseCalendarButton @click="updateYear(currentYear + 1)" icon="arrow-right"/>
				</div>

			</header>

			<div class="calendar__body">
				<span 
					v-for="header in CALENDAR_HEADERS"
					:key="header"
					class="calendar__body-header"
				>
					{{ header }}
				</span>
				<span
					v-for="{ date, isMuted } in getMonthDates"
					@click="$emit('updateDate', date)"
					:class="['calendar__body-item', { selected: isSelectedDate(date), muted: isMuted }]"
					:key="date.getTime()"
				>
					{{ date.getDate() }}
				</span>
			</div>

		</div>

		<ul :class="['calendar__months', { active: activeMode === 'months' && isActive }]">
			<li 
				v-for="month in 12"
				@click="() => updateMonth(month - 1)"
				:class="['calendar__months-el', { selected: currentMonth === month - 1 }]"
				:key="month"
			>
				{{ formatMonth(month - 1) }}
			</li>
		</ul>

		<div :class="['calendar__years', { active: activeMode === 'years' && isActive }]">
			<BaseCalendarButton @click="yearsModePage--" icon="arrow-left"/>
			<ul class="calendar__years-list">
				<li 
					v-for="year in getYearsModeContent"
					@click="() => updateYear(year)"
					:class="['calendar__years-el', { selected: currentYear === year }]"
					:key="year"
				>
					{{ year }}
				</li>
			</ul>
			<BaseCalendarButton @click="yearsModePage++" icon="arrow-right"/>
		</div>
	</div>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;
	@use "@/assets/styles/mixins.scss" as *;


	.calendar {
		background: $background-secondary;
		box-shadow: 0px 1.66vw 2.5vw 0px $box-shadow;

		padding: 0.5vw;

		pointer-events: none;
		opacity: 0;

		position: absolute;
		right: 0px;
		top: 110%;

		height: 15.1vw;
		width: 13.3vw;
		z-index: 10;

		&.left {
			right: auto;
			left: 0px;
		}

		&.active {
			pointer-events: auto;
			opacity: 1;
		}

		&__main,
		&__months,
		&__years {
			pointer-events: none;
			overflow: hidden;
			opacity: 0;

			height: 0px;

			&.active {
				pointer-events: auto;
				opacity: 1;

				height: 100%;
			}
		}

		&__main {
			align-items: center;
			display: flex;
			flex-direction: column;
			gap: 0.5vw;

			width: 100%;
		}

		&__months {
			width: 100%;
		}

		&__months,
		&__years-list {
			display: flex;
			flex-wrap: wrap;
		}

		&__months-el,
		&__years-el {
			align-items: center;
			display: flex;
			flex: 0 0 33%;
			justify-content: center;

			color: $text-secondary;
			font-size: 0.7vw;
			cursor: pointer;

			&.selected {
				color: $accent-blue;
			}
		}

		&__years {
			align-items: stretch;
			display: flex;
			gap: 0.8vw;
		}

		&__header {
			align-items: center;
			display: flex;
			gap: 0.5vw;

			&-month,
			&-year {
				align-items: center;
				display: flex;
				gap: 0.1vw;
			}

			&-month {
				flex: 1 0 auto;
				justify-content: space-between;
			}

			&-button {
				color: $text-primary;
				font-weight: 500;
				font-size: 0.8vw;

				border-radius: 0.25vw;
				padding: 0.2vw 0px;

				width: 2.85vw;

				&.month {
					width: 5.2vw;
				}
			}
		}

		&__body {
			display: grid;
			gap: 0.25vw;
			grid-template-columns: repeat(7, 1.55vw);

			&-header,
			&-item {
				align-items: center;
				display: flex;
				justify-content: center;
			}

			&-header {
				color: $text-primary;
				font-weight: 500;
				font-size: 0.8vw;
			}

			&-item {
				border-radius: 0.25vw;

				color: $text-secondary;
				font-size: 0.7vw;
				cursor: pointer;

				height: 1.55vw;

				&.muted {
					color: $text-tertiary;
				}

				&.selected {
					background: $accent-blue;
					color: $text-primary;
				}
			}
		}
	}


	@media(hover: hover) {
		.calendar__body-item:not(.selected):hover {
			background: $background-primary;
			color: $text-primary;
		}

		.calendar__header-button:hover {
			background: $background-primary;
		}

		.calendar__months-el:not(.selected):hover,
		.calendar__years-el:not(.selected):hover {
			color: $text-primary;
		}
	}
</style>