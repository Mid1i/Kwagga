import type { TypeCoworkingPlaceList } from "@/types/TypeCoworkingList";


export type TypePlaceRating = {
	id: number;
	coworkingSpace: TypeCoworkingPlaceList,
	coworkingPlace: TypeCoworkingPlaceList,
	bookings: number;
};