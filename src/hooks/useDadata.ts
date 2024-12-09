import axios, { AxiosInstance } from "axios";
import { ref } from "vue";


const dadataService: AxiosInstance = axios.create({
	baseURL: "http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
	timeout: 3000,
	headers: {
		"Accept": "application/json",
		"Authorization": `Token ${import.meta.env.VITE_DADATA_API_KEY}`,
		"Content-Type": "application/json"
	}
});


export const useDadata = <T>() => {
	const data = ref<T | null>(null);
	const isLoading = ref<boolean>(true);


	const fetchData = async (query: string): Promise<void> => {
		isLoading.value = true;
		try {
			data.value = await dadataService.post("", { query: query });
			isLoading.value = false;
		} catch(error) {
			console.error(error);
		}
	};


	return {
		data,
		isLoading,
		fetchData
	};
};