import type { TypeChartColors } from "@/types/TypeChartColors";
import type { TypeBooking } from "@/types/TypeBookings";
import type { TypeWeekDay } from "@/types/TypeWeekDays";
import type { TypeSorting } from "@/types/TypeSorting";


export const BOOKING_COLORS: TypeChartColors = {
	backgroundColor: "rgb(115, 128, 236, .2)",
	borderColor: "#7380EC",
	pointBackgroundColor: "#7380EC"
};

export const USERS_COLORS: TypeChartColors = {
	backgroundColor: "rgb(65, 241, 182, .2)",
	borderColor: "#41F1B6",
	pointBackgroundColor: "#41F1B6"
};

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

export const CALENDAR_HEADERS: TypeWeekDay[] = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export const EMPTY_BOOKING: TypeBooking = {
	id: 0,
	user: {
		id: 0,
		firstName: "",
		lastName: "",
		email: ""
	},
	coworkingSpace: {
		id: 0,
		name: ""
	},
	coworkingPlace: {
		id: 0,
		name: ""
	},
	comment: "",
	dateOfCreating: "",
	dateOfBooking: ""
};