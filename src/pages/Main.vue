<script setup lang="ts">
	import { RouterLink } from "vue-router";

	import AnalyticsWidget from "@/components/AnalyticsWidget.vue";
	import ProgressWidget from "@/components/ProgressWidget.vue";
	import WeekChart from "@/components/WeekChart.vue";

	import { BOOKING_COLORS, USERS_COLORS } from "@/constants";
	import { chartConfig } from "@/plugins/chartConfig";
	import { getWeekLabels } from "@/helpers/charts";
	import { useTheme } from "@/store/theme";


	const themeStore = useTheme();


	const WEEK_BOOKINGS: number[] = [36, 75, 17, 91, 103, 47, 114];

	const WEEK_USERS: number[] = [8, 10, 10, 34, 20, 53, 15];

	const places = [
		{
			id: 1,
			title: "ИдеяHub",
			percentage: 61,
			value: 180
		},
		{
			id: 2,
			title: "TechHub",
			percentage: 84,
			value: 100
		},
		{
			id: 3,
			title: "BeautyLab",
			percentage: 33,
			value: 20
		}
	];

	const recentBookings = [
		{
			id: 1,
			bookingId: 1,
			userId: 5,
			dateOfCreating: "20.07.2024",
			dateOfBooking: "21.07.2024"
		},
		{
			id: 2,
			bookingId: 2,
			userId: 5,
			dateOfCreating: "20.07.2024",
			dateOfBooking: "21.07.2024"
		},
		{
			id: 3,
			bookingId: 3,
			userId: 5,
			dateOfCreating: "20.07.2024",
			dateOfBooking: "21.07.2024"
		},
		{
			id: 4,
			bookingId: 4,
			userId: 5,
			dateOfCreating: "20.07.2024",
			dateOfBooking: "21.07.2024"
		},
		{
			id: 5,
			bookingId: 5,
			userId: 5,
			dateOfCreating: "20.07.2024",
			dateOfBooking: "21.07.2024"
		},
		{
			id: 6,
			bookingId: 6,
			userId: 5,
			dateOfCreating: "20.07.2024",
			dateOfBooking: "21.07.2024"
		},
		{
			id: 7,
			bookingId: 7,
			userId: 5,
			dateOfCreating: "20.07.2024",
			dateOfBooking: "21.07.2024"
		},
	];

	const analytics = [
		{
			id: 1,
			title: "Пользователи",
			previousValue: 25,
			value: 35
		},
		{
			id: 2,
			title: "Брони",
			previousValue: 43,
			value: 67
		}
	];
</script>


<template>
	<main class="main">
		<div class="main__content">
			<div class="main__row">
				<div
					v-for="place in places"
					:key="place.id"
					class="main__widget"
				>
					<ProgressWidget :="place"/>
				</div>
			</div>
			<section class="main__bookings">
				<h2 class="main__title">Недавние заказы</h2>
				<div class="main__table">
					<header class="main__table-header">
						<span class="main__table-title">ID брони</span>	
						<span class="main__table-title">ID пользователя</span>
						<span class="main__table-title">Дата создания</span>
						<span class="main__table-title">Дата бронирования</span>
					</header>
					<main class="main__table-content">
						<div
							v-for="booking in recentBookings"
							:key="booking.id" 
							class="main__table-row"
						>
							<span class="main__table-text">{{ booking.bookingId }}</span>
							<span class="main__table-text">{{ booking.userId }}</span>
							<span class="main__table-text">{{ booking.dateOfCreating }}</span>
							<span class="main__table-text">{{ booking.dateOfBooking }}</span>
						</div>
					</main>
				</div>
				<routerLink class="main__link" to="/bookings" title="Перейти к броням">Показать все</routerLink>
			</section>
		</div>
		<aside class="main__aside">
			<div v-if="analytics.length > 0" class="main__analytics">
				<h2 class="main__title">Общая аналитика</h2>
				<AnalyticsWidget
					v-for="item in analytics"
					:key="item.id"
					:="item"
				/>
			</div>
			<WeekChart
				title="Новые брони"
				:config="chartConfig(WEEK_BOOKINGS, getWeekLabels(), BOOKING_COLORS, themeStore.theme)"
			/>
			<WeekChart
				title="Новые пользователи"
				:config="chartConfig(WEEK_USERS, getWeekLabels(), USERS_COLORS, themeStore.theme)"
			/>
			<RouterLink class="main__button" to="/space" title="Перейти к зонам коворкинга">В коворкинг</RouterLink>
		</aside>
	</main>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;
	@use "@/assets/styles/mixins.scss" as *;


	.main {
		display: flex;
		gap: 2.1vw;

		&__content {
			display: flex;
			flex: 1 1 auto;
			flex-direction: column;
			gap: inherit;
		}

		&__row {
			display: flex;
			gap: inherit;
		}

		&__widget {
			flex: 1 0 30%;
		}

		&__title {
			color: $text-primary;
			font-weight: 700;
			font-size: 1vw;
		}

		&__table {
			@include layout;

			width: 100%;

			&-header {
				display: flex;
				gap: 2.6vw;
			}

			&-title {
				color: $text-primary;
				font-weight: 700;
				font-size: 0.8vw;

				flex: 1 1 10vw;

				&:nth-child(3),
				&:nth-child(4) {
					flex: 1 1 20vw;
				}
			}

			&-content {
				display: flex;
				flex-direction: column;
			}

			&-row {
				align-items: center;
				display: flex;
				gap: 2.6vw;

				padding: 1vw 0px 0px;
				width: 100%;

				&:not(:last-child) {
					border-bottom: 0.05vw solid $box-shadow;
					padding-bottom: 1vw;
				}
			}

			&-text {
				color: $text-secondary;
				font-size: 0.7vw;

				flex: 1 1 10vw;

				&:nth-child(3),
				&:nth-child(4) {
					flex: 1 1 20vw;
				}
			}
		}

		&__bookings {
			display: flex;
			flex-direction: column;
			gap: 1vw;
		}

		&__link {
			align-self: center;

			color: $accent-blue;
			font-size: 0.8vw;
		}

		&__aside {
			display: flex;
			flex: 0 0 20.8vw;
			flex-direction: column;
			gap: inherit;
		}

		&__analytics {
			display: flex;
			flex-direction: column;
			gap: 1vw;
		}

		&__button {
			border: 0.05vw dashed $accent-blue;
			background: transparent;
			border-radius: 0.7vw;

			align-items: center;
			display: flex;
			justify-content: center;

			color: $accent-blue;
			font-size: 0.8vw;

			height: 100%;
			width: 100%;
		}
	}


	@media(hover: hover) {
		.main__table-row:hover .main__table-text {
			color: $text-primary;
			font-weight: 500;
		}

		.main__link:hover {
			text-decoration: underline;
		}

		.main__button:hover {
			background: $accent-blue;
			color: $accent-white;
		}
	}
</style>