export type TypeCoworkingSpace = TypeCoworkingPlace & {
	places: TypeCoworkingPlace[];
};

export type TypeCoworkingPlace = {
	id: number;
	name: string;
};

export type TypeCoworkingSpaceExpanded = {
	id: number;
	active: boolean;
	dateOfCreating: string;
	dateOfUpdating: string;
	coordinate: [number, number];
	title: string;
	description: string;
	address: string;
	images: string[];
	conveniences: string[];
	scheme: string;
	places: TypeCoworkingPlaceExpanded[];
};

export type TypeCoworkingPlaceExpanded = {
	id: number;
	active: boolean;
	dateOfCreating: string;
	dateOfUpdating: string;
	title: string;
	spaceId: number;
	capacity: number;
};
