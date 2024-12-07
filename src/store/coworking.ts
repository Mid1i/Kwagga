import { ref, computed } from "vue";
import { defineStore } from "pinia";

import type { TypeCoworkingSpace, TypeCoworkingPlace, TypeCoworkingSpaceExpanded } from "@/types/TypeCoworking";
import type { TypePlaceRating } from "@/types/TypePlaceRating";

import { space as SPACE } from "@/constants";


export const useCoworking = defineStore("coworking", () => {
	/**
	 * Все коворкинг-зоны с комнатами.
	 */
	const space = ref<TypeCoworkingSpace[]>([
		{
			id: 1,
			name: "ИдеяHub",
			places: [
				{
					id: 1,
					name: "Малая переговорная"
				},
				{
					id: 2,
					name: "Большая переговорная"
				}
			]
		},
		{
			id: 2,
			name: "TechHub",
			places: [
				{
					id: 1,
					name: "Стол 1"
				},
				{
					id: 2,
					name: "Стол 2"
				}
			]
		},
		{
			id: 3,
			name: "BeautyLab",
			places: [
				{
					id: 1,
					name: "Общий зал"
				}
			]
		}
	]);

	/**
	 * Рейтинг коворкинг мест по кол-ву броней.
	 */
	const rating = ref<TypePlaceRating[]>([
		{
			id: 1,
			coworkingSpace: {
				id: 1,
				name: "TechHub"
			},
			coworkingPlace: {
				id: 1,
				name: "Малая переговорная"
			},
			bookings: 12
		},
		{
			id: 2,
			coworkingSpace: {
				id: 2,
				name: "ИдеяHub"
			},
			coworkingPlace: {
				id: 1,
				name: "Большая переговорная"
			},
			bookings: 10
		},
		{
			id: 4,
			coworkingSpace: {
				id: 2,
				name: "ИдеяHub"
			},
			coworkingPlace: {
				id: 1,
				name: "Рабочий стол №1"
			},
			bookings: 10
		},
		{
			id: 4,
			coworkingSpace: {
				id: 3,
				name: "BeautyLab"
			},
			coworkingPlace: {
				id: 1,
				name: "Общий зал"
			},
			bookings: 8
		},
		{
			id: 5,
			coworkingSpace: {
				id: 2,
				name: "TechHub"
			},
			coworkingPlace: {
				id: 2,
				name: "Игровое место"
			},
			bookings: 10
		}
	]);

	/**
	 * Все коворкинг-зоны (с полной информацией).
	 */
	const spaceExpanded = ref<TypeCoworkingSpaceExpanded[]>(SPACE);

	/**
	 * Получение всех коворкинг-зон для выпадающего списка.
	 * Возвращает массив коворкинг-зон в формате { id: 1, name: 'example' }.
	 */
	const getSpace = computed<TypeCoworkingPlace[]>(() => space.value.reduce((result: TypeCoworkingPlace[], item: TypeCoworkingSpace) => [...result, { name: item.name, id: item.id }], []));

	/**
	 * Получение всех комнат коворкинг-зоны.
	 * 
	 * @param {number} id - ID коворкинг-зоны. 
	 * @return {TypeCoworkingPlace[]} Возвращает все комнаты, содержащиеся в данной коворкинг-зоне. 
	 */
	const getPlaces = (id: number): TypeCoworkingPlace[] => space.value.find(item => item.id === id)?.places || [];

	/**
	 * Изменение статуса коворкинг-зоны.
	 * 
	 * @param {number} id - ID изменяемой коворкинг-зоны. 
	 */
	const updateStatus = (id: number): void => {
		console.log(`Статус коворкинг-зоны с id=${id} изменён.`);
	}


	return {
		/**
		 * Все коворкинг зоны с комнатами.
		 */
		space,
		/**
		 * Все коворкинг-зоны (с полной информацией).
		 */
		spaceExpanded,
		/**
		 * Рейтинг коворкинг мест по кол-ву броней.
		 */
		rating,
		/**
		 * Получение всех коворкинг-зон для выпадающего списка.
		 * Возвращает массив коворкинг-зон в формате { id: 1, name: 'example' }.
		 */
		getSpace,
		/**
		 * Получение всех комнат коворкинг-зоны.
		 * 
		 * @param {number} id - ID коворкинг-зоны. 
		 * @return {TypeCoworkingPlace[]} Возвращает все комнаты, содержащиеся в данной коворкинг-зоне. 
		 */
		getPlaces,
		/**
		 * Изменение статуса коворкинг-зоны.
		 * 
		 * @param {number} id - ID изменяемой коворкинг-зоны. 
		 */
		updateStatus
	}
});