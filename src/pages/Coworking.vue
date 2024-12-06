<script setup lang="ts">
	import DoughnutAnalytics from "@/components/DoughnutAnalytics.vue";


	const rating = [
		{
			id: 1,
			coworkingSpace: {
				id: 1,
				name: "TechHub"
			},
			coworkingPlace: {
				id: 1,
				name: "Малая переговорная"
			},
			bookings: 12
		},
		{
			id: 2,
			coworkingSpace: {
				id: 2,
				name: "ИдеяHub"
			},
			coworkingPlace: {
				id: 1,
				name: "Большая переговорная"
			},
			bookings: 10
		},
		{
			id: 4,
			coworkingSpace: {
				id: 2,
				name: "ИдеяHub"
			},
			coworkingPlace: {
				id: 1,
				name: "Рабочий стол №1"
			},
			bookings: 10
		},
		{
			id: 4,
			coworkingSpace: {
				id: 3,
				name: "BeautyLab"
			},
			coworkingPlace: {
				id: 1,
				name: "Общий зал"
			},
			bookings: 8
		},
		{
			id: 5,
			coworkingSpace: {
				id: 2,
				name: "TechHub"
			},
			coworkingPlace: {
				id: 2,
				name: "Игровое место"
			},
			bookings: 10
		}
	];
</script>


<template>
	<main class="main">
		<div class="main__content"></div>
		<aside class="main__aside">
			<div class="main__analytics">
				<h3 class="main__analytics-title">Рейтинг коворкинг-зон по посещениям</h3>
				<DoughnutAnalytics
					:data="[40, 40, 20]"
					:colors="['rgb(65, 241, 182)', 'rgb(255, 187, 85)', 'rgb(255, 119, 130)']"
					:labels="['ИдеяHub', 'TechHub', 'BeautyLab']"
				/>
			</div>
			<div class="main__analytics">
				<h3 class="main__analytics-title">Самые популярные места</h3>
				<ul class="main__analytics-list">
					<li 
						v-for="(item, index) in rating"
						:key="index + 1"
						class="main__analytics-place rating"
					>
						<span class="rating__number">{{ index + 1 }}</span>
						<div class="rating__data">
							<span class="rating__text rating__text--value">{{ item.coworkingPlace.name }}</span>
							<span class="rating__text">{{ item.coworkingSpace.name }}</span>
							<span class="rating__text">
								Всего броней: 
								<b class="rating__text--value">{{ item.bookings }}</b>
							</span>
						</div>
					</li>
				</ul>
			</div>
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
			flex-direction: column;
			flex: 1 1 auto;
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

				height: 1vw;
				width: 1vw;
			}
		}

		&__analytics {
			align-items: center;
			gap: 0.8vw;

			@include layout;

			&:last-child {
				padding: 1vw;
				gap: 0.5vw;
			}

			&-title {
				color: $text-primary;
				font-weight: 700;
				font-size: 0.8vw;
			}

			&-list {
				width: 100%;
			}
		}
	}

	.rating {
		align-items: center;
		display: flex;
		gap: 0.5vw;

		&:not(:first-child) {
			padding-top: 0.5vw;
		}

		&:not(:last-child) {
			border-bottom: 0.05vw solid $box-shadow;
			padding-bottom: 0.5vw;
		}

		&__number {
			color: $accent-blue;
			font-weight: 700;
			font-size: 2.6vw;
			text-align: center;

			width: 2vw;
		}

		&__data {
			display: flex;
			flex: 1 1 auto;
			flex-direction: column;
		}

		&__text {
			color: $text-secondary;
			font-size: 0.7vw;

			&--value {
				color: $text-primary;
				font-weight: 700;
				font-size: 0.8vw;
			}
		}
	}


	@media(hover: hover) {
		.main__button:hover {
			background: $accent-blue;

			& .main__button-icon {
				color: $accent-white;
			}
		}

		.rating:hover .rating__text {
			color: $text-primary;
		}
	}
</style>