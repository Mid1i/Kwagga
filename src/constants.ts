import type { TypeCoworkingPlace, TypeCoworkingSpace } from "@/types/TypeCoworking";
import type { TypeChartColors } from "@/types/TypeChartColors";
import type { TypeBooking } from "@/types/TypeBookings";
import type { TypeWeekDay } from "@/types/TypeWeekDays";
import type { TypeSorting } from "@/types/TypeSorting";
import type { TypeUser } from "@/types/TypeUsers";


/**
 * Цвета для графика по бронированиям.
 */
export const BOOKING_COLORS: TypeChartColors = {
	backgroundColor: "rgb(115, 128, 236, .2)",
	borderColor: "#7380EC",
	pointBackgroundColor: "#7380EC"
};

/**
 * Цвета для графика по пользователям.
 */
export const USERS_COLORS: TypeChartColors = {
	backgroundColor: "rgb(65, 241, 182, .2)",
	borderColor: "#41F1B6",
	pointBackgroundColor: "#41F1B6"
};

/**
 * Возможные методы сортировки по пользователям.
 */
export const SORTING_ITEMS: TypeSorting[] = [
	{
		icon: "alphabet-asc",
		title: "По имени",
		htmlTitle: "Сортировать по имени от A до Z",
		value: "firstName,asc"
	},
	{
		icon: "alphabet-desc",
		title: "По имени",
		htmlTitle: "Сортировать по имени от Z до A",
		value: "firstName,desc"
	},
	{
		icon: "alphabet-asc",
		title: "По фамилии",
		htmlTitle: "Сортировать по фамилии от A до Z",
		value: "lastName,asc"
	},
	{
		icon: "alphabet-desc",
		title: "По фамилии",
		htmlTitle: "Сортировать по фамилии от Z до A",
		value: "lastName,desc"
	},
	{
		icon: "alphabet-asc",
		title: "По email",
		htmlTitle: "Сортировать по email от A до Z",
		value: "email,asc"
	},
	{
		icon: "alphabet-desc",
		title: "По email",
		htmlTitle: "Сортировать по email от Z до A",
		value: "email,desc"
	},
	{
		icon: "asc",
		title: "По дате регистрации",
		htmlTitle: "Сортировать по дате регистрации от более ранних к более поздним",
		value: "dateOfRegistration,asc"
	},
	{
		icon: "desc",
		title: "По дате регистрации",
		htmlTitle: "Сортировать по дате регистрации от более поздних к более ранним",
		value: "dateOfRegistration,desc"
	}
];

/**
 * Возможные методы сортировки по бронированиям.
 */
export const BOOKING_SORTING_ITEMS: TypeSorting[] = [
	{
		icon: "alphabet-asc",
		title: "По пользователю",
		htmlTitle: "Сортировать по email пользователя от A до Z",
		value: "email,asc"
	},
	{
		icon: "alphabet-desc",
		title: "По пользователю",
		htmlTitle: "Сортировать по email пользователя от Z до A",
		value: "email,desc"
	},
	{
		icon: "asc",
		title: "По дате создания",
		htmlTitle: "Сортировать по дате создания от более ранних к более поздним",
		value: "dateOfCreating,asc"
	},
	{
		icon: "desc",
		title: "По дате создания",
		htmlTitle: "Сортировать по дате создания от более поздних к более ранним",
		value: "dateOfCreating,desc"
	},
	{
		icon: "asc",
		title: "По дате брони",
		htmlTitle: "Сортировать по дате брони от более ранних к более поздним",
		value: "dateOfBooking,asc"
	},
	{
		icon: "desc",
		title: "По дате брони",
		htmlTitle: "Сортировать по дате брони от более поздних к более ранним",
		value: "dateOfBooking,desc"
	}
];

/**
 * Дни недели.
 */
export const CALENDAR_HEADERS: TypeWeekDay[] = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

/**
 * Пустой шаблон брони.
 */
export const EMPTY_BOOKING: TypeBooking = {
	user: {
		firstName: "",
		lastName: "",
		email: ""
	},
	coworkingSpace: {
		id: 0,
		title: ""
	},
	coworkingPlace: {
		id: 0,
		title: ""
	},
	comment: "",
	dateOfBooking: ""
};

/**
 * Пустой шаблон коворкинг-зоны.
 */
export const EMPTY_SPACE: TypeCoworkingSpace = {
	active: true,
	title: "",
	description: "",
	conveniences: [],
	address: "",
	design: "",
	images: [],
	places: []
};

/**
 * Пустой шаблон коворкинг-места.
 */
export const EMPTY_PLACE: TypeCoworkingPlace = {
	active: true,
	title: "",
	capacity: ""
};

/**
 * Временные коворкинг-зоны (FIXME:).
 */
