export type TypeDadata = {
	data: {
		suggestions: TypeDadataInformation[]
	}
};

export type TypeDadataInformation = {
	data: {
		country: string | null;
		region_with_type: string | null;
		city_with_type: string | null;
		street_with_type: string | null;
		house: string | null;
		flat: string | null;
	}
};