import type { TypeCoworkingPlaceList } from "@/types/TypeCoworkingList";
import type { TypeUser } from "@/types/TypeUsers";


export type TypeBooking = {
	id?: number;
	coworkingSpace: TypeCoworkingPlaceList;
	coworkingPlace: TypeCoworkingPlaceList;
	dateOfCreating?: string;
	dateOfBooking: string;
	comment: string;
	user: TypeUser;
};