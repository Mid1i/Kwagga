import { ref, computed } from "vue";
import { defineStore } from "pinia";

import type { TypeCoworkingSpaceList, TypeCoworkingPlaceList } from "@/types/TypeCoworkingList";


export const useCoworkingList = defineStore("coworking-list", () => {
	/**
	 * Все коворкинг-зоны с комнатами (для выпадающего списка).
	 */
	const spaceList = ref<TypeCoworkingSpaceList[]>([
		{
			id: 1,
			title: "ИдеяHub",
			places: [
				{
					id: 1,
					title: "Малая переговорная"
				},
				{
					id: 2,
					title: "Большая переговорная"
				}
			]
		},
		{
			id: 2,
			title: "TechHub",
			places: [
				{
					id: 1,
					title: "Стол 1"
				},
				{
					id: 2,
					title: "Стол 2"
				}
			]
		},
		{
			id: 3,
			title: "BeautyLab",
			places: [
				{
					id: 1,
					title: "Общий зал"
				}
			]
		}
	]);


	/**
	 * Получение всех коворкинг-зон для выпадающего списка.
	 * Возвращает массив коворкинг-зон в формате { id: 1, name: 'example' }.
	 */
	const getSpaceList = computed<TypeCoworkingPlaceList[]>(() => spaceList.value.reduce((result: TypeCoworkingPlaceList[], item: TypeCoworkingPlaceList) => [...result, { title: item.title, id: item.id }], []));

	/**
	 * Получение всех комнат коворкинг-зоны.
	 * @param {number} id - ID коворкинг-зоны. 
	 * @return {TypeCoworkingPlaceList[]} Массив комнат, содержащихся в указанной коворкинг-зоне. 
	 */
	const getPlaceList = (id: number): TypeCoworkingPlaceList[] => spaceList.value.find(item => item.id === id)?.places || [];


	return {
		spaceList,
		getSpaceList,
		getPlaceList
	};
});