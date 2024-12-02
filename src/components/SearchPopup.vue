<script setup lang="ts">
	import { computed, ref, watch } from "vue";

	import type { TypeUsers } from "@/types/TypeUsers";

	import TheBlackout from "@/layouts/TheBlackout.vue";
	import ThePopup from "@/layouts/ThePopup.vue";

	import { getWordEnding } from "@/helpers/words";
	import { debounce } from "@/helpers/debounce";


	const props = defineProps<{
		searchResults: TypeUsers[];
		isVisible: boolean;
		searchText: string;
	}>();

	const emits = defineEmits<{
		(e: "closePopup"): void;
		(e: "search", search: string): void;
	}>();


	const searchModel = ref<string>("");

	
	const generateResultsMessage = computed<string>(() => {
		const length = props.searchResults.length;
		return length ? `Найден${length % 10 !== 1 ? 'о' : ''} ${getWordEnding(length, 'результат', 'результата', 'результатов')}` : "";
	});

	const highlightMatches = (text: string): string => {
		if (!searchModel.value) return text;

		const regex = new RegExp(`(${searchModel.value})`, "gi");
		return text.replace(regex, `<span class="highlight">$1</span>`);
	};

	const clearSearch = (): void => {
		setTimeout(() => (searchModel.value = ""), 300);
		emits("closePopup");
	};


	watch(searchModel, debounce(() => emits("search", searchModel.value)));
</script>


<template>
	<TheBlackout 
		@close-popup="clearSearch"
		:is-visible="isVisible"
	>
		<ThePopup
			@close-popup="clearSearch"
			:is-visible="isVisible"	
			title="Поиск по пользователям"
		>
			<main class="content">
				<div class="content__field">
					<input 
						v-model="searchModel"
						:class="['content__field-input', { active: searchModel }]"
						autocomplete="off"
						id="search"
						type="text"
					>
					<label class="content__field-label" for="search">{{ searchText }}</label>
				</div>
				<section :class="['content__results', { empty: !searchResults || searchResults.length === 0 }]">
					<h3 v-if="!searchResults || searchResults.length === 0" class="content__title">{{ !searchModel ? "Здесь будут показаны результаты" : "Ничего не найдено" }}</h3>
					<template v-else>
						<h3 class="content__title">{{ generateResultsMessage }}</h3>
						<ul class="content__list">
							<li 
								v-for="user in searchResults"
								:key="user.id"
								class="content__list-el"
							>
								<h6 class="content__list-title" v-html="highlightMatches(user.email)"></h6>
								<span class="content__list-text date">На сайте с <b>{{ user.dateOfRegistration }}</b></span>
								<span class="content__list-text firstName">{{ user.firstName }}</span>
								<span class="content__list-text lastName">{{ user.lastName }}</span>
							</li>
						</ul>
					</template>
				</section>
			</main>
		</ThePopup>
	</TheBlackout>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;
	@use "@/assets/styles/mixins.scss" as *;


	.content {
		display: flex;
		flex: 1 0 auto;
		flex-direction: column;
		gap: 1vw;

		&__field {
			position: relative;

			&-label {
				color: $text-secondary;
				font-weight: 400;
				font-size: 0.8vw;

				pointer-events: none;
				padding: 0.1vw;

				position: absolute;
				left: 0.8vw;
				top: 50%;

				transition: all 0.1s ease-in-out;
				transform: translateY(-50%);
			}

			&-input {
				color: $text-primary;
				font-weight: 700;
				font-size: 0.7vw;

				background: $background-secondary;
				border-radius: 0.5vw;

				transition: all 0.1s ease-in-out;
				padding: 0.8vw;
				height: 2.6vw;
				width: 100%;

				&:focus + .content__field-label,
				&.active + .content__field-label {
					color: $text-primary;
					font-size: 0.7vw;
					top: 0px;
				}
			}
		}

		&__results {
			display: flex;
			flex: 1 1 auto;
			flex-direction: column;

			&.empty {
				align-items: center;
				justify-content: center;
			}
		}

		&__title {
			color: $text-primary;
			font-weight: 700;
			font-size: 0.8vw;
		}

		&__list {
			display: flex;
			flex: 1 1 auto;
			flex-direction: column;

			margin-top: 0.25vw;
			padding-bottom: 2.6vw;
			overflow-y: auto;
			height: 0px;

			&::-webkit-scrollbar {
				width: 1vw;

				&-thumb {
					background: $text-primary;
					border-right: 0.05vw solid $background-primary;
					border-left: 0.83vw solid $background-primary;
				}

				&-track-piece:start,
				&-track-piece:end {
					background: $text-secondary;
					border-right: 0.1vw solid $background-primary;
					border-left: 0.88vw solid $background-primary;
				}

				&-track-piece:end {
					margin-bottom: 2.6vw;
				}
			}

			&-el {
				display: grid;
				justify-content: space-between;
				grid-template-columns: 1fr 1fr;
				grid-template-areas: "email firstName"
														 "date lastName";
				row-gap: 1vw;

				cursor: pointer;
				padding: 1.3vw 0px;

				&:not(:last-child) {
					border-bottom: 0.05vw solid $background-secondary;
				}

				&:deep(.highlight) {
					color: $accent-blue;
					text-decoration: underline;
				}
			}

			&-title {
				color: $text-primary;
				font-weight: 700;
				font-size: 0.8vw;
				grid-area: email;
			}

			&-text {
				color: $text-secondary;
				font-size: 0.7vw;
				text-align: right;

				&.date {
					grid-area: date;
					text-align: left;

					& b {
						color: $text-primary;
					}
				}

				&.firstName {
					grid-area: firstName;
				}

				&.lastName {
					grid-area: lastName;
				}
			}
		}
	}


	@media(hover: hover) {
		.content__list-el:hover .content__list-text {
			color: $text-primary;
		}
	}
</style>