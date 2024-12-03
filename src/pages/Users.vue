<script setup lang="ts">
	import { computed } from "vue";

	import DoughnutAnalytics from "@/components/DoughnutAnalytics.vue";
	import SortingPopup from "@/components/SortingPopup.vue";
	import SearchPopup from "@/components/SearchPopup.vue";
	import Pagination from "@/components/Pagination.vue";
	import WeekChart from "@/components/WeekChart.vue";

	import { USERS_COLORS, SORTING_ITEMS } from "@/constants";
	import { chartConfig } from "@/plugins/chartConfig";
	import { getWeekLabels } from "@/helpers/charts";
	import { getWordEnding } from "@/helpers/words";
	import { usePopup } from "@/hooks/usePopup";
	import { useUsers } from "@/store/users";
	import { useTheme } from "@/store/theme";


	const themeStore = useTheme();
	const usersStore = useUsers();

	const { isActivePopup: isSearchVisible, togglePopup: toggleSearchPopup } = usePopup();
	const { isActivePopup: isSortingVisible, togglePopup: toggleSortingPopup } = usePopup();


	const getSummary = computed<string>(() => `${usersStore.page + 1} страница из ${Math.round(usersStore.fillUsers().length / usersStore.PAGINATION_SIZE)} (${getWordEnding(usersStore.fillUsers().length, "пользователь", "пользователя", "пользователей")})`);
</script>


<template>
	<main class="main">
		<div class="main__content">
			<div class="main__table">
				<header class="main__header">
					<span class="main__header-title">ID</span>
					<span class="main__header-title">Имя</span>
					<span class="main__header-title">Фамилия</span>
					<span class="main__header-title">E-mail</span>
					<span class="main__header-title">Кол-во броней</span>	
					<span class="main__header-title">Дата регистрации</span>	
				</header>
				<main class="main__users">
					<div 
						v-for="user in usersStore.fillUsers().slice(usersStore.page * usersStore.PAGINATION_SIZE, (usersStore.page + 1) * usersStore.PAGINATION_SIZE)"
						:key="user.id"
						class="main__users-item user"
					>
						<span class="user__cell">{{ user.id }}</span>
						<span class="user__cell">{{ user.firstName }}</span>
						<span class="user__cell">{{ user.lastName }}</span>
						<span class="user__cell">{{ user.email }}</span>
						<span class="user__cell">{{ user.bookings.length }}</span>
						<span class="user__cell">{{ user.dateOfRegistration }}</span>
					</div>
				</main>
				<footer class="main__footer">
					<Pagination
						v-if="Math.round(usersStore.fillUsers().length / usersStore.PAGINATION_SIZE) > 1"
						@update-page="usersStore.updatePage"
						:current-page="usersStore.page"
						:pages="Math.round(usersStore.fillUsers().length / usersStore.PAGINATION_SIZE)"
					/>
					<span class="main__summary">{{ getSummary }}</span>
				</footer>
			</div>
		</div>
		<aside class="main__aside">
			<div class="main__row">
				<button @click="() => isSortingVisible = !isSortingVisible" class="main__button" title="Сортировать пользователей">
					<svg class="main__button-icon" height="20" width="20">
						<use xlink:href="@/assets/icons/actions.svg#sort"/>
					</svg>
				</button>
				<button @click="() => isSearchVisible = !isSearchVisible" class="main__button" title="Найти пользователя">
					<svg class="main__button-icon" height="20" width="20">
						<use xlink:href="@/assets/icons/actions.svg#search"/>
					</svg>
				</button>
			</div>
			<div class="main__analytics">
				<h3 class="main__analytics-title">Общая статистика по пользователям</h3>
				<DoughnutAnalytics
					:data="[55, 45]"
					:colors="['rgb(115, 128, 236)', 'rgb(255, 119, 130)']"
					:labels="['Моб. устройства', 'Деск. устройства']"
				/>
				<DoughnutAnalytics
					:data="[40, 40, 20]"
					:colors="['rgb(65, 241, 182)', 'rgb(255, 187, 85)', 'rgb(255, 119, 130)']"
					:labels="['18-30 лет', '30-60 лет', '60+ лет']"
				/>
			</div>
			<WeekChart
				title="Новые пользователи"
				:config="chartConfig(usersStore.WEEK_USERS, getWeekLabels(), USERS_COLORS, themeStore.theme)"
			/>
		</aside>
	</main>

	<SearchPopup
		@close-popup="toggleSearchPopup"
		@search="usersStore.searchUsers"
		:search-results="usersStore.searchResults"
		:is-visible="isSearchVisible"
		title="Поиск по пользователям"
		search-text="Введите email или ID пользователя"
	/>

	<SortingPopup
		@close-popup="toggleSortingPopup"
		@set-sorting="usersStore.setSorting"
		:active-sorting="usersStore.sorting"
		:sorting-items="SORTING_ITEMS"
		:is-visible="isSortingVisible"
	/>
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

		&__users {
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

			flex-direction: row;
			flex-wrap: wrap;
			gap: 1vw;
			justify-content: center;

			&-title {
				color: $text-primary;
				font-weight: 700;
				font-size: 0.8vw;
			}
		}
	}

	.user {
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


	@media(hover: hover) {
		.user:hover .user__cell {
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