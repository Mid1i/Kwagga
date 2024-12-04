<script setup lang="ts">
	import { useRoute } from "vue-router";

	import { usePopup } from "@/hooks/usePopup";
	import { useTheme } from "@/store/theme";


	const router = useRoute();

	const admin = {
		firstName: "Михаил",
		lastName: "Чернов",
		email: "example@mail.ru"
	};

	const themeStore = useTheme();

	const { isActivePopup, togglePopup } = usePopup();
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
			<div class="header__account">
				<span class="header__account-text">
					Добро пожаловать, <b>{{ admin.firstName }}</b> <br/>
					Администратор
				</span>
				<button @click="togglePopup" class="header__account-button" title="Открыть аккаунт">
					<svg class="header__account-icon" height="24" width="24">
						<use xlink:href="@/assets/icons/account.svg#account"/>
					</svg>
				</button>
				<div @click="togglePopup" :class="['header__account-popup account', { active: isActivePopup }]">
					<h6 class="account__title">{{ `${admin.firstName} ${admin.lastName}` }}</h6>
					<span class="account__email">{{ admin.email }}</span>
					<button class="account__button" title="Выйти из админ-панели">Выйти</button>
				</div>
			</div>
		</div>
	</header>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;
	@use "@/assets/styles/mixins.scss" as *;


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

			position: relative;

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

	.account {
		@include layout;

		border-radius: 1vw;
		
		align-items: center;
		padding: 1vw 2vw;

		pointer-events: none;
		opacity: 0;

		position: absolute;
		top: calc(100% + 0.5vw);
		right: 0px;

		z-index: 5;

		&.active {
			pointer-events: auto;
			opacity: 1;
		}

		&__title {
			color: $text-primary;
			font-weight: 700;
			font-size: 0.8vw;

			margin-bottom: 0.25vw;
		}

		&__email {
			color: $text-primary;
			font-size: 0.7vw;

			margin-bottom: 1vw;
		}

		&__button {
			color: $text-primary;
			font-weight: 700;
			font-size: 0.8vw;
		}
	}


	@media(hover: hover) {
		.header__account-button:hover {
			background: $accent-blue;

			& .header__account-icon {
				color: $accent-white;
			}
		}

		.account__button:hover {
			color: $accent-red;
		}
	}
</style>