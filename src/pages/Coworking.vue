<script setup lang="ts">

	import DoughnutAnalytics from "@/components/DoughnutAnalytics.vue";
	import ImagesSlider from "@/components/ImagesSlider.vue";

	import { useCoworking } from "@/store/coworking";


	const coworkingStore = useCoworking();
</script>


<template>
	<main class="main">
		<div class="main__content">
			<div
				v-for="space in coworkingStore.spaceExpanded"
				:key="space.id" 
				:class="['main__coworking coworking', { active: space.active }]"
			>
				<header class="coworking__header">
					<h2 class="coworking__title">
						{{ space.title }}
						<span :class="['coworking__title-status', { active: space.active }]">{{ space.active ? "Активно" : "Неактивно" }}</span>
					</h2>
					<div class="coworking__buttons">
						<button 
							@click="coworkingStore.updateStatus(space.id)" 
							:title="`Переключить статус на '${space.active ? 'Неактивный' : 'Активный'}'`"
							class="coworking__switcher" 
						>
							<span :class="['coworking__switcher-circle', { active: space.active }]"></span>
						</button>
						<button class="coworking__button" :title="`Редактировать ${space.title}`">
							<svg class="coworking__button-icon" height="20" width="20">
								<use xlink:href="@/assets/icons/actions.svg#edit"/>
							</svg>
						</button>
					</div>
				</header>
				<div class="coworking__row">
					<div class="coworking__col">
						<p class="coworking__text">{{ space.description }}</p>
						<h3 class="coworking__subtitle">Преимущества:</h3>
						<ul class="coworking__list">
							<li
								v-for="convenience in space.conveniences" 
								class="coworking__list-el"
								:key="convenience"
							>
								{{ convenience }}
							</li>
						</ul>
					</div>
					<div class="coworking__slider">
						<ImagesSlider
							:images="space.images"
							alt-text="Изображение коворкинг-зоны"
							:height="13.2"
							:width="22"
						/>
					</div>
				</div>
				<div class="coworking__row">
					<div class="coworking__scheme">
						<img
							alt="Планировка коворкинг-зоны"
							:src="space.scheme"
						/>
					</div>
					<div class="coworking__places">
						<h3 class="coworking__subtitle">Доступные для брони места:</h3>
						<ul class="coworking__places-list">
							<li
								v-for="place in space.places"
								:key="place.id"
								class="coworking__places-el"
							>
								{{ place.title }}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<aside class="main__aside">
			<button class="main__button" title="Добавить коворкинг-зону">
				<svg class="main__button-icon" height="20" width="20">
					<use xlink:href="@/assets/icons/actions.svg#add"/>
				</svg>
			</button>
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
						v-for="(item, index) in coworkingStore.rating"
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
			gap: inherit;
		}

		&__aside {
			display: flex;
			flex: 0 0 18vw;
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

			flex: 0 0 auto;
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
				text-align: center;
			}

			&-list {
				width: 100%;
			}
		}
	}

	.coworking {
		@include layout;
		gap: 1.25vw;

		opacity: 0.7;

		&.active {
			opacity: 1;
		}

		&__header {
			align-items: center;
			display: flex;
			justify-content: space-between;
		}

		&__row {
			align-items: flex-start;
			display: flex;
			justify-content: space-between;
			gap: 2.6vw;
		}

		&__col {
			display: flex;
			flex-direction: column;
			gap: 0.8vw;
		}

		&__slider {
			flex: 0 0 15.6vw;
			height: 15.6vw;
		}

		&__title {
			align-items: flex-end;
			display: flex;
			gap: 0.8vw;

			color: $text-primary;
			font-weight: 700;
			font-size: 1vw;

			&-status {
				color: $accent-red;
				font-weight: 700;
				font-size: 0.7vw;
	
				margin-bottom: 0.1vw;
	
				&.active {
					color: $accent-green;
				}
			}
		}

		&__subtitle {
			color: $text-primary;
			font-weight: 700;
			font-size: 0.8vw;
		}

		&__text {
			color: $text-primary;
			font-size: 0.75vw;
		}

		&__list {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			column-gap: 2.6vw;
			row-gap: 0.8vw;

			width: 28vw;

			&-el {
				align-items: center;
				display: flex;
				gap: 0.5vw;
	
				color: $text-primary;
				font-size: 0.75vw;
	
				&::before {
					background: $accent-blue;
					border-radius: 100%;
	
					content: "";
	
					height: 0.25vw;
					width: 0.25vw;
				}
			}
		}

		&__buttons {
			align-items: center;
			display: flex;
			gap: 1.25vw;
		}

		&__button {
			background: transparent;
			border: 1px dashed $accent-blue;
			border-radius: 0.5vw;

			height: 2vw;
			width: 2vw;

			&-icon {
				color: $accent-blue;
	
				height: 1vw;
				width: 1vw;
			}
		}

		&__switcher {
			background: $box-shadow;
			border-radius: 1vw;

			position: relative;

			height: 1.5vw;
			width: 3vw;

			&-circle {
				background: $accent-red;
				border-radius: 100%;
	
				aspect-ratio: 1/1;
	
				position: absolute;
				left: 0.1vw;
				top: 0.1vw;
	
				height: calc(100% - 0.2vw);
	
				&.active {
					background: $accent-green;
					right: 0.1vw;
					left: auto;
				}
			}
		}

		&__scheme {
			border-radius: 0.5vw;

			flex: 0 0 40%;
			
			pointer-events: none;
			overflow: hidden;
			
			height: auto;
		}

		&__places {
			display: flex;
			flex: 1 1 auto;
			flex-direction: column;
			gap: 1vw;

			&-list {
				display: flex;
				flex-direction: column;
				gap: 0.5vw;
			}

			&-el {
				color: $text-primary;
				font-size: 0.8vw;

				list-style: decimal;
				list-style-position: inside;
			}
		}
	}

	.rating {
		align-items: center;
		display: flex;
		gap: 1.25vw;

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
		.coworking__button:hover {
			background: $accent-blue;

			& .coworking__button-icon {
				color: $accent-white;
			}
		}

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