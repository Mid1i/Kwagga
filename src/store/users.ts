import { ref } from "vue";
import { defineStore } from "pinia";

import type { TypeUser } from "@/types/TypeUsers";

import { useSorting } from "@/hooks/useSorting";
import { user } from "@/constants";


export const useUsers = defineStore("users", () => {
	/**
   * Массив новых пользователей для недельного графика.
   */
	const WEEK_USERS: number[] = [8, 10, 10, 34, 20, 53, 15];

	/**
	 * Кол-во пользователей, отображаемых на странице в пагинации.
	 */
	const PAGINATION_SIZE = 11;

	/**
	 * Текущая страница пагинации.
	 */
	const page = ref<number>(0);

	/**
	 * Результаты поиска.
	 */
	const searchResults = ref<TypeUser[]>([]);

	const { sorting, setSorting } = useSorting(page);


	/**
	 * Временное заполнение пользователей по шаблону (FIXME:).
	 * @return {TypeUser[]} Массив пользователей.
	 */
	const fillUsers = (): TypeUser[] => Array.from({ length: 53 }, (_, index) => ({ ...user, id: index + 1 }));

	/**
	 * Изменение страницы пагинации.
	 * @param {number} newPage - Новая страница.
	 */
	const updatePage = (newPage: number): void => {
		page.value = newPage;
	};

	/**
	 * Поиск пользователей по `email` или `id`.
	 * @param {string} search - Текущая величина поиска.
	 */
	const searchUsers = (search: string): void => {
		searchResults.value = search ? fillUsers().filter(item => item.email.includes(search) || item.id === Number(search)) : [];
	};


	return {
		PAGINATION_SIZE,
		WEEK_USERS,
		searchResults,
		sorting,
		page,
		searchUsers,
		updatePage,
		fillUsers,
		setSorting
	}
});