export const space: TypeCoworkingSpace[] = [
	{
		id: 1,
		active: true,
		title: "ИдеяHub",
		description: "Зона для творческих людей, стартаперов и всех, кто нуждается в пространстве для вдохновения и обмена идеями. В 'ИдеяHub' царит непринужденная атмосфера, стильный интерьер и удобные места для работы в команде. Здесь ты найдешь много мягкой мебели, досок для мозговых штурмов и уютные уголки для индивидуальной работы.",
		conveniences: ["Комфортная мебель", "Удобное расположение", "Гибкость планировки", "Зоны для уединённой работы", "Аудио и видеотехнологии"],
		dateOfCreating: "24.02.2024",
		dateOfUpdating: "24.02.2024",
		address: "г. Нижний Новгород, пл. Минина, д. 24, кв. 202",
		design: "src/assets/images/scheme.png",
		images: ["src/assets/images/1.png", "src/assets/images/2.png", "src/assets/images/3.png", "src/assets/images/4.png", "src/assets/images/5.png", "src/assets/images/6.png"],
		places: [
			{
				id: 1,
				active: true,
				dateOfCreating: "24.02.2024",
				dateOfUpdating: "24.02.2024",
				title: "Малая переговорная",
				spaceId: 1,
				capacity: "12"
			},
			{
				id: 2,
				active: true,
				dateOfCreating: "24.02.2024",
				dateOfUpdating: "24.02.2024",
				title: "Большая переговорная",
				spaceId: 1,
				capacity: "25"
			},
			{
				id: 3,
				active: true,
				dateOfCreating: "24.02.2024",
				dateOfUpdating: "24.02.2024",
				title: "Игровая",
				spaceId: 1,
				capacity: "4"
			},
			{
				id: 4,
				active: true,
				dateOfCreating: "24.02.2024",
				dateOfUpdating: "24.02.2024",
				title: "Игровая # 2",
				spaceId: 1,
				capacity: "4"
			},
			{
				id: 5,
				active: true,
				dateOfCreating: "24.02.2024",
				dateOfUpdating: "24.02.2024",
				title: "Игровая # 3",
				spaceId: 1,
				capacity: "4"
			}
		]
	},
	{
		id: 2,
		active: false,
		title: "TechHub",
		description: "Зона для творческих людей, стартаперов и всех, кто нуждается в пространстве для вдохновения и обмена идеями. В 'ИдеяHub' царит непринужденная атмосфера, стильный интерьер и удобные места для работы в команде. Здесь ты найдешь много мягкой мебели, досок для мозговых штурмов и уютные уголки для индивидуальной работы.",
		conveniences: ["Комфортная мебель", "Удобное расположение", "Гибкость планировки", "Зоны для уединённой работы", "Аудио и видеотехнологии"],
		dateOfCreating: "24.02.2024",
		dateOfUpdating: "24.02.2024",
		address: "г. Нижний Новгород, пл. Минина, д. 24, кв. 202",
		design: "src/assets/images/scheme.png",
		images: ["src/assets/images/1.png", "src/assets/images/2.png", "src/assets/images/3.png", "src/assets/images/4.png", "src/assets/images/5.png", "src/assets/images/6.png"],
		places: [
			{
				id: 1,
				active: true,
				dateOfCreating: "24.02.2024",
				dateOfUpdating: "24.02.2024",
				title: "Малая переговорная",
				spaceId: 1,
				capacity: "12"
			},
			{
				id: 2,
				active: true,
				dateOfCreating: "24.02.2024",
				dateOfUpdating: "24.02.2024",
				title: "Большая переговорная",
				spaceId: 1,
				capacity: "25"
			},
			{
				id: 3,
				active: true,
				dateOfCreating: "24.02.2024",
				dateOfUpdating: "24.02.2024",
				title: "Игровая",
				spaceId: 1,
				capacity: "4"
			}
		]
	}
];

/**
 * Временный пользователь (FIXME:).
 */
export const user: TypeUser = {
	id: 1,
	firstName: "Иван",
	lastName: "Иванов",
	email: "example@mail.ru",
	bookings: [2, 4, 1, 5, 2],
	dateOfRegistration: "26.07.2024"
};

/**
 * Временные брони (FIXME:).
 */
export const booking: TypeBooking = {
	id: 1,
	user: {
		id: 4,
		firstName: "Михаил",
		lastName: "Чернов",
		email: "example@mail.ru"
	},
	coworkingSpace: {
		id: 1,
		title: "TechHub"
	},
	coworkingPlace: {
		id: 1,
		title: "Малая переговорная"
	},
	comment: "Подальше от входа",
	dateOfCreating: "26.07.2024",
	dateOfBooking: "26.07.2024"
};
