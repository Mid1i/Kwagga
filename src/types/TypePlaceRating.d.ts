import type { TypeCoworkingPlace } from "@/types/TypeCoworking";


export type TypePlaceRating = {
	id: number;
	coworkingSpace: TypeCoworkingPlace,
	coworkingPlace: TypeCoworkingPlace,
	bookings: number;
};