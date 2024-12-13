import { defineStore } from "pinia";
import { ref } from "vue";

import type { TypeBooking } from "@/types/TypeBookings";

import { useBookings } from '@/store/bookings';
import { EMPTY_BOOKING } from "@/constants";


export const useActiveBooking = defineStore("active-booking", () => {
	const bookingsStore = useBookings();

	/**
	 * Текущее выбранное бронирование.
	 */
	const booking = ref<TypeBooking>(EMPTY_BOOKING);

	/**
	 * Устанавливает новое бронирование или сбрасывает его.
	 * @param {TypeBooking | null} value - Новое бронирование или `null`. 
	 */
	const setBooking = (value: TypeBooking | null): void => {
		booking.value = value ?? EMPTY_BOOKING;
	};

	/**
	 * Обновление конкретного свойства текущего бронирования.
	 * @param {T extends keyof TypeBooking} key - Ключ свойства.  
	 * @param {TypeBooking[T]} value - Новое значение.
	 */
	const updateBooking = <T extends keyof TypeBooking>(value: TypeBooking[T], key: T): void => {
		const currentValue = booking.value[key];

		booking.value = {
			...booking.value,
			[key]: (typeof value === "object" && typeof currentValue === "object" && value?.id === currentValue?.id) 
				? EMPTY_BOOKING[key] 
				: value
		};
	};

	/**
	 * Проверяет, выбрано ли пространство с данным `id`.
	 * @param {number} id - ID пространства. 
	 * @return {boolean} Результат проверки. 
	 */
	const isActiveSpace = (id: number): boolean => booking.value?.coworkingSpace?.id === id;

	/**
	 * Проверяет, выбрана ли комната с данным `id`.
	 * @param {number} id - ID комнаты. 
	 * @return {boolean} Результат проверки.
	 */
	const isActivePlace = (id: number): boolean => booking.value?.coworkingPlace?.id === id;

	/**
	 * Изменение брони (через бекэнд).
	 */
	const editBooking = (): void => {
		console.log(`Бронь изменена: ${booking.value}`);
	};

	/**
	 * Добавление брони (через бекэнд).
	 */
	const addBooking = (): void => {
		bookingsStore.bookings.push({ ...booking.value, id: bookingsStore.bookings.length, dateOfCreating: "14.12.2024" });
		booking.value = EMPTY_BOOKING;
	};


	return {
		booking,
		setBooking,
		updateBooking,
		isActiveSpace,
		isActivePlace,
		editBooking,
		addBooking
	};
});