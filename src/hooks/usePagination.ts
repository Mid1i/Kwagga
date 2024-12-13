import { ref } from "vue";


export const usePagination = () => {
	/**
	 * Кол-во броней, отображаемых на странице в пагинации.
	 */
	const PAGINATION_SIZE = 11;

	/**
	 * Текущая страница пагинации.
	 */
	const page = ref<number>(0);

	/**
	 * Изменение страницы пагинации.
	 * @param {number} newPage - Новая страница.
	 */
	const updatePage = (newPage: number): void => {
		page.value = newPage;
	};


	return {
		page,
		PAGINATION_SIZE,
		updatePage
	}
}