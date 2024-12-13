import axios, { AxiosInstance } from "axios";
import { ref } from "vue";


/**
 * Настройки для отправки API-запросов к сервису Dadata.
 */
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
	/**
	 * Данные API-запроса.
	 */
	const data = ref<T | null>(null);
	
	/**
	 * Состояние загрузки API-запроса.
	 */
	const isLoading = ref<boolean>(true);


	/**
	 * Получение данных подсказок при вводе адреса.
	 * @param {string} query - Поисковый запрос. 
	 */
	const fetchData = async (query: string): Promise<void> => {
		isLoading.value = true;
		try {
			data.value = await dadataService.post("", { query: query });
			isLoading.value = false;
		} catch(error) {
			console.error(error);
			data.value = null;
		}
	};


	return {
		data,
		isLoading,
		fetchData
	};
};