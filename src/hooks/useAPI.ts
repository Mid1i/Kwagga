import axios, { AxiosInstance } from "axios";
import { ref } from "vue";


const apiService: AxiosInstance = axios.create({
	baseURL: "",
	timeout: 3000,
	headers: {
		"Content-Type": "application/json"
	}
});


export const useAPI = <T>() => {
	/**
	 * Состояние загрузки API-запроса.
	 */
	const isLoading = ref<boolean>(false);

	/**
	 * Ошибка при API-запросе.
	 */
	const error = ref<unknown | null>(null);

	/**
	 * Данные API-запроса.
	 */
	const data = ref<T | null>(null);


	/**
	 * Отправка API-запроса на бекэнд.
	 * @param {string} method - метод API-запроса (`GET`, `POST`, `PUT`, `DELETE`). 
	 * @param {string} url - API-эндпоинт.
	 * @param {any} params - Параметры API-запроса или данные при отпрвке (для `POST`, `PUT`).
	 */
	const request = async (method: string, url: string, params?: any) => {
		isLoading.value = true;
		error.value = null;

		try {
			const response = await apiService({
				method,
				url,
				...(method === "GET" ? { params } : { data: params })
			});

			data.value = response.data;
		} catch(err) {
			error.value = err;
			console.error(`API error: ${error}`);
			throw error;
		} finally {
			isLoading.value = false;
		}
	};


	return {
		isLoading,
		data,
		error,
		request
	};
};