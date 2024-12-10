export type TypeCoworkingSpace = {
	id?: number;
	active: boolean;
	dateOfCreating?: string;
	dateOfUpdating?: string;
	title: string;
	description: string;
	address: string;
	images: string[];
	conveniences: string[];
	design: string;
	places: TypeCoworkingPlace[];
};

export type TypeCoworkingPlace = {
	id?: number;
	active: boolean;
	dateOfCreating?: string;
	dateOfUpdating?: string;
	title: string;
	spaceId?: number;
	capacity: string;
};
