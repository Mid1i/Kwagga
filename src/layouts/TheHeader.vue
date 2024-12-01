<script setup lang="ts">
	import { useRoute } from "vue-router";

	import { useTheme } from "@/store/theme";


	const router = useRoute();

	const username = "Midi";

	const themeStore = useTheme();
</script>


<template>
	<header class="header">
		<h1 class="header__title">{{ router.meta.title }}</h1>
		<div class="header__right">
			<div class="header__theme">
				<button 
					@click="themeStore.switchTheme('light')" 
					:class="['header__theme-button', {active: themeStore.theme === 'light'}]"
					title="Светлая тема"
				>
					<svg class="header__theme-icon" height="18" width="18">
						<use xlink:href="@/assets/icons/theme.svg#theme-light"/>
					</svg>
				</button>
				<button 
					@click="themeStore.switchTheme('dark')" 
					:class="['header__theme-button', {active: themeStore.theme === 'dark'}]"
					title="Тёмная тема"
				>
					<svg class="header__theme-icon" height="18" width="18">
						<use xlink:href="@/assets/icons/theme.svg#theme-dark"/>
					</svg>
				</button>
			</div>
			<div class="header__account" title="Открыть аккаунт">
				<span class="header__account-text">
					Добро пожаловать, <b>{{ username }}</b> <br/>
					Администратор
				</span>
				<button class="header__account-button">
					<svg class="header__account-icon" height="24" width="24">
						<use xlink:href="@/assets/icons/account.svg#account"/>
					</svg>
				</button>
			</div>
		</div>
	</header>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;


	.header {
		align-items: center;
		display: flex;
		justify-content: space-between;

		width: 100%;

		&__title {
			color: $text-primary;
			font-size: 1.35vw;
			font-weight: 800;
		}

		&__right {
			align-items: center;
			display: flex;
			gap: 1.56vw;
		}

		&__theme {
			background: $box-shadow;
			border-radius: 0.2vw;

			display: flex;

			height: 1.56vw;
			width: 3.6vw;

			&-icon {
				color: $text-primary;
				height: 0.9vw;
				width: 0.9vw;
			}

			&-button {
				border-radius: 0.2vw;

				align-items: center;
				display: flex;
				flex: 0 0 50%;
				justify-content: center;

				height: 100%;

				&.active {
					background: $accent-blue;

					& .header__theme-icon {
						color: $text-primary;
					}
				}
			}
		}

		&__account {
			align-items: center;
			display: flex;
			gap: 0.8vw;

			&-text {
				color: $text-secondary;
				font-size: 0.7vw;
				text-align: right;

				& b {
					color: $text-primary;
					font-weight: 800;
				}
			}

			&-button {
				background: $box-shadow;
				border-radius: 100%;

				align-items: center;
				display: flex;
				justify-content: center;

				height: 2.1vw;
				width: 2.1vw;
			}

			&-icon {
				color: $text-primary;
				height: 1.25vw;
				width: 1.25vw;
			}
		}
	}


	@media(hover: hover) {
		.header__account-button:hover {
			background: $accent-blue;

			& .header__account-icon {
				color: $accent-white;
			}
		}
	}
</style>