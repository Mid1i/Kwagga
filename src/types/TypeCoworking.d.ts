export type TypeCoworkingSpace = TypeCoworkingPlace & {
	places: TypeCoworkingPlace[];
};

export type TypeCoworkingPlace = {
	id: number;
	name: string;
};
