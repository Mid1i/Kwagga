import { ref, watch } from "vue";
import { defineStore } from "pinia";

import type { TypeCoworkingSpace } from "@/types/TypeCoworking";
import type { TypePlaceRating } from "@/types/TypePlaceRating";
import type { TypeDadata } from "@/types/TypeDadata";

import { space as SPACE, EMPTY_SPACE, EMPTY_PLACE } from "@/constants";
import { useDadata } from "@/hooks/useDadata";
import { debounce } from "@/helpers/debounce";


export const useCoworking = defineStore("coworking", () => {
	/**
	 * Рейтинг коворкинг мест по кол-ву броней.
	 */
	const rating = ref<TypePlaceRating[]>([
		{
			id: 1,
			coworkingSpace: {
				id: 1,
				title: "TechHub"
			},
			coworkingPlace: {
				id: 1,
				title: "Малая переговорная"
			},
			bookings: 12
		},
		{
			id: 2,
			coworkingSpace: {
				id: 2,
				title: "ИдеяHub"
			},
			coworkingPlace: {
				id: 1,
				title: "Большая переговорная"
			},
			bookings: 10
		},
		{
			id: 4,
			coworkingSpace: {
				id: 2,
				title: "ИдеяHub"
			},
			coworkingPlace: {
				id: 1,
				title: "Рабочий стол №1"
			},
			bookings: 10
		},
		{
			id: 4,
			coworkingSpace: {
				id: 3,
				title: "BeautyLab"
			},
			coworkingPlace: {
				id: 1,
				title: "Общий зал"
			},
			bookings: 8
		},
		{
			id: 5,
			coworkingSpace: {
				id: 2,
				title: "TechHub"
			},
			coworkingPlace: {
				id: 2,
				title: "Игровое место"
			},
			bookings: 10
		}
	]);

	/**
	 * Редактируемая коворкинг-зона.
	 */
	const editableSpace = ref<TypeCoworkingSpace>(EMPTY_SPACE);

	/**
	 * Все коворкинг-зоны (с полной информацией).
	 */
	const space = ref<TypeCoworkingSpace[]>(SPACE);

	/**
	 * Определяет, влючен ли сейчас режим редактирования или добавления коворкинг-зоны.
	 */
	const isEditable = ref<boolean>(false);

	/**
	 * Массив с новыми картинками для коворкинг-зон.
	 */
	const newImages = ref<File[]>([]);

	/**
	 * Новая схема для коворкинг-зоны.
	 */
	const newDesign = ref<File | null>(null);

	const { 
		/**
		 * Подсказки при вводе адреса.
		 */
		data: suggestions, 
		/**
		 * Состояние загрузки подсказок.
		 */
		isLoading: isSuggestionsLoading,
		/**
		 * Получение подсказок с сервиса Dadata. 
		 */ 
		fetchData: fetchSuggestions 
	} = useDadata<TypeDadata>();

	/**
	 * Изменение статуса коворкинг-зоны.
	 * @param {number} id - ID изменяемой коворкинг-зоны. 
	 */
	const updateStatus = (id?: number): void => {
		const item = space.value.find(item => item.id === id);
		item && (item.active = !item.active);
	};

	/**
	 * Сброс настроек редактирования/добавления.
	 */
	const resetEditableState = () => {
		editableSpace.value = EMPTY_SPACE;
		isEditable.value = true;
		newDesign.value = null;
		newImages.value = [];
	}

	/**
	 * Включение режима редактирования или добавления коворкинг-зоны.
	 * @param {TypeCoworkingSpace} coworkingSpace - Редактируемая коворкинг-зона.
	 */
	const setEditableSpace = (coworkingSpace?: TypeCoworkingSpace): void => {
		if (coworkingSpace) {
			editableSpace.value = coworkingSpace;
			isEditable.value = true;
		} else {
			resetEditableState();
		}
	};

	/**
	 * Добавление преимуществ коворкинг-зоны.
	 * 
	 * @param {string} name - Название преимущества. 
	 */
	const addConvenience = (name: string): void => {
		editableSpace.value.conveniences.push(name);
	};

	/**
	 * Удаление преимущества коворкинг-зоны.
	 * 
	 * @param {number} index - Индекс преимущества. 
	 */
	const deleteConvenience = (index: number): void => {
		editableSpace.value.conveniences.splice(index, 1);
	};

	/**
	 * Удаление изображения коворкинг-зоны.
	 * 
	 * @param {number} index - Индекс изображения. 
	 */
	const deleteImage = (index: number): void => {
		editableSpace.value.images.splice(index, 1);
	};

	/**
	 * Оюработка инпута с файлом (для добавления картинок в коворкинг-зону).
	 * @param {Event} event - Событие инпута с файлом. 
	 * @param {"design" | "images"} target - Изменяемое свойство. 
	 */
	const handleFileInput = (event: Event, target: "images" | "design"): void => {
		const files = (event.target as HTMLInputElement).files;
		
		if (files && files[0]) {
			const url = URL.createObjectURL(files[0]);

			if (target === "images") {
				editableSpace.value.images.push(url);
				newImages.value.push(files[0]);
			} else {
				editableSpace.value.design = url;
				newDesign.value = files[0];
			}
		}
	}

	/**
	 * Изменение адреса коворкинг-зоны.
	 * 
	 * @param {string} address - Новый адрес. 
	 */
	const setAddress = (address: string): void => {
		editableSpace.value.address = address;
	};

	/**
	 * Сохранение коворкинг-зоны.
	 */
	const saveSpace = (): void => {
		console.log(`Коворкинг-зона ${editableSpace.value} сохранена`);
	};

	/**
	 * Добавление коворкинг-зоны.
	 */
	const addSpace = (): void => {
		console.log(`Коворкинг-зона ${editableSpace.value} добавлена`);
	};

	/**
	 * Отмена всех изменений.
	 */
	const cancel = (): void => {
		editableSpace.value = EMPTY_SPACE;
		isEditable.value = false;
		newDesign.value = null;
		newImages.value = [];
	};

	/**
	 * Удаление места в коворкинг-зоне.
	 * 
	 * @param {number} index - Индекс удаляемого места. 
	 */
	const deletePlace = (index: number): void => {
		editableSpace.value.places.splice(index, 1);
	};

	/**
	 * Добавление нового места.
	 */
	const addPlace = (): void => {
		editableSpace.value.places.push(EMPTY_PLACE);
	};


	watch(() => editableSpace.value.address, debounce(() => fetchSuggestions(editableSpace.value.address)));


	return {
		space,
		rating,
		suggestions,
		editableSpace,
		isSuggestionsLoading,
		isEditable,
		resetEditableState,
		fetchSuggestions,
		setEditableSpace,
		deleteConvenience,
		handleFileInput,
		addConvenience,
		updateStatus,
		deleteImage,
		deletePlace,
		setAddress,
		addPlace,
		saveSpace,
		addSpace,
		cancel
	};
});