import { ref } from "vue";
import { defineStore } from "pinia";

import type { TypeBookingFilter, TypeBookingDateFilter } from "@/types/TypeBookingFilters";
import type { TypeBooking } from "@/types/TypeBookings";

import { usePagination } from "@/hooks/usePagination";
import { useSorting } from "@/hooks/useSorting";
import { booking } from "@/constants";


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
	 * Заполнение броней по шаблону (FIXME:).
	 * @return {TypeBooking[]} Массив броней.
	 */
	const fillBookings = (): TypeBooking[] => Array.from({ length: 56 }, (_, i) => ({ ...booking, id: i + 1 }));

	/**
	 * Поиск броней по `id`.
	 * @param {string} search - Текущая величина поиска.
	 */
	const searchBookings = (search: string): void => {
		searchResults.value = search ? fillBookings().filter(item => item.id === Number(search)) : [];
	};

	/**
	 * Проверка на существование фильтра.
	 * @param {TypeBookingFilter} filter - Проверяемый фильтр. 
	 * @return {boolean} Результат проверки. 
	 */
	const isActiveFilter = (filter: TypeBookingFilter): boolean => filters.value.some(item => JSON.stringify(item) === JSON.stringify(filter));

	/**
	 * Изменение фильтров.
	 * @param {TypeBookingFilter} filter - Текущий фильтр, содержащий `id` пространства и `id` комнаты.
	 */
	const updateFilters = (filter: TypeBookingFilter): void => {
		filters.value = isActiveFilter(filter) ? filters.value.filter(item => JSON.stringify(item) !== JSON.stringify(filter)) : [...filters.value, filter];
	};

	/**
	 * Изменение фильтров, связанных с датами.
	 * @param {TypeBookingDateFilter} filter - Текущий фильтр, содержащий `id` и начало/конец промежутка.
	 */
	const updateDateFilters = (filter: TypeBookingDateFilter): void => {
		const isExist = dateFilters.value.find(item => item.id === filter.id);
		dateFilters.value = isExist ? dateFilters.value.map(item => item.id === filter.id ? { ...item, ...filter } : item) : [...dateFilters.value, filter];
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
		WEEK_BOOKINGS,
		PAGINATION_SIZE,
		searchResults,
		dateFilters,
		filters,
		sorting,
		page,
		setSorting,
		updatePage,
		fillBookings,
		searchBookings,
		updateFilters,
		isActiveFilter,
		updateDateFilters,
		clearFilters,
		applyFilters
	}
});