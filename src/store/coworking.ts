import { ref, computed } from "vue";
import { defineStore } from "pinia";

import type { TypeCoworkingSpace, TypeCoworkingPlace } from "@/types/TypeCoworking";


export const useCoworking = defineStore("coworking", () => {
	/**
	 * Все коворкинг зоны с комнатами.
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


	return {
		/**
		 * Все коворкинг зоны с комнатами.
		 */
		space,
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
		getPlaces
	}
});