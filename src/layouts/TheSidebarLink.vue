<script setup lang="ts">
	import { RouterLink, useRoute } from "vue-router";


	defineProps<{
		icon: string;
		text: string; 
		link: string;
	}>();


	const router = useRoute();
</script>


<template>
	<RouterLink 
		:class="`link ${router.path === link ? 'active' : ''}`"
		:title="text"
		:to="link" 
	>
		<svg class="link__icon" height="16" width="16">
			<use :xlink:href="`/icons/sidebar.svg#${icon}`"/>
		</svg>
		{{ text }}
	</RouterLink>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;


	.link {
		border-left: 0.2vw solid transparent;

		align-items: center;
		display: flex;
		gap: 0.8vw;

		color: $text-primary;
		font-weight: 500;
		font-size: 0.8vw;

		padding: 0.8vw 1.05vw;
		position: relative;

		width: 100%;

		&__icon {
			color: $text-primary;

			flex: 0 0 auto;
			height: 1.05vw;
			width: 1.05vw;
		}

		&.active {
			background: $box-shadow;
			border-color: $accent-blue;

			color: $accent-blue;

			& .link__icon {
				color: $accent-blue;
			}
		}
	}


	@media(hover: hover) {
		.link:not(.active):hover {
			color: $accent-blue;
			transform: translateX(0.5vw);

			& .link__icon {
				color: $accent-blue;
			}
		}
	}
</style>