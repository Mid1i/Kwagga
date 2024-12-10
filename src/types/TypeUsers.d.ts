export type TypeUser = {
	id?: number;
	firstName: string;
	lastName: string;
	email: string;
	bookings?: number[];
	dateOfRegistration?: string;
};