<script setup lang="ts">
	import { computed } from "vue";

	import DoughnutAnalytics from "@/components/DoughnutAnalytics.vue";
	import BaseDropdownList from "@/components/BaseDropdownList.vue";
	import SortingPopup from "@/components/SortingPopup.vue";
	import SearchPopup from "@/components/SearchPopup.vue";
	import Pagination from "@/components/Pagination.vue";
	import TheBlackout from "@/layouts/TheBlackout.vue";
	import WeekChart from "@/components/WeekChart.vue";
	import ThePopup from "@/layouts/ThePopup.vue";

	import { BOOKING_COLORS, BOOKING_SORTING_ITEMS } from "@/constants";
	import { chartConfig } from "@/plugins/chartConfig";
	import { getWeekLabels } from "@/helpers/charts";
	import { getWordEnding } from "@/helpers/words";
	import { useBookings } from "@/store/bookings";
	import { usePopup } from "@/hooks/usePopup";
	import { useTheme } from "@/store/theme";


	const themeStore = useTheme();
	const bookingsStore = useBookings();

	const { isActivePopup: isSearchVisible, togglePopup: toggleSearchPopup } = usePopup();
	const { isActivePopup: isSortingVisible, togglePopup: toggleSortingPopup } = usePopup();
	const { isActivePopup: isFiltersVisible, togglePopup: toggleFiltersPopup } = usePopup();


	const getSummary = computed<string>(() => `${bookingsStore.page + 1} страница из ${Math.round(bookingsStore.fillBookings().length / bookingsStore.PAGINATION_SIZE)} (${getWordEnding(bookingsStore.fillBookings().length, "бронь", "брони", "броней")})`);

	const filters = [
		{
			id: 1,
			name: "ИдеяHub",
			places: [
				{
					id: 1,
					name: "Малая переговорная"
				},
				{
					id: 2,
					name: "Большая переговорная"
				}
			]
		},
		{
			id: 2,
			name: "TechHub",
			places: [
				{
					id: 1,
					name: "Стол 1"
				},
				{
					id: 2,
					name: "Стол 2"
				}
			]
		},
		{
			id: 3,
			name: "BeautyLab",
			places: [
				{
					id: 1,
					name: "Общий зал"
				}
			]
		}
	];
</script>


