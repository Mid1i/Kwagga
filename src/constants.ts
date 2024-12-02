import type { TypeChartColors } from "@/types/TypeChartColors";
import { TypeSorting } from "@/types/TypeSorting";


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
		title: "По имени (A-Z)",
		value: "firstName,asc"
	},
	{
		icon: "alphabet-desc",
		title: "По имени (Z-A)",
		value: "firstName,desc"
	},
	{
		icon: "alphabet-asc",
		title: "По фамилии (A-Z)",
		value: "lastName,asc"
	},
	{
		icon: "alphabet-desc",
		title: "По фамилии (Z-A)",
		value: "lastName,desc"
	},
	{
		icon: "alphabet-asc",
		title: "По email (A-Z)",
		value: "email,asc"
	},
	{
		icon: "alphabet-desc",
		title: "По email (Z-A)",
		value: "email,desc"
	},
	{
		icon: "asc",
		title: "По дате регистрации (A-Z)",
		value: "dateOfRegistration,asc"
	},
	{
		icon: "desc",
		title: "По дате регистрации (Z-A)",
		value: "dateOfRegistration,desc"
	}
];