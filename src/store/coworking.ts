import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";

import type { TypeCoworkingSpace, TypeCoworkingPlace, TypeCoworkingSpaceExpanded } from "@/types/TypeCoworking";
import type { TypePlaceRating } from "@/types/TypePlaceRating";
import type { TypeDadata } from "@/types/TypeDadata";

import { space as SPACE, EMPTY_SPACE, EMPTY_PLACE } from "@/constants";
import { useDadata } from "@/hooks/useDadata";
import { debounce } from "@/helpers/debounce";


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
	 * Редактируемая коворкинг-зона.
	 */
	const editableSpace = ref<TypeCoworkingSpaceExpanded>(EMPTY_SPACE);

	/**
	 * Все коворкинг-зоны (с полной информацией).
	 */
	const spaceExpanded = ref<TypeCoworkingSpaceExpanded[]>(SPACE);

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
	const newScheme = ref<File | null>(null);

	const { data: suggestions, isLoading: isSuggestionsLoading, fetchData: fetchSuggestions } = useDadata<TypeDadata>();

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
	const updateStatus = (id?: number): void => {
		const item = spaceExpanded.value.find(item => item.id === id);
		item && (item.active = !item.active);
	};

	/**
	 * Включение режима добавления коворкинг-зоны.
	 */
	const setAdding = (): void => {
		editableSpace.value = EMPTY_SPACE;
		isEditable.value = true;
		newScheme.value = null;
		newImages.value = [];
	};

	/**
	 * Включение режима редактирования или добавления коворкинг-зоны.
	 * 
	 * @param {TypeCoworkingSpaceExpanded} space - Редактируемая коворкинг-зона.
	 */
	const setEditableSpace = (space?: TypeCoworkingSpaceExpanded): void => {
		if (space) {
			editableSpace.value = space;
			isEditable.value = !isEditable.value;
		} else {
			editableSpace.value = EMPTY_SPACE;
			isEditable.value = false;
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
	 * Добавление изображения коворкинг-зоны.
	 * 
	 * @param {Event} event - Событие инпута с файлом. 
	 */
	const addImage = (event: Event): void => {
		const files = (event.target as HTMLInputElement).files;
		
		if (files) {
			const newImage = URL.createObjectURL(files[0]);

			editableSpace.value.images.push(newImage);
			newImages.value.push(files[0]);
		}
	};

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
		newScheme.value = null;
		newImages.value = [];
	};

	/**
	 * Добавление новой схемы коворкинг-зоны.
	 * 
	 * @param {Event} event - Событи инпута с файлом. 
	 */
	const addScheme = (event: Event): void => {
		const files = (event.target as HTMLInputElement).files;

		if (files) {
			const url = URL.createObjectURL(files[0]);
			editableSpace.value.scheme = url;
			newScheme.value = files[0];
		}
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
		/**
		 * Все коворкинг зоны с комнатами.
		 */
		space,
		/**
		 * Все коворкинг-зоны (с полной информацией).
		 */
		spaceExpanded,
		/**
	 		* Редактируемая коворкинг-зона.
	 		*/
		editableSpace,
		/**
		 * Подсказки сервиса Dadata при вводе адреса.  
		 */	
		suggestions,
		/**
		 * Состояние загрузки подсказок с сервиса Dadata.
		 */
		isSuggestionsLoading,
		/**
		 * Рейтинг коворкинг мест по кол-ву броней.
		 */
		rating,
		/**
		 * Определяет, влючен ли сейчас режим редактирования или добавления коворкинг-зоны.
		 */
		isEditable,
		/**
		 * Получение всех коворкинг-зон для выпадающего списка.
		 * Возвращает массив коворкинг-зон в формате { id: 1, name: 'example' }.
		 */
		getSpace,
		/**
		 * Включение режима добавления коворкинг-зоны.
		 */
		setAdding,
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
		updateStatus,
		/**
		 * Включение режима редактирования или добавления коворкинг-зоны.
		 * 
		 * @param {TypeCoworkingSpaceExpanded} space - Редактируемая коворкинг-зона.
		 */
		setEditableSpace,
		/**
		 * Добавление преимуществ коворкинг-зоны.
		 * 
		 * @param {string} name - Название преимущества. 
		 */
		addConvenience,
		/**
		 * Удаление преимущества коворкинг-зоны.
		 * 
		 * @param {number} index - Индекс преимущества. 
		 */
		deleteConvenience,
		/**
		 * Удаление изображения коворкинг-зоны.
		 * 
		 * @param {number} index - Индекс изображения. 
		 */
		deleteImage,
		/**
		 * Добавление изображения коворкинг-зоны.
		 * 
		 * @param {Event} event - Событие инпута с файлом. 
		 */
		addImage,
		/**
		 * Добавление новой схемы коворкинг-зоны.
		 * 
		 * @param {Event} event - Событи инпута с файлом. 
		 */
	  addScheme,
		/**
		 * Добавление коворкинг-зоны.
		 */
		addSpace,
		/**
		 * Сохранение коворкинг-зоны.
		 */
		saveSpace,
		/**
		 * Отмена всех изменений.
		 */
		cancel,
		/**
		 * Получение подсказок с сервиса Dadata.
		 * 
		 * @param {string} query - Поисковый запрос.
		 */
		fetchSuggestions,
		/**
		 * Изменение адреса коворкинг-зоны.
		 * 
		 * @param {string} address - Новый адрес. 
		 */
		setAddress,
		/**
		 * Удаление места в коворкинг-зоне.
		 * 
		 * @param {number} id - ID удаляемого места. 
		 */
		deletePlace,
		/**
		 * Добавление нового места.
		 */
		addPlace
	}
});