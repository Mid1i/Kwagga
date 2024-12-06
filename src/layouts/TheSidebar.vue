<script setup lang="ts">
	import TheSidebarLink from "./TheSidebarLink.vue";
</script>


<template>
	<aside class="sidebar">
		<svg class="sidebar__logo" height="30" width="160">
			<use xlink:href="@/assets/icons/logo.svg#logo"/>
		</svg>
		<nav class="sidebar__nav">
			<ul class="sidebar__list">
				<TheSidebarLink
					icon="sidebar-1"
					text="Главная"
					link="/"
				/>
				<TheSidebarLink
					icon="sidebar-2"
					text="Пользователи"
					link="/users"
				/>
				<TheSidebarLink
					icon="sidebar-3"
					text="Коворкинг"
					link="/coworking"
				/>
				<TheSidebarLink
					icon="sidebar-4"
					text="Аналитика"
					link="/analytics"
				/>
				<TheSidebarLink
					icon="sidebar-5"
					text="Брони"
					link="/bookings"
				/>
			</ul>
		</nav>
	</aside>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;


	.sidebar {
		display: flex;
		flex-direction: column;
		gap: 2.1vw;

		padding-top: 0.2vw;

		width: 10.4vw;

		&__logo {
			color: $text-primary;
		}

		&__list {
			display: flex;
			flex-direction: column;
		}
	}
</style>