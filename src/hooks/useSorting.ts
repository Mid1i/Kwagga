import { ref, Ref } from "vue";


export const useSorting = (page: Ref<number>) => {
	/**
	 * Текущая сортировка.
	 */
	const sorting = ref<string>("");

	/**
	 * Установка или сброс сортировки.
	 * @param {string} value - Текущая сортировка.
	 */
	const setSorting = (value: string): void => {
		sorting.value = sorting.value === value ? "" : value;
		page.value = 0;
	};


	return {
		sorting,
		setSorting
	}
}