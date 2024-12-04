<script setup lang="ts">
	import type { TypeSorting } from "@/types/TypeSorting";

	import BaseCheckbox from "@/components/BaseCheckbox.vue";
	import TheBlackout from "@/layouts/TheBlackout.vue";
	import ThePopup from "@/layouts/ThePopup.vue";


	defineProps<{
		activeSorting: string;
		sortingItems: TypeSorting[];
		isVisible: boolean;
		title: string;
	}>();

	defineEmits<{
		(e: "closePopup"): void;
		(e: "setSorting", value: string): void;
	}>();
</script>


<template>
	<TheBlackout 
		@close-popup="$emit('closePopup')"
		:is-visible="isVisible"
	>
		<ThePopup
			@close-popup="$emit('closePopup')"
			:is-visible="isVisible"	
			:title="title"
		>
			<main class="content">
				<ul class="content__list">
					<li
						v-for="(sorting) in sortingItems" 
						:key="sorting.value"
						:title="sorting.htmlTitle"
						class="content__list-el"
					>
						<BaseCheckbox
							@click="$emit('setSorting', sorting.value)"
							:isActive="sorting.value === activeSorting"
							:id="sorting.value"
						/>
						<label :for="sorting.value" class="content__list-label">
							<svg class="content__list-icon" height="14" width="14">
								<use :xlink:href="`src/assets/icons/sorting.svg#${sorting.icon}`"/>
							</svg>
							{{ sorting.title }}
						</label>
					</li>
				</ul>
			</main>
		</ThePopup>
	</TheBlackout>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;
	@use "@/assets/styles/mixins.scss" as *;


	.content {
		flex: 1 0 auto;

		&__list {
			display: flex;
			flex-direction: column;
			gap: 1vw;

			&-el {
				align-items: center;
				display: flex;
				gap: 1vw;
			}

			&-icon:deep(path) {
				fill: $text-primary;
			}

			&-label {
				align-items: center;
				display: flex;
				gap: 0.8vw;

				color:$text-primary;
				font-weight: 700;
				font-size: 0.8vw;
				cursor: pointer;
			}
		}
	}


	@media(hover: hover) {
		.content__list-el:hover .checkbox {
			border-color: $text-secondary;
		}
	}
</style>