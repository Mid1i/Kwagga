<script setup lang="ts">
	import { Swiper, SwiperSlide } from "swiper/vue";
	import { Navigation, Pagination } from "swiper/modules";

	import "swiper/swiper-bundle.css";


	defineProps<{
		altText: string;
		images: string[];
		height: number;
		width: number;
	}>();
</script>


<template>
	<Swiper
		:navigation="{ prevEl: '.slider__button--prev', nextEl: '.slider__button--next' }"
		:pagination="{ el: '.slider__pagination', clickable: true }"
		:style="{ 'height': `${height + 2.2}vw`, 'width': `${width}vw` }"
		:modules="[Navigation, Pagination]"
		:space-between="10"
		class="slider__wrapper"
	>
		<SwiperSlide
			v-for="image in images"
			:key="image"
			class="slider__slide"
		>
			<div class="slider__slide-wrapper">
				<img
					:alt="altText"
					:src="image"
					class="slider__slide-image"
				/>
			</div>
		</SwiperSlide>
		<div v-if="images.length > 1" class="slider__navigation">
			<div v-if="images.length < 12" class="slider__pagination"></div>
			<div class="slider__button slider__button--prev" title="Следующее фото">
				<svg class="slider__button-icon" height="20" width="20">
					<use xlink:href="@/assets/icons/slider.svg#arrow-left"/>
				</svg>
			</div>
			<div class="slider__button slider__button--next" titl="Предыдущее фото">
				<svg class="slider__button-icon" height="20" width="20">
					<use xlink:href="@/assets/icons/slider.svg#arrow-right"/>
				</svg>
			</div>
		</div>
	</Swiper>
</template>


<style lang="scss">
	@use "@/assets/styles/variables.scss" as *;


	.slider {
		position: relative;

		&__slide {
			cursor: grab;
			height: calc(100% - 2.2vw);
			width: 100%;

			&:active {
				cursor: grabbing;
			}

			&-wrapper {
				border-radius: 0.5vw;
				overflow: hidden;

				height: 100%;
				width: 100%;
			}

			&-image {
				pointer-events: none;
				object-fit: cover;

				height: 100%;
				width: 100%;
			}
		}

		&__button {
			background: $accent-black;
			box-shadow: 0px 1.6vw 2.5vw 0px $box-shadow;
			border-radius: 100%;

			align-items: center;
			display: flex;
			flex: 0 0 auto;
			justify-content: center;

			cursor: pointer;

			height: 1.55vw;
			width: 1.55vw;

			z-index: 2;

			&--prev {
				right: 3.1vw;
			}

			&.swiper-button-disabled {
				pointer-events: none;
				opacity: 0.3;
			}

			&-icon {
				color: $accent-white;

				height: 1vw;
				width: 1vw;
			}
		}

		&__navigation {
			align-items: center;
			display: flex;
			justify-content: flex-end;
			gap: 0.8vw;

			position: absolute;
			bottom: 0px;
			left: 0px;

			width: 100%;
			z-index: 2;
		}

		&__pagination {
			display: flex;
			flex: 1 1 auto;
			gap: 0.8vw;

			& .swiper-pagination-bullet {
				background: $text-primary;
				border-radius: 100%;

				cursor: pointer;

				margin: 0px !important;

				height: 0.5vw;
				width: 0.5vw;

				&-active {
					background: $accent-blue;
				}
			}
		}
	}


	@media(hover: hover) {
		.slider__button:not(.swiper-button-disabled):hover {
			background: $accent-blue;
		}

		.swiper-pagination-bullet:hover {
			background: $accent-blue;
		}
	}
</style>