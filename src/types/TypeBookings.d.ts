import type { TypeCoworkingPlace } from "@/types/TypeCoworking";


export type TypeBooking = {
	id: number;
	coworkingSpace: TypeCoworkingPlace;
	coworkingPlace: TypeCoworkingPlace;
	dateOfCreating: string;
	dateOfBooking: string;
	user: {
		id: number;
		email: string;
		firstName: string;
		lastName: string;
	}
};