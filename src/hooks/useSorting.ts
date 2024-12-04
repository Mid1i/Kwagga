import { ref, Ref } from "vue";


export const useSorting = (page: Ref<number>) => {
	/**
	 * Текущая сортировка.
	 */
	const sorting = ref<string>("");

	/**
	 * Установить/сбросить сортировку.
	 * 
	 * @param {string} value - Текущая сортировка.
	 */
	const setSorting = (value: string): void => {
		sorting.value = sorting.value === value ? "" : value;
		page.value = 0;
	};


	return {
		/**
		 * Текущая сортировка.
		 */
		sorting,
		/**
		 * Установить/сбросить сортировку.
		 * 
		 * @param {string} value - Текущая сортировка.
		 */
		setSorting
	}
}