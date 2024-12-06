<script setup lang="ts">
	import BaseSpaceDropdownList from "@/components/BaseSpaceDropdownList.vue";
	import BaseDateInput from "@/components/BaseDateInput.vue";
	import BaseTextarea from "@/components/BaseTextarea.vue";
	import TheBlackout from "@/layouts/TheBlackout.vue";
	import BaseInput from "@/components/BaseInput.vue";
	import ThePopup from "@/layouts/ThePopup.vue";

	import { useActiveBooking } from "@/store/activeBooking";
	import { convertToDate } from "@/helpers/converters";
	import { useCoworking } from "@/store/coworking";


	defineProps<{
		isVisible: boolean;
	}>();

	const emit = defineEmits<{
		closePopup: [];
	}>();


	const activeBookingStore = useActiveBooking();
	const coworkingStore = useCoworking();

	const cancel = () => {
		emit("closePopup");
		window.setTimeout(() => activeBookingStore.setBooking(null), 100);
	};
</script>


<template>
	<TheBlackout
		@close-popup="cancel"
		:is-visible="isVisible"
	>
		<ThePopup
			@close-popup="cancel"
			:is-visible="isVisible"
			:title="!!activeBookingStore.booking.id ? `Бронь № ${activeBookingStore.booking.id}` : 'Новая бронь'"
		>
			<div class="booking">
				<p class="booking__error"></p>
				<section class="booking__section">
					<h3 class="booking__title">Пространтсво и место брони</h3>
					<BaseSpaceDropdownList
						@change-element="activeBookingStore.updateBooking"
						:is-active-element="activeBookingStore.isActiveSpace"
						:name="activeBookingStore.booking.coworkingSpace.name || 'Выберите пространство'"
						:elements="coworkingStore.getSpace"
						id="coworkingSpace"
					/>
					<BaseSpaceDropdownList
						v-if="!!activeBookingStore.booking.coworkingSpace.id"
						@change-element="activeBookingStore.updateBooking"
						:is-active-element="activeBookingStore.isActivePlace"
						:name="activeBookingStore.booking.coworkingPlace.name || 'Выберите место'"
						:elements="coworkingStore.getPlaces(activeBookingStore.booking.coworkingSpace.id)"
						id="coworkingPlace"
					/>
				</section>
				<section class="booking__section">
					<h4 class="booking__title">Дата брони</h4>
					<BaseDateInput
						@update-booking="activeBookingStore.updateBooking"
						:date="!!activeBookingStore.booking.dateOfBooking ? convertToDate(activeBookingStore.booking.dateOfBooking) : null"
						id="dateOfBooking"
						step="from"
					/>
				</section>
				<section class="booking__section">
					<h4 class="booking__title">Комментарий к брони</h4>
					<BaseTextarea
						v-model="activeBookingStore.booking.comment"
						name="comment"
						type="text"
						text="Комментарий"
					/>
				</section>
				<section class="booking__section">
					<h3 class="booking__title">Информация о пользователе</h3>
					<div class="booking__row">
						<div class="booking__field">
							<BaseInput
								v-model="activeBookingStore.booking.user.firstName"
								:is-readonly="!!activeBookingStore.booking.user.firstName"
								name="firstName"
								type="text"
								text="Имя"
							/>
						</div>
						<BaseInput
							v-model="activeBookingStore.booking.user.lastName"
							:is-readonly="!!activeBookingStore.booking.user.lastName"
							name="lastName"
							type="text"
							text="Фамилия"
						/>
					</div>
					<BaseInput
						v-model="activeBookingStore.booking.user.email"
						:is-readonly="!!activeBookingStore.booking.user.email"
						name="email"
						type="email"
						text="Email"
					/>
				</section>
				<div class="booking__section">
					<template v-if="!!activeBookingStore.booking.id">
						<button @click="activeBookingStore.editBooking" class="booking__button">Сохранить изменения</button>
						<button @click="cancel" class="booking__cancel">Отменить изменения</button>
					</template>
					<template v-else>
						<button @click="activeBookingStore.addBooking" class="booking__button">Добавить бронь</button>
						<button @click="cancel" class="booking__cancel">Отменить</button>
					</template>
				</div>
			</div>
		</ThePopup>
	</TheBlackout>
</template>


<style scoped lang="scss">
	@use "@/assets/styles/variables.scss" as *;


	.booking {
		display: flex;
		flex: 1 1 auto;
		flex-direction: column;
		gap: 3vw;

		padding-bottom: 2vw;

		&__error {
			color: $accent-red;
			font-weight: 500;
			font-size: 0.7vw;

			&:empty {
				display: none;
			}
		}

		&__title {
			color: $text-primary;
			font-weight: 700;
			font-size: 1vw;

			margin-bottom: 0.5vw;
		}

		&__section {
			display: flex;
			flex-direction: column;
			gap: 1vw;

			&:last-child {
				margin-top: auto;
			}
		}

		&__row {
			display: flex;
			gap: inherit;
		}

		&__field {
			flex: 0 0 40%;
		}

		&__button {
			background: $accent-blue;
			border: 0.05vw solid transparent;
			border-radius: 0.5vw;

			color: $accent-white;
			font-weight: 500;
			font-size: 0.8vw;

			height: 2.6vw;
		}

		&__cancel {
			align-self: center;

			color: $accent-red;
			font-weight: 600;
			font-size: 0.8vw;
		}
	}


	@media(hover: hover) {
		.booking__button:hover {
			border-color: $text-primary;
		}

		.booking__cancel:hover {
			text-decoration: underline;
		}
	}
</style>