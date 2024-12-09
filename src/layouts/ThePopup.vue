<script setup lang="ts">
	defineProps<{
		title: string,
		isVisible: boolean
	}>();

	defineEmits<{
		closePopup: [];
	}>();
</script>


<template>
	<div 
		:class="[
			'popup',
			{ active: isVisible }
		]"
	>
		<header class="popup__header">
			<h2 class="popup__header-title">{{ title }}</h2>
			<button @click="$emit('closePopup')" class="popup__header-button" title="Закрыть модальное окно">
				<svg class="popup__header-icon" height="20" width="20">
					<use xlink:href="@/assets/icons/cross.svg#cross"/>
				</svg>
			</button>
		</header>
		<slot></slot>
	</div>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;
	@use "@/assets/styles/mixins.scss" as *;


	.popup {
		@include layout;
		background: $background-primary;
		border-radius: 0px;

		position: fixed;
		right: -100%;
		top: 0px;

		padding: 2.6vw;
		padding-bottom: 0px;

		overflow-y: overlay;
		overflow-x: hidden;

		transition: all 0.5s ease-in-out;
		height: 100%;
		width: 31.25vw;
		z-index: 10;

		&.active {
			right: 0px;
		}

		&__header {
			align-items: center;
			display: flex;
			justify-content: space-between;

			margin-bottom: 3.1vw;

			&-title {
				color: $text-primary;
				font-size: 1vw;
				font-weight: 700;
			}

			&-icon {
				color: $text-primary;
			}
		}
	}


	@media(hover: hover) {
		.popup__button:hover .popup__button-icon {
			color: $accent-blue;
		}
	}
</style>