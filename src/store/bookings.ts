import { ref } from "vue";
import { defineStore } from "pinia";

import type { TypeBookingFilter, TypeBookingDateFilter } from "@/types/TypeBookingFilters";
import type { TypeBooking } from "@/types/TypeBookings";

import { usePagination } from "@/hooks/usePagination";
import { useSorting } from "@/hooks/useSorting";


const booking: TypeBooking = {
	id: 1,
	user: {
		id: 4,
		firstName: "Михаил",
		lastName: "Чернов",
		email: "example@mail.ru"
	},
	coworkingSpace: {
		id: 1,
		name: "TechHub"
	},
	coworkingPlace: {
		id: 1,
		name: "Малая переговорная"
	},
	dateOfCreating: "26.07.2024",
	dateOfBooking: "26.07.2024"
};


export const useBookings = defineStore("bookings", () => {
	const WEEK_BOOKINGS: number[] = [8, 10, 10, 34, 20, 53, 15];

	const { page, PAGINATION_SIZE, updatePage } = usePagination();
	const { sorting, setSorting } = useSorting(page);

	/**
	 * Результаты поиска.
	 */
	const searchResults = ref<TypeBooking[]>([]);

	/**
	 * Применённые фильтры.
	 */
	const filters = ref<TypeBookingFilter[]>([]);

	/**
	 * Применённые фильтры, связанные с датами.
	 */
	const dateFilters = ref<TypeBookingDateFilter[]>([]);


	/**
	 * Заполнение броней по шаблону (временно).
	 * 
	 * @return {TypeBooking[]} Возвращает массив броней.
	 */
	const fillBookings = (): TypeBooking[] => {
		let bookings = [];
		for (let i = 0; i < 56; i++) bookings.push({...booking, id: i + 1});
		return bookings;
	};

	/**
	 * Поиск броней по id.
	 * 
	 * @param {string} search - Текущая величина поиска.
	 */
	const searchBookings = (search: string): void => {
		searchResults.value = search ? fillBookings().filter(item => item.id === Number(search)) : [];
	};

	/**
	 * Проверка на существование фильтра.
	 * 
	 * @param {TypeBookingFilter} filter - Проверяемый фильтр. 
	 * @return {boolean} Возвращает true, если такой фильтр есть, false - если фильтра нет. 
	 */
	const isActiveFilter = (filter: TypeBookingFilter): boolean => !!filters.value.find(item => JSON.stringify(item) === JSON.stringify(filter));

	/**
	 * Обновление фильтров.
	 * 
	 * @param {TypeBookingFilter} filter - Текущий фильтр, содержащий id пространства и id комнаты.
	 */
	const updateFilters = (filter: TypeBookingFilter): void => {
		filters.value = isActiveFilter(filter) ? filters.value.filter(item => JSON.stringify(item) !== JSON.stringify(filter)) : [...filters.value, filter];
	};

	/**
	 * Обновление фильтров, связанных с датами.
	 * 
	 * @param {TypeBookingDateFilter} filter - Текущий фильтр, содержащий id и начало/конец промежутка.
	 */
	const updateDateFilters = (filter: TypeBookingDateFilter): void => {
		const isExistingId = dateFilters.value.find(item => item.id === filter.id);
		dateFilters.value = isExistingId ? dateFilters.value.map(item => item.id === filter.id ? { ...item, ...filter } : item) : [...dateFilters.value, filter];
	};

	/**
	 * Сброс всех фильтров.
	 */
	const clearFilters = (): void => {
		dateFilters.value = [];
		filters.value = [];
	};

	/**
	 * Применение фильтров.
	 */
	const applyFilters = (): void => {
		console.log(filters.value, dateFilters.value);
	};


	return {
		/**
		 * Текущие фильтры.
		 */
		filters,
		/**
		 * Применённые фильтры, связанные с датами.
		 */
		dateFilters,
		/**
		 * Текущая сортировка.
		 */
		sorting,
		/**
		 * Результаты поиска.
		 */
		searchResults,
		/**
		 * Массив новых броней для недельного графика.
		 */
		WEEK_BOOKINGS,
		/**
		 * Текущий размер пагинации.
		 */
		PAGINATION_SIZE,
		/**
		 * Текущая страница пагинации.
		 */
		page,
		/**
		 * Изменение страницы пагинации.
		 * 
		 * @param {number} newPage - Новая страница пагинации.
		 * @return {void}
		 */
		updatePage,
		/**
		 * Заполнение броней по шаблону.
		 * 
		 * @return {TypeBooking[]} - Возвращает массив броней.
		 */
		fillBookings,
		/**
		 * Поиск броней по id.
		 * 
		 * @param {string} search - Текущая величина поиска.
		 * @return {void}
		 */
		searchBookings,
		/**
		 * Установить/сбросить сортировку.
		 * 
		 * @param {string} value - Текущая сортировка. 
		 * @return {void}
		 */
		setSorting,
		/**
		 * Проверка на существование фильтра.
		 * 
		 * @param {TypeBookingFilter} filter - Проверяемый фильтр. 
		 * @return {boolean} - Возвращает true, если такой фильтр есть, false - если фильтра нет. 
		 */
		isActiveFilter,
		/**
		 * Обновление фильтров.
		 * 
		 * @param {TypeBookingFilter} filter - Текущий фильтр, содержащий id пространства и id комнаты. 
		 * @return {void}
		 */
		updateFilters,
		/**
		 * Обновление фильтров, связанных с датами.
		 * 
		 * @param {TypeBookingDateFilter} filter - Текущий фильтр, содержащий id и начало/конец промежутка.
		 * @return {void} 
		 */
		updateDateFilters,
		/**
		 * Сброс всех фильтров.
		 */
		clearFilters,
		/**
		 * Применение фильтров.
		 */
		applyFilters
	}
});