<template>
	<main class="main">
		<div class="main__content">
			<div class="main__table">
				<header class="main__header">
					<span class="main__header-title">ID</span>
					<span class="main__header-title">Пользователь</span>
					<span class="main__header-title">Коворкинг</span>
					<span class="main__header-title">Комната</span>
					<span class="main__header-title">Дата создания</span>	
					<span class="main__header-title">Дата брони</span>	
				</header>
				<main class="main__bookings">
					<div 
						v-for="booking in bookingsStore.fillBookings().slice(bookingsStore.page * bookingsStore.PAGINATION_SIZE, (bookingsStore.page + 1) * bookingsStore.PAGINATION_SIZE)"
						:key="booking.id"
						class="main__bookings-item booking"
					>
						<span class="booking__cell">{{ booking.id }}</span>
						<span class="booking__cell">{{ booking.email }}</span>
						<span class="booking__cell">{{ booking.coworkingSpace }}</span>
						<span class="booking__cell">{{ booking.coworkingPlace }}</span>
						<span class="booking__cell">{{ booking.dateOfCreating }}</span>
						<span class="booking__cell">{{ booking.dateOfBooking }}</span>
					</div>
				</main>
				<footer class="main__footer">
					<Pagination
						v-if="Math.round(bookingsStore.fillBookings().length / bookingsStore.PAGINATION_SIZE) > 1"
						@update-page="bookingsStore.updatePage"
						:current-page="bookingsStore.page"
						:pages="Math.round(bookingsStore.fillBookings().length / bookingsStore.PAGINATION_SIZE)"
					/>
					<span class="main__summary">{{ getSummary }}</span>
				</footer>
			</div>
		</div>
		<aside class="main__aside">
			<div class="main__row">
				<button @click="() => isSortingVisible = !isSortingVisible" class="main__button" title="Сортировать брони">
					<svg class="main__button-icon" height="20" width="20">
						<use xlink:href="@/assets/icons/actions.svg#sort"/>
					</svg>
				</button>
				<button @click="() => isFiltersVisible = !isFiltersVisible" class="main__button" title="Применить фильтры">
					<svg class="main__button-icon" height="20" width="20">
						<use xlink:href="@/assets/icons/actions.svg#filter"/>
					</svg>
				</button>
				<button @click="() => isSearchVisible = !isSearchVisible" class="main__button" title="Найти бронь">
					<svg class="main__button-icon" height="20" width="20">
						<use xlink:href="@/assets/icons/actions.svg#search"/>
					</svg>
				</button>
			</div>
			<div class="main__analytics">
				<h3 class="main__analytics-title">Общая статистика по броням</h3>
				<DoughnutAnalytics
					is-bigger
					:data="[40, 40, 20]"
					:colors="['rgb(65, 241, 182)', 'rgb(255, 187, 85)', 'rgb(255, 119, 130)']"
					:labels="['ИдеяHub', 'TechHub', 'BeautyLab']"
				/>
			</div>
			<WeekChart
				title="Новые брони"
				:config="chartConfig(bookingsStore.WEEK_BOOKINGS, getWeekLabels(), BOOKING_COLORS, themeStore.theme)"
			/>
		</aside>
	</main>

	<SearchPopup
		@close-popup="toggleSearchPopup"
		@search="bookingsStore.searchBookings"
		:search-results="bookingsStore.searchResults"
		:is-visible="isSearchVisible"
		title="Поиск по броням"
		search-text="Введите ID брони"
	/>

	<SortingPopup
		@close-popup="toggleSortingPopup"
		@set-sorting="bookingsStore.setSorting"
		:active-sorting="bookingsStore.sorting"
		:sorting-items="BOOKING_SORTING_ITEMS"
		:is-visible="isSortingVisible"
	/>

	<TheBlackout
		@close-popup="toggleFiltersPopup"
		:is-visible="isFiltersVisible"
	>
		<ThePopup
			@close-popup="toggleFiltersPopup"
			:is-visible="isFiltersVisible"	
			title="Фильтры по броням"
		>
			<div class="filters">
				<BaseDropdownList
					v-for="filter in filters"
					@change-element="bookingsStore.updateFilters"
					:is-active-element="bookingsStore.isActiveFilter"
					:elements="filter.places"
					:name="filter.name"
					:key="filter.id"
					:id="filter.id"
				/>
			</div>
		</ThePopup>
	</TheBlackout>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;
	@use "@/assets/styles/mixins.scss" as *;


	.main {
		display: flex;
		gap: 2.1vw;

		&__content {
			display: flex;
			flex-direction: column;
			flex: 1 1 auto;
		}

		&__table {
			@include layout;

			display: flex;
			flex: 1 1 auto;
			flex-direction: column;
		}

		&__header {
			display: flex;
			gap: 2.6vw;

			&-title {
				color: $text-primary;
				font-weight: 500;
				font-size: 0.83vw;

				&:nth-child(1) {
					flex: 1 1 2.6vw;
				}

				&:nth-child(5) {
					flex: 1 1 4vw;
					white-space: nowrap;
				}

				&:nth-child(2),
				&:nth-child(3),
				&:nth-child(4),
				&:nth-child(6) {
					flex: 1 1 7vw;
				}

				&:nth-child(6) {
					text-align: right;
				}
			}
		}

		&__bookings {
			display: flex;
			flex: 1 1 auto;
			flex-direction: column;

			margin-bottom: 2.1vw;
		}

		&__footer {
			align-items: center;
			display: flex;
			justify-content: space-between;
		}

		&__summary {
			color: $text-secondary;
			font-size: 0.7vw;
		}

		&__aside {
			display: flex;
			flex: 0 1 20.8vw;
			flex-direction: column;
			gap: inherit;
		}

		&__row {
			display: flex;
			justify-content: center;
			gap: 1.5vw;
		}

		&__button {
			border: 0.05vw dashed $accent-blue;
			border-radius: 0.5vw;

			flex: 1 1 48%;

			padding: 0.5vw 1.05vw;

			&-icon {
				color: $accent-blue;
			}
		}

		&__analytics {
			align-items: center;
			gap: 1vw;

			@include layout;

			&-title {
				color: $text-primary;
				font-weight: 700;
				font-size: 0.8vw;
			}
		}
	}

	.booking {
		display: flex;
		gap: 2.6vw;

		padding: 1vw 0px 0px;

		&:not(:last-child) {
			border-bottom: 0.05vw solid $box-shadow;
			padding-bottom: 1vw;
		}

		&__cell {
			color: $text-secondary;
			font-size: 0.7vw;

			&:nth-child(1) {
				flex: 1 1 2.6vw;
			}

			&:nth-child(5) {
				flex: 1 1 4vw;
			}

			&:nth-child(2),
			&:nth-child(3),
			&:nth-child(4),
			&:nth-child(6) {
				flex: 1 1 7vw;
			}

			&:nth-child(6) {
				text-align: right;
			}
		}
	}

	.filters {
		display: flex;
		flex: 1 0 auto;
		flex-direction: column;
		gap: 2.1vw;
	}


	@media(hover: hover) {
		.booking:hover .booking__cell {
			color: $text-primary;
			font-weight: 500;
		}

		.main__button:hover {
			background: $accent-blue;

			& .main__button-icon {
				color: $accent-white;
			}
		}
	}
</style>