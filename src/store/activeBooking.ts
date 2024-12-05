import { defineStore } from "pinia";
import { ref } from "vue";

import type { TypeBooking } from "@/types/TypeBookings";

import { EMPTY_BOOKING } from "@/constants";


export const useActiveBooking = defineStore("active-booking", () => {
	/**
	 * Выбранная бронь (для редактирования и просмотра информации).
	 */
	const booking = ref<TypeBooking>(EMPTY_BOOKING);

	/**
	 * Изменение активной брони (для редактирования или просмотра информации).
	 * 
	 * @param {TypeBooking | null} value - Новая бронь или null для сброса текущей активной. 
	 */
	const setBooking = (value: TypeBooking | null): void => {
		booking.value = value ?? EMPTY_BOOKING;
	};

	/**
	 * Изменение активной брони. На вход подаётся тип изменяемого свойства.
	 * 
	 * @param {TypeBooking[T]} value - Новое значение.
	 * @param {T extends keyof TypeBooking} key - Ключ изменяемого свойства.  
	 */
	const updateBooking = <T extends keyof TypeBooking>(value: TypeBooking[T], key: T): void => {
		booking.value = {
			...booking.value,
			[key]: (typeof value === "object" && typeof booking.value[key] === "object" && value.id === booking.value[key].id) 
				? EMPTY_BOOKING[key] 
				: value
		};
	};

	/**
	 * Проверяет, является ли данное пространство выбранным или нет.
	 * 
	 * @param {number} id - ID пространства. 
	 * @return {boolean} Возвращает true, если пространство выбрано, иначе - false. 
	 */
	const isActiveSpace = (id: number): boolean => booking.value?.coworkingSpace?.id === id;

	/**
	 * Проверяет, является ли данная комната выбранной или нет.
	 * 
	 * @param {number} id - ID комнаты. 
	 * @return {boolean} Возвращает true, если комната выбрана, иначе - false. 
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
		console.log(`Бронь добавленаЖ ${booking.value}`);
	};


	return {
		/**
		 * Выбранная бронь (для редактирования и просмотра информации).
		 */
		booking,
		/**
		 * Изменение активной брони (для редактирования или просмотра информации).
		 * 
		 * @param {TypeBooking | null} value - Новая бронь или null для сброса текущей активной. 
		 */
		setBooking,
		/**
		 * Изменение активной брони. На вход подаётся тип изменяемого свойства.
		 * 
		 * @param {TypeBooking[T]} value - Новое значение.
		 * @param {T extends keyof TypeBooking} key - Ключ изменяемого свойства.  
		 */
		updateBooking,
		/**
		 * Проверяет, является ли данное пространство выбранным или нет.
		 * 
		 * @param {number} id - ID пространства. 
		 * @return {boolean} Возвращает true, если пространство выбрано, иначе - false. 
		 */
		isActiveSpace,
		/**
		 * Проверяет, является ли данная комната выбранной или нет.
		 * 
		 * @param {number} id - ID комнаты. 
		 * @return {boolean} Возвращает true, если комната выбрана, иначе - false. 
		 */
		isActivePlace,
		/**
		 * Изменение брони (через бекэнд).
		 */
		editBooking,
		/**
		 * Добавление брони (через бекэнд).
		 */
		addBooking
	};
});