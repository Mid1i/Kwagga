<script setup lang="ts">
	import { computed } from "vue";


	const props = defineProps<{
		currentPage: number,
		pages: number
	}>();

	defineEmits<{
		updatePage: [newPage: number];
	}>();

	
	const getPages = computed<number[]>(() => {
		const totalPages = props.pages ?? 0;
		
		if (totalPages < 4) return Array.from({ length: totalPages }, (_, index) => index + 1);
		
		if (props.currentPage < 3) return [1, 2, 3, 4];

		if (props.currentPage > totalPages - 4) return [...Array(4)].map((_, index) => totalPages - 3 + index);

		return [props.currentPage - 2, props.currentPage, props.currentPage];
	});
</script>


<template>
	<div class="pagination">
		<button
			@click="$emit('updatePage', 0)"
			:disabled="currentPage === 0"
			title="Перейти к первой странице"
			class="pagination__button"
		>
			<svg class="pagination__button-icon" height="20" width="20">
				<use xlink:href="@/assets/icons/pagination.svg#arrow-beginning"/>
			</svg>
		</button>
		<button 
			@click="$emit('updatePage', currentPage - 1)"
			:disabled="currentPage === 0"
			title="Перейти к предыдущей странице"
			class="pagination__button"
		>
			<svg class="pagination__button-icon" height="20" width="20">
				<use xlink:href="@/assets/icons/pagination.svg#arrow-back"/>
			</svg>
		</button>
		<ul class="pagination__list">
			<li 
				v-for="page in getPages"
				@click="$emit('updatePage', page - 1)"
				:class="['pagination__list-el', { active: currentPage === page - 1 }]"
				:title="`Перейти к ${page} странице`"
				:key="page"
			>
				{{ page }}
			</li>
		</ul>
		<button
			@click="$emit('updatePage', currentPage + 1)"
			:disabled="currentPage === pages - 1"
			title="Перейти к следующей странице"
			class="pagination__button"
		>
			<svg class="pagination__button-icon" height="20" width="20">
				<use xlink:href="@/assets/icons/pagination.svg#arrow-forward"/>
			</svg>
		</button>
		<button 
			@click="$emit('updatePage', pages - 1)"
			:disabled="currentPage === pages -1"
			title="Перейти к последней странице"
			class="pagination__button"
		>
			<svg class="pagination__button-icon" height="20" width="20">
				<use xlink:href="@/assets/icons/pagination.svg#arrow-end"/>
			</svg>
		</button>
	</div>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;
	@use "@/assets/styles/mixins.scss" as *;


	.pagination {
		align-items: center;
		display: flex;
		gap: 0.8vw;

		&__button {
			height: 1vw;
			width: 1vw;

			&-icon {
				color: $text-secondary;
				height: 100%;
				width: 100%;
			}

			&:disabled {
				pointer-events: none;

				& .pagination__button-icon {
					color: $background-primary;
				}
			}
		}

		&__list {
			display: flex;
			justify-content: center;
			gap: 0.25vw;

			&-el {
				align-items: center;
				display: flex;
				justify-content: center;

				border-radius: 100%;

				color: $text-secondary;
				font-size: 0.7vw;
				cursor: pointer;

				transition: background 0s, color 0.1s ease-in-out;
				height: 1.25vw;
				width: 1.25vw;

				&.active {
					background: $accent-blue;
					color: $accent-white;
				}
			}
		}
	}


	@media(hover: hover) {
		.pagination__list-el:hover:not(.active) {
			color: $text-primary;
		}

		.pagination__button:hover .pagination__button-icon {
			color: $text-primary;
		}
	}
</style>