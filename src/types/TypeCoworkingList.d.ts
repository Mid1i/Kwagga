export type TypeCoworkingSpaceList = TypeCoworkingPlaceList & {
	places: TypeCoworkingPlace[];
};

export type TypeCoworkingPlaceList = {
	id: number;
	title: string;
};