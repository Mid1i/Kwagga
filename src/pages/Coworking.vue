<script setup lang="ts">
	import { onUnmounted } from "vue";

	import DoughnutAnalytics from "@/components/DoughnutAnalytics.vue";
	import ImagesSlider from "@/components/ImagesSlider.vue";
	import BaseTextarea from "@/components/BaseTextarea.vue";
	import BaseInput from "@/components/BaseInput.vue";

	import { useCoworking } from "@/store/coworking";


	const coworkingStore = useCoworking();


	onUnmounted(coworkingStore.setEditableSpace);
</script>


<template>
	<main class="main">
		<div class="main__content">
			<!-- Если включён режим редактирования/добавления -->
			<div
				v-if="coworkingStore.isEditable"
				class="main__space space"
			>
				<header class="space__header">
					<h3 class="space__title">{{ coworkingStore.editableSpace.id ? `Редактирование коворкинг-зоны '${coworkingStore.editableSpace.title}'` : `Добавление коворкинг-зоны` }}</h3>
					<div class="space__buttons">
						<button 
							@click="coworkingStore.cancel"
							title="Отменить изменения"
							class="space__cancel" 
						>
							Отменить
						</button>
						<button 
							v-if="!!coworkingStore.editableSpace.id"
							@click="coworkingStore.saveSpace"
							title="Сохранить изменения"
							class="space__button" 
						>
							Сохранить
						</button>
						<button 
							v-else
							@click="coworkingStore.addSpace"
							title="Добавить коворкинг-зону"
							class="space__button" 
						>
							Добавить
						</button>
					</div>
				</header>
				<BaseInput
					v-model="coworkingStore.editableSpace.title"
					text="Название коворкинг-зоны"
					name="title"
					type="text"
					is-transparent
				/>
				<BaseTextarea
					v-model="coworkingStore.editableSpace.description"
					text="Описание коворкинг-зоны"
					name="description"
					is-transparent
				/>
				<BaseInput
					@apply-suggestion="coworkingStore.setAddress"
					v-model="coworkingStore.editableSpace.address"
					:suggestions="coworkingStore.suggestions"
					text="Адрес коворкинг-зоны"
					name="address"
					type="text"
					is-transparent
				/>
				<div class="space__row">
					<div class="space__conveniences">
						<h3 class="space__subtitle">
							Преимущества:
							<button 
								@click="coworkingStore.addConvenience('')"
								class="space__subtitle-add" 
								title="Добавить"
							>
								<svg class="space__subtitle-icon" height="15" width="15">
									<use xlink:href="@/assets/icons/actions.svg#add"/>
								</svg>
							</button>
						</h3>
						<ul 
							v-for="(convenience, index) in coworkingStore.editableSpace.conveniences"
							:key="index"
							class="space__list"
						>
							<li class="space__list-el">
								<BaseInput
									v-model="coworkingStore.editableSpace.conveniences[index]"
									:name="convenience"
									is-transparent
									type="text"
									text=""
								/>
								<button 
									@click="coworkingStore.deleteConvenience(index)"	
									class="space__list-button" 
									title="Удалить"
								>
									<svg class="space__list-icon" height="15" width="15">
										<use xlink:href="@/assets/icons/cross.svg#cross"/>
									</svg>
								</button>
							</li>
						</ul>
					</div>
					<div class="space__images">
						<h3 class="space__subtitle">
							{{ `Всего изображений: ${coworkingStore.editableSpace.images.length}` }}
							<label 
								class="space__subtitle-add" 
								title="Добавить"
								for="photo"
							>
								<input
									@input="coworkingStore.handleFileInput($event, 'images')"
									accept="image/png, image/jpg, image/jpeg, image/svg"
									class="space__input"
									type="file"
									id="photo"
								/>
								<svg class="space__subtitle-icon" height="15" width="15">
									<use xlink:href="@/assets/icons/actions.svg#add"/>
								</svg>
							</label>
						</h3>
						<ImagesSlider
							v-if="coworkingStore.editableSpace.images.length > 0"
							@delete-image="coworkingStore.deleteImage"
							:images="coworkingStore.editableSpace.images"
							altText="Изображения коворикнг-зоны"
							:height="18"
							:width="30"
							is-editable
						/>
					</div>
				</div>
				<div class="space__row">
					<div :class="['space__places', { big: coworkingStore.editableSpace.places.length > 0 }]">
						<h3 class="space__subtitle">
							Доступные для брони места:
							<button 
								@click="coworkingStore.addPlace"
								class="space__subtitle-add"
								title="Добавить"
							>
								<svg class="space__subtitle-icon" height="15" width="15">
									<use xlink:href="@/assets/icons/actions.svg#add"/>
								</svg>
							</button>
						</h3>
						<ul 
							v-for="(place, index) in coworkingStore.editableSpace.places"
							:key="`place-${index}`"
							class="space__list"
						>
							<li class="space__list-el">
								<BaseInput
									v-model="place.title"
									:name="`title-${index}`"
									text="Название"
									is-transparent
									type="text"
								/>
								<BaseInput
									v-model="place.capacity"
									:name="`capacity-${index}`"
									is-transparent
									type="text"
									class="space__list-input"
									text="Вместительность"
								/>
								<button 
									@click="coworkingStore.deletePlace(index)"	
									class="space__list-button" 
									title="Удалить"
								>
									<svg class="space__list-icon" height="15" width="15">
										<use xlink:href="@/assets/icons/cross.svg#cross"/>
									</svg>
								</button>
							</li>
						</ul>
					</div>
					<div class="space__scheme">
						<div
							v-if="!!coworkingStore.editableSpace.design" 
							class="space__wrapper"
						>
							<label 
								class="space__wrapper-add" 
								title="Выбрать другую схему"
								for="scheme"
							>
								<input
									@input="coworkingStore.handleFileInput($event, 'design')"
									accept="image/png, image/jpg, image/jpeg, image/svg"
									class="space__wrapper-input"
									type="file"
									id="scheme"
								/>
								<svg class="space__wrapper-icon" height="15" width="15">
									<use xlink:href="@/assets/icons/actions.svg#edit"/>
								</svg>
								Редактировать
							</label>
							<img
								alt="План-схема коворкинг-зоны"
								class="space__wrapper-image"
								:src="coworkingStore.editableSpace.design"
							/>
						</div>
						<label
							v-else 
							class="space__file"
							for="scheme"
						>	
							<input
								@input="coworkingStore.handleFileInput($event, 'design')"
								accept="image/png, image/jpg, image/jpeg, image/svg"
								class="space__input"
								id="scheme"
								type="file"
							/>
							<svg class="space__file-icon" height="40" width="40">
								<use xlink:href="@/assets/icons/actions.svg#download"/>
							</svg>
							<h3 class="space__file-title">Загрузка схемы помещения</h3>
							<span class="space__file-text">Перетащите файл в эту область</span>
						</label>
					</div>
				</div>
			</div>
			<!-- Просмотр всех коворкинг-зон -->
			<div
				v-else
				v-for="space in coworkingStore.space"
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
						<button 
							@click="coworkingStore.setEditableSpace(space)"
							:title="`Редактировать ${space.title}`"
							class="coworking__button" 
						>
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
						<h3 class="coworking__subtitle">Адрес коворкинг-зоны:</h3>
						<span class="coworking__text">{{ space.address }}</span>
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
							:src="space.design"
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
								{{ `${place.title} (${place.capacity} чел.)` }}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<aside class="main__aside">
			<button 
				v-if="!coworkingStore.isEditable"
				@click="coworkingStore.resetEditableState" 
				class="main__button" 
				title="Добавить коворкинг-зону"
			>
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
							<span class="rating__text rating__text--value">{{ item.coworkingPlace.title }}</span>
							<span class="rating__text">{{ item.coworkingSpace.title }}</span>
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
		align-items: stretch;
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
			flex: 0 0 20vw;
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
			color: $text-secondary;
			line-height: 1.2vw;
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
	
				color: $text-secondary;
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
			border-radius: 100%;

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
					transform: translateX(calc(100% + 0.2vw));
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
				gap: 0.8vw;
			}

			&-el {
				color: $text-secondary;
				font-size: 0.8vw;

				list-style: decimal;
				list-style-position: inside;
			}
		}
	}

	.space {
		@include layout;
		gap: 1.25vw;

		&__header {
			align-items: center;
			display: flex;
			justify-content: space-between;

			margin-bottom: 1vw;
		}

		&__title {
			color: $text-primary;
			font-weight: 700;
			font-size: 1vw;
		}

		&__buttons {
			display: flex;
			gap: 1.25vw;
		}

		&__button {
			border: 0.05vw dashed $accent-blue;
			border-radius: 0.5vw;

			color: $accent-blue;
			font-weight: 500;
			font-size: 0.8vw;

			padding: 0.4vw 1.3vw;
		}

		&__cancel {
			color: $accent-red;
			font-weight: 500;
			font-size: 0.8vw;
		}

		&__row {
			align-items: flex-start;
			display: flex;
			justify-content: space-between;
			gap: 2.6vw;

			&:not(:last-child) {
				margin-bottom: 1vw;
			}
		}

		&__subtitle {
			align-items: center;
			display: flex;
			justify-content: space-between;

			color: $text-primary;
			font-weight: 700;
			font-size: 0.8vw;

			&-add {
				background: $accent-black;
				border-radius: 100%;

				align-items: center;
				display: flex;
				justify-content: center;

				position: relative;
				cursor: pointer;

				height: 1.55vw;
				width: 1.55vw;
			}

			&-icon {
				color: $accent-white;
				height: 0.8vw;
				width: 0.8vw;
			}
		}

		&__conveniences,
		&__places {
			display: flex;
			flex: 0 0 18vw;
			flex-direction: column;
			gap: 0.8vw;
		}

		&__places {
			flex: 0 1 18vw;

			&.big {
				flex: 1 1 18vw;
			}
		}

		&__list {
			display: flex;
			flex-direction: column;
			gap: inherit;

			&-el {
				align-items: center;
				display: flex;
				gap: 1vw;
			}

			&-button {
				align-items: center;
				display: flex;
				flex: 0 0 auto;
				justify-content: center;

				height: 1.55vw;
				width: 1.55vw;
			}

			&-icon {
				color: $text-primary;
				height: 0.8vw;
				width: 0.8vw;
			}

			&-input {
				flex: 0 0 8vw;
			}
		}

		&__images {
			display: flex;
			flex: 0 0 30vw;
			flex-direction: column;
			gap: 0.8vw;
		}

		&__input {
			display: none;
		}

		&__scheme {
			flex: 0 0 30vw;
		}

		&__wrapper {
			border-radius: 0.8vw;

			position: relative;
			overflow: hidden;

			height: auto;
			width: 100%;

			&-image {
				pointer-events: none;

				height: 100%;
				width: 100%;
			}

			&-add {
				background: $accent-black;
				border-radius: 0.5vw;

				align-items: center;
				display: flex;
				justify-content: center;
				gap: 0.5vw;

				cursor: pointer;
				color: $accent-white;
				font-weight: 500;
				font-size: 0.8vw;

				padding: 0.5vw 1vw;

				position: absolute;
				right: 0.8vw;
				top: 0.8vw;
			}

			&-icon {
				color: $accent-white;

				height: 0.8vw;
				width: 0.8vw;
			}

			&-input {
				display: none;
			}
		}

		&__file {
			border: 0.05vw solid $box-shadow;
			border-radius: 0.8vw;

			align-items: center;
			display: flex;
			flex-direction: column;
			justify-content: center;

			height: 10vw;
			width: 100%;

			&:focus {
				border-color: $accent-blue;
			}

			&-icon {
				color: $text-primary;

				margin-bottom: 1vw;

				height: 2vw;
				width: 2vw;
			}

			&-title {
				color: $text-primary;
				font-weight: 700;
				font-size: 0.8vw;

				margin-bottom: 0.25vw;
			}

			&-text {
				color: $text-primary;
				font-size: 0.7vw;
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

		.space__subtitle-add:hover {
			background: $accent-blue;
		}

		.space__list-icon:hover {
			color: $accent-blue;
		}

		.space__button:hover {
			background: $accent-blue;
			color: $accent-white;
		}

		.space__cancel:hover {
			text-decoration: underline;
		}

		.space__wrapper-add:hover {
			background: $accent-blue;
		}

		.space__file:hover {
			border-color: $accent-blue;
		}
	}
</style>