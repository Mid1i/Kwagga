import { ref } from "vue";
import { defineStore } from "pinia";

import type { TypeUsers } from "@/types/TypeUsers";


const user: TypeUsers = {
	id: 1,
	firstName: "Иван",
	lastName: "Иванов",
	email: "example@mail.ru",
	bookings: [2, 4, 1, 5, 2],
	dateOfRegistration: "26.07.2024"
};


export const useUsers = defineStore("users", () => {
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
	const searchResults = ref<TypeUsers[]>([]);

	/**
	 * Текущая сортировка.
	 */
	const sorting = ref<string>("");


	/**
	 * Заполнение пользователей по шаблону (временно).
	 * 
	 * @return {TypeUsers[]} - Возвращает массив пользователей.
	 */
	const fillUsers = (): TypeUsers[] => {
		let users = [];
		for (let i = 0; i < 53; i++) users.push({...user, id: i + 1});
		return users;
	};

	/**
	 * Изменение страницы пагинации.
	 * 
	 * @param {number} newPage - Новая страница. 
	 * @return {void}
	 */
	const updatePage = (newPage: number): void => {
		page.value = newPage;
	};

	/**
	 * Поиск пользователей по email или id.
	 * 
	 * @param {string} search - Текущая величина поиска. 
	 * @return {void}
	 */
	const searchUsers = (search: string): void => {
		searchResults.value = search ? fillUsers().filter(item => item.email.includes(search) || item.id === Number(search)) : [];
	};

	/**
	 * Установить/сбросить сортировку по пользователям.
	 * 
	 * @param {string} value - Текущая сортировка. 
	 * @return {void}
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
		 * Результаты поиска.
		 */
		searchResults,
		/**
		 * Массив новых пользователей для недельного графика.
		 */
		WEEK_USERS,
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
		 * Заполнение пользователей по шаблону.
		 * 
		 * @return {TypeUsers[]} - Возвращает массив пользователей.
		 */
		fillUsers,
		/**
		 * Поиск пользователей по email или id.
		 * 
		 * @param {string} search - Текущая величина поиска.
		 * @return {void}
		 */
		searchUsers,
		/**
		 * Установить/сбросить сортировку.
		 * 
		 * @param {string} value - Текущая сортировка. 
		 * @return {void}
		 */
		setSorting
	}